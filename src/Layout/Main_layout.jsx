import React from 'react'
import Navbar from '../Component/Main_component/Navbar/Navbar'
import Footer from '../Component/Main_component/Footer'
import { Outlet } from 'react-router-dom'
import { Scroll } from 'lucide-react'
import ScrollToTop from '../Component/Shared_Component/ScrollToTop'

const Main_layout = () => {
  return (
    <div >
      <ScrollToTop/>
      <Navbar/>
      <Outlet/> 
     <Footer/>
    </div>
  )
}

export default Main_layout
