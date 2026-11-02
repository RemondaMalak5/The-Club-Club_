import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { AllBranches } from "../axiosConfig/APIs/Branches/All_Branches";
import { useTranslation } from "react-i18next";

const BranchContext = createContext();

const resolveLoginBranch = (branchesList = []) => {
  const token = localStorage.getItem("token");
  const savedUserStr = localStorage.getItem("user");

  if (!token && !savedUserStr) {
    return null;
  }

  let user = null;
  let customer = null;

  try {
    user = savedUserStr ? JSON.parse(savedUserStr) : null;
  } catch {}

  try {
    const savedCustomerStr = localStorage.getItem("customer");
    customer = savedCustomerStr ? JSON.parse(savedCustomerStr) : null;
  } catch {}

  const directId =
    localStorage.getItem("loginBranchId") ||
    user?.branchId ||
    user?.branch_id ||
    customer?.branchId ||
    customer?.branch_id;

  if (directId && directId !== "all") {
    if (branchesList.length > 0) {
      const matched = branchesList.find(
        (b) => String(b.id) === String(directId) || b.name === directId
      );
      if (matched) return matched.id;
    }
    return directId;
  }

  const branchNameOrId = user?.branch || customer?.branch;
  if (branchNameOrId && branchesList.length > 0) {
    const matched = branchesList.find(
      (b) =>
        String(b.id) === String(branchNameOrId) ||
        b.name === branchNameOrId
    );
    if (matched) return matched.id;
  }

  const storedBranchId = localStorage.getItem("branchId");
  if (storedBranchId && storedBranchId !== "all") {
    return storedBranchId;
  }

  return null;
};

export const BranchProvider = ({ children }) => {
  const [branches, setBranches] = useState([]);
  const userChangedBranchRef = useRef(false);
  const [selectedBranch, setSelectedBranch] = useState(() => {
    return (
      resolveLoginBranch() ||
      localStorage.getItem("branchId") ||
      "all"
    );
  });

  const { i18n } = useTranslation();

  const changeBranch = useCallback((branchId) => {
    userChangedBranchRef.current = true;
    setSelectedBranch(branchId);
    localStorage.setItem("branchId", branchId);
  }, []);

  const resetToLoginBranch = useCallback(() => {
    userChangedBranchRef.current = false;
    const loginBranch = resolveLoginBranch(branches);
    if (loginBranch) {
      setSelectedBranch(loginBranch);
      localStorage.setItem("branchId", loginBranch);
    }
  }, [branches]);

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await AllBranches({
          language: i18n.language,
        });

        const fetchedBranches = response?.message?.data || [];
        setBranches(fetchedBranches);

        const loginBranch = resolveLoginBranch(fetchedBranches);
        if (loginBranch) {
          localStorage.setItem("loginBranchId", loginBranch);
          if (!userChangedBranchRef.current) {
            setSelectedBranch(loginBranch);
            localStorage.setItem("branchId", loginBranch);
          }
        }
      } catch (error) {}
    };

    getBranches();
  }, [i18n.language]);

  useEffect(() => {
    const handleUserUpdated = () => {
      const token = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (!token && !savedUser) {
        userChangedBranchRef.current = false;
        setSelectedBranch("all");
        return;
      }

      const loginBranch = resolveLoginBranch(branches);
      if (loginBranch) {
        userChangedBranchRef.current = false;
        localStorage.setItem("loginBranchId", loginBranch);
        setSelectedBranch(loginBranch);
        localStorage.setItem("branchId", loginBranch);
      }
    };

    window.addEventListener("userUpdated", handleUserUpdated);
    window.addEventListener("storage", handleUserUpdated);

    return () => {
      window.removeEventListener("userUpdated", handleUserUpdated);
      window.removeEventListener("storage", handleUserUpdated);
    };
  }, [branches]);

  return (
    <BranchContext.Provider
      value={{
        selectedBranch,
        changeBranch,
        branches,
        resetToLoginBranch,
      }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => useContext(BranchContext);
