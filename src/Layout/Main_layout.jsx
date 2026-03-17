import React from 'react'
import Navbar from '../Component/Main_component/Navbar/Navbar'
import Footer from '../Component/Main_component/Footer'
import { Outlet } from 'react-router-dom'

const Main_layout = () => {
  return (
    <div >
      <Navbar/>
      <Outlet/> 
     <Footer/>
    </div>
  )
}

export default Main_layout
