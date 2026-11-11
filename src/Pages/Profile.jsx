import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Proflie_Header from "../Component/Profile/Proflie_Header";
import Membership_Stats from "../Component/Profile/Membership_Stats";
import MembershipCard from "../Component/Profile/MembershipCard";
// import Notifications from "../Component/Profile/Notifications";
import FamilyMembers from "../Component/Profile/FamilyMembers";
import Achievements from "../Component/Profile/Achievements";
import QuickActions from "../Component/Profile/QuickActions";
import Payments from "../Component/Profile/Payments";
import AcademySubscriptions from "../Component/Profile/AcademySubscriptions";
import Spinner from "../Component/Shared_component/Spinner";
import { Get_profile } from "../axiosConfig/APIs/Profile/Profile";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Outstanding from "../Component/Profile/Outstanding";
import { isGuestUser } from "../utils/userType";

const Profile = () => {
  const { } = useTranslation();
  const token = localStorage.getItem("token");

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
    enabled: Boolean(token),
  });

  const profile = data?.message?.data;

  const [selectedMember, setSelectedMember] = useState(null);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  // If the user is a Guest, replace Profile page with the Guest page
  if (isGuestUser(profile)) {
    return <Navigate to="/guest" replace />;
  }

  if (isError) {
    return <div>{error.message || "Something went wrong"}</div>;
  }

  const displayedData = selectedMember
    ? {
        ...profile,
        fullName: selectedMember?.name,
        profileImage: selectedMember?.photo,
        studentId: selectedMember?.studentId,
        qrImage: selectedMember?.qrImage,
        academies: selectedMember?.academyStatus?.programs || [],
        digitalCard: {
          ...profile?.digitalCard,
          status: selectedMember?.subscriptionStatus,
          memberCode:
            selectedMember?.qrIdentifier || selectedMember?.id,
        },
      }
    : profile;

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <Proflie_Header data={profile} />
      <Membership_Stats data={profile} />

      <div className="flex flex-wrap ">
        <div className=" xl:w-[55%] w-full px-5 space-y-4">
          <MembershipCard
            data={displayedData}
            selectedMember={selectedMember}
            onBackToMain={() => setSelectedMember(null)}
          />
          <Outstanding data={profile} />

          <Payments data={profile} />
        </div>

        <div className="xl:w-[45%] w-full px-5 space-y-4">
          {/* <Notifications data={profile.notifications} /> */}
          <AcademySubscriptions data={profile?.academyStatus?.programs} />

          <FamilyMembers data={profile?.familyMembers}
            onSelectMember={setSelectedMember} />
          <Achievements data={profile?.achievements} />
          <QuickActions data={profile} />
        </div>
      </div>
    </div>
  );
};

export default Profile;
