import React, { useState } from 'react'
import Academy_headers from '../Component/Academy_Component/Academy/Academy_headers'
import Academy_filter from '../Component/Academy_Component/Academy/Academy_filter'
import { useLocation } from 'react-router-dom';

const Academy = () => {
  const location = useLocation();
  const branchFromHome = location.state?.branchId || "all";

  const [selectedBranch, setSelectedBranch] = useState(branchFromHome);

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
export default Academy