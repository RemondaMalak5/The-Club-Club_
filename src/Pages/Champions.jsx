import React, { useEffect, useState } from 'react'
import Championship_component from '../Component/Championship_component/Championship_component'
import Achievements from '../Component/Championship_component/Achievements'
import AchievementsTimeline from '../Component/Championship_component/Achievements_Timeline'
import Champinship_filter from '../Component/Championship_component/Champinship_filter'

const Champions = () => {
  const [selectedBranch, setSelectedBranch] = useState();
  
    useEffect(() => {
      const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = !!user;
      if (user?.branchId) {
        setSelectedBranch(user.branchId);
      }
    }, []);

  return (
    <div className='xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10 space-y-10'>
      <Championship_component selectedBranch={selectedBranch} />
      <Achievements/>
      <AchievementsTimeline/>
      <Champinship_filter/>
    </div>
  )
}

export default Champions
