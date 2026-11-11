import React, { useMemo } from "react";
import { Navigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";
import Guest_Header from "../Component/Guest_Component/Guest_Header";
import Guest_Stats from "../Component/Guest_Component/Guest_Stats";
import Guest_Upgrade_Banner from "../Component/Guest_Component/Guest_Upgrade_Banner";
import Guest_Quick_Actions from "../Component/Guest_Component/Guest_Quick_Actions";
import Spinner from "../Component/Shared_component/Spinner";
import { Get_profile } from "../axiosConfig/APIs/Profile/Profile";
import { isGuestUser } from "../utils/userType";

const Guest_Page = () => {
  const { i18n } = useTranslation();
  const token = localStorage.getItem("token");

  const savedUser = useMemo(() => {
    try {
      const raw = localStorage.getItem("user");
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  }, []);

  const { data, isLoading } = useQuery({
    queryKey: ["profile", i18n.language],
    queryFn: () =>
      Get_profile({
        language: i18n.language,
      }),
    enabled: Boolean(token),
    retry: 1,
  });

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (isLoading) {
    return <Spinner />;
  }

  const apiProfile = data?.message?.data || null;

  // If the authenticated user is actually a full club member, send them to /profile
  if (apiProfile && !isGuestUser(apiProfile)) {
    return <Navigate to="/profile" replace />;
  }

  const guestData = {
    ...savedUser,
    ...(apiProfile || {}),
  };

  return (
    <div className="px-5 py-4 md:px-10 md:py-5 xl:px-16 xl:py-6">
      <Guest_Header data={guestData} />
      <Guest_Stats data={guestData} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Guest_Upgrade_Banner />
        </div>

        <div className="lg:col-span-5">
          <Guest_Quick_Actions />
        </div>
      </div>
    </div>
  );
};

export default Guest_Page;
