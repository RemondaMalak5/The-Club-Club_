import React, { useEffect } from 'react'
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
import AOS from "aos";
import "aos/dist/aos.css";

const Home = () => {
useEffect(() => {
  AOS.init({
    duration: 500,
    once: true,
    offset: 200,
    easing: "ease-out",
  });

  const refreshAOS = () => {
    AOS.refreshHard();
  };

  window.addEventListener("load", refreshAOS);

  const timer = setTimeout(() => {
    AOS.refreshHard();
  }, 1000);

  return () => {
    window.removeEventListener("load", refreshAOS);
    clearTimeout(timer);
  };
}, []);

  

  return (
    <div >
      <Slider_home/>


      <div className='xl:px-14 md:px-10 py-10 px-10'>
        <div data-aos="fade-up">
  <About_home />

        </div>
      <div data-aos="fade-up">
        <Branches_home />
      </div>

      <div data-aos="fade-up">
        <Result_year_home />
      </div>

      <div data-aos="fade-up">
        <Memberships_home />
      </div>

      <div data-aos="fade-up">
        <Loyalty_point />
      </div>

      <div data-aos="fade-up">
        <Booking_home />
      </div>

      {/* <div data-aos="fade-up">
        <Statistics_home />
      </div> */}

      <div data-aos="fade-up">
        <Academy_home />
      </div>

      <div data-aos="fade-up">
        <Photos_home />
      </div>

      <div data-aos="fade-up">
        <News_home />
      </div>

      <div data-aos="fade-up">
        <Ready_home />
      </div>
      </div>
    
    </div>
  )
}

export default Home
