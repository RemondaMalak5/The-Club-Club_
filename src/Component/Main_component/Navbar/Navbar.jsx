import React from 'react'
import { assets } from '../../../assets/assets'
import { Link } from 'react-router-dom'
import { FaRegCalendarCheck } from "react-icons/fa";
import Nav_top from './Nav_top';


const Navbar = () => {
  return (
    <>
    <Nav_top/>
    <nav className='bg-white flex justify-between items-center px-8 py-2  '>
              <Link to="/" className='flex items-center'>
                <img src={assets.logo} alt="logo" className='w-12 h-12'/>
                <p className='font-bold text-[#1e2939d0] text-[20px]'>نادى النادى</p>
                </Link>
              <div className='text-[#364153]  font-[500] text-[18px]'>
                <ul className='flex gap-7'>
                  <li>
                    <Link to="/"> الرئيسيه</Link>
                  </li>
                   <li>
                    <Link to="/"> فروعنا  </Link>
                  </li>
                   <li>
                    <Link to="/about"> عن النادى </Link>
                  </li>
                   <li>
                    <Link to="/"> الاخبار  </Link>
                  </li> 
                  <li>
                    <Link to="/"> الخدمات   </Link>
                  </li> 
                  <li>
                    <Link to="/"> الاكاديميات  </Link>
                  </li>
                  <li>
                    <Link to="/"> البطولات   </Link>
                  </li>
                  <li>
                    <Link to="/contact"> تواصل معنا  </Link>
                  </li>
                </ul>
              </div>
              <div>
                <button className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-3 rounded-full text-white font-[700] text-[17px] flex items-center gap-2'>    
                        <span > <FaRegCalendarCheck />
                  </span> احجز نشاط / خدمه 
        
                </button>
              </div>
    </nav>

    </>
    
  )
}

export default Navbar
