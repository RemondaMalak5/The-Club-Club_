import React from 'react'
import Championship_component from '../Component/Championship_component/Championship_component'
import Achievements from '../Component/Championship_component/Achievements'
import AchievementsTimeline from '../Component/Championship_component/Achievements_Timeline'

const Champions = () => {
  return (
    <div>
      <Championship_component/>
      {/* <Achievements/> */}
      <AchievementsTimeline/>
    </div>
  )
}

export default Champions
