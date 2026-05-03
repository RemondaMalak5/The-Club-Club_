import React from 'react'
import Proflie_Header from '../Component/Profile/Proflie_Header'
import Membership_Stats from '../Component/Profile/Membership_Stats'
import MembershipCard from '../Component/Profile/MembershipCard'
import Notifications from '../Component/Profile/Notifications'
import FamilyMembers from '../Component/Profile/FamilyMembers'
import Achievements from '../Component/Profile/Achievements'
import QuickActions from '../Component/Profile/QuickActions'
import Bookings from '../Component/Profile/Bookings'
import Payments from '../Component/Profile/Payments'

const Profile = () => {
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
        <Proflie_Header/>
        <Membership_Stats/>
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* LEFT SIDE */}
        <div className="lg:col-span-2 space-y-4">
           <MembershipCard/>
          {/* <Activities/> */}
          <Bookings/>
          <Payments/>
        </div>

        {/* RIGHT SIDE */}
        <div className=" space-y-4">
            <Notifications/>
          <FamilyMembers/>
          <Achievements/>
          <QuickActions/>
         
        </div>

      </div>
    </div>
  )
}

export default Profile