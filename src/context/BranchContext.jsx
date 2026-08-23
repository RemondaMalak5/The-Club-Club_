import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { AllBranches } from "../axiosConfig/APIs/Branches/All_Branches";
import { useTranslation } from "react-i18next";

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const [selectedBranch, setSelectedBranch] = useState(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user?.branchId || localStorage.getItem("branchId") || "all";
  });

  const [branches, setBranches] = useState([]);
const { i18n } = useTranslation();

  const changeBranch = (branchId) => {
    setSelectedBranch(branchId);
    localStorage.setItem("branchId", branchId);
  };

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await AllBranches({
          language: i18n.language,
        });

        setBranches(response.message.data || []);
      } catch (error) {
      }
    };

    getBranches();
  }, [i18n.language]);

  return (
    <BranchContext.Provider
      value={{ selectedBranch, changeBranch, branches }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => useContext(BranchContext);