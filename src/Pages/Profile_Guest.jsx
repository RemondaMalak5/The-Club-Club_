import React from 'react'
import Profile_header_guest from '../Component/Profile_Guest/Profile_header_guest'
import Countiue_profile_guest from '../Component/Profile_Guest/Countiue_profile_guest'
import Notification from '../Component/Profile_Guest/Notification'
import Upgrade_to_member from '../Component/Profile_Guest/Upgrade_to_member'
import Activity_profile from '../Component/Profile_Guest/Activity_profile'
import Help_me from '../Component/Profile_Guest/Help_me'

const Profile_Guest = () => {
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10 flex flex-col gap-4">
      <Profile_header_guest/>
      <Countiue_profile_guest/>
      <div className="flex flex-wrap">
            <div className=" xl:w-[55%] w-full px-5 space-y-4">
        <Upgrade_to_member/>
        <Activity_profile/>
        <Help_me/>
      </div>
        <div className="xl:w-[45%] w-full px-5 space-y-4">
      <Notification/>
      </div>
      </div>
 
    </div>
  )
}

export default Profile_Guest
