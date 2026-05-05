import React from 'react'
import Championship_component from '../Component/Championship_component/Championship_component'
import Achievements from '../Component/Championship_component/Achievements'
import AchievementsTimeline from '../Component/Championship_component/Achievements_Timeline'
import Champinship_filter from '../Component/Championship_component/Champinship_filter'

const Champions = () => {
  return (
    <div>
      <Championship_component/>
      {/* <Achievements/> */}
      <AchievementsTimeline/>
      <Champinship_filter/>
    </div>
  )
}

export default Champions
