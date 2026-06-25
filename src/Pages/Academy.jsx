import React, { useEffect, useState } from "react";
import Academy_headers from "../Component/Academy_Component/Academy/Academy_headers";
import Academy_filter from "../Component/Academy_Component/Academy/Academy_filter";

const Academy = () => {
  const [selectedBranch, setSelectedBranch] = useState("all");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.branchId) {
      setSelectedBranch(user.branchId);
    }
  }, []);

  return (
    <>
      <Academy_headers selectedBranch={selectedBranch} />

      <Academy_filter
        selectedBranch={selectedBranch}
        setSelectedBranch={setSelectedBranch}
      />
    </>
  );
};

export default Academy;