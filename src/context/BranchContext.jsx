import { createContext, useContext, useEffect, useState } from "react";
import i18next from "i18next";
import { AllBranches } from "../axiosConfig/APIs/Branches/All_Branches";

const BranchContext = createContext();

export const BranchProvider = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [selectedBranch, setSelectedBranch] = useState(
    localStorage.getItem("branchId") || user?.branchId || "all"
  );

  const [branches, setBranches] = useState([]);

  const changeBranch = (branchId) => {
    setSelectedBranch(branchId);
    localStorage.setItem("branchId", branchId);
  };

  useEffect(() => {
    const getBranches = async () => {
      try {
        const response = await AllBranches({
          language: i18next.language,
        });

        setBranches(response.message.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    getBranches();
  }, [i18next.language]);

  return (
    <BranchContext.Provider
      value={{ selectedBranch, changeBranch, branches }}
    >
      {children}
    </BranchContext.Provider>
  );
};

export const useBranch = () => useContext(BranchContext);