import React from 'react'
import Slider_home from '../Component/Home_component/Slider_home'
import About_home from '../Component/Home_component/About_home'
import Memberships_home from '../Component/Home_component/Memberships_home'
import Branches_home from '../Component/Home_component/Branches_home'

const Home = () => {
  return (
    <div>
      <Slider_home/>
      <About_home/>
      <Memberships_home/>
      <Branches_home/>
    </div>
  )
}

export default Home
