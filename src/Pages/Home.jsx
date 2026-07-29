import React from 'react'
import Slider_home from '../Component/Home_component/Slider_home'
import About_home from '../Component/Home_component/About_home'
import Memberships_home from '../Component/Home_component/Memberships_home'
import Branches_home from '../Component/Home_component/Branches_home'
import Result_year_home from '../Component/Home_component/Result_year_home'
import Academy_home from '../Component/Home_component/Academy_home'
import Photos_home from '../Component/Home_component/Photos_home'
import News_home from '../Component/Home_component/News_home'
import Ready_home from '../Component/Home_component/Ready_home'
import Booking_home from '../Component/Home_component/Booking_home'
import Statistics_home from '../Component/Home_component/Statistics_home'
import Loyalty_point from '../Component/Home_component/Loyalty_point'

const Home = () => {
  return (
    <div >
      <Slider_home/>
      <div className='xl:px-14 md:px-10 py-10 px-10'>
  <About_home/>
      <Branches_home/>
      <Result_year_home/>
      <Memberships_home/>
      <Loyalty_point/>
      <Booking_home/>
      <Statistics_home/>
      <Academy_home/>
      <Photos_home/>
      <News_home/>
      <Ready_home/>
      </div>
    
    </div>
  )
}

export default Home
