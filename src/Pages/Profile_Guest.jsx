import React from 'react'
import Profile_header_guest from '../Component/Profile_Guest/Profile_header_guest'
import Countiue_profile_guest from '../Component/Profile_Guest/Countiue_profile_guest'

const Profile_Guest = () => {
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10 flex flex-col gap-4">
      <Profile_header_guest/>
      <Countiue_profile_guest/>
    </div>
  )
}

export default Profile_Guest
