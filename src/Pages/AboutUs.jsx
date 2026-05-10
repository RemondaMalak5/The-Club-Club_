import React from 'react'
import About_component from '../Component/AboutUs_component/About_component'
import About_services from '../Component/AboutUs_component/About_services'
import About_us_goals from '../Component/AboutUs_component/About_us_goals'
import Values from '../Component/AboutUs_component/Values'
import Vision_Mission from '../Component/AboutUs_component/Vision_Mission'

const AboutUs = () => {
  return (
    <div>
      <About_component/>
      <About_services/>
      <Values/>
      <About_us_goals/>
      <Vision_Mission/>
    </div>
  )
}

export default AboutUs
