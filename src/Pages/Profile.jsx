import React from "react";
import { useQuery } from "@tanstack/react-query";
import Proflie_Header from "../Component/Profile/Proflie_Header";
import Membership_Stats from "../Component/Profile/Membership_Stats";
import MembershipCard from "../Component/Profile/MembershipCard";
import Notifications from "../Component/Profile/Notifications";
import FamilyMembers from "../Component/Profile/FamilyMembers";
import Achievements from "../Component/Profile/Achievements";
import QuickActions from "../Component/Profile/QuickActions";
import Bookings from "../Component/Profile/Bookings";
import Payments from "../Component/Profile/Payments";
import AcademySubscriptions from "../Component/Profile/AcademySubscriptions";
import Spinner from "./../Component/Shared_Component/Spinner";
import { Get_profile } from "../axiosConfig/APIs/Profile/Profile";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import AcademyApplications from "../Component/Profile/AcademyApplications";
import Outstanding from "../Component/Profile/Outstanding";

const Profile = () => {
    const {  } = useTranslation();

  const {
  data,
  isLoading,
  isError,
  error,
} = useQuery({
  queryKey: ["profile", i18next.language],
  queryFn: () =>
    Get_profile({
      language: i18next.language,
    }),
});

const profile = data?.message?.data;


  if (isLoading) {
    return <Spinner/>;
  }

  if (isError) {
    return <div>{error.message || "Something went wrong"}</div>;
  }

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <Proflie_Header data={profile} />
      <Membership_Stats data={profile} />

       <div className="flex flex-wrap ">
  <div className=" xl:w-[55%] w-full px-5 space-y-4">
          <MembershipCard data={profile} />
          <Outstanding data={profile}/>
          {/* <AcademySubscriptions data={profile.subscribedAcademies} /> */}
          {/* <Bookings data={profile.upcomingBookings} /> */}
          <Payments data={profile} />
        </div>

        <div className="xl:w-[45%] w-full px-5 space-y-4">
          {/* <Notifications data={profile.notifications} /> */}
          <FamilyMembers data={profile?.familyMembers} />
          <AcademyApplications/>
          <Achievements data={profile?.achievements} />
          <QuickActions data={profile} />
        </div>
      </div> 
    </div>
  );
};

export default Profile;
