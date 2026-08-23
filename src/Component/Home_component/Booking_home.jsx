import React from "react";
import { useTranslation } from "react-i18next";
import { IoIosArrowRoundBack, IoIosFlower } from "react-icons/io";
import { FaSquare } from "react-icons/fa";
import { TiGroupOutline } from "react-icons/ti";
import { LuCalendarCheck } from "react-icons/lu";
import { MdOutlineSportsSoccer } from "react-icons/md";
import Title_1 from "../Shared_Component/Title_1";
import SubTitle from "../Shared_Component/SubTitle";
import { useNavigate } from "react-router-dom";
import { All_Services } from "../../axiosConfig/APIs/Services/All_Services";
import { useQuery } from "@tanstack/react-query";
import { useBranch } from "../../context/BranchContext";

const Booking_home = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  const { selectedBranch } = useBranch();

  const services = [
    {
      icon: <TiGroupOutline />,
      title: t("book_activities"),
      desc: t("activities_description"),
      linkTo: "/academy",
    },
    {
      icon: <LuCalendarCheck />,
      title: t("book_services"),
      desc: t("services_description"),
      linkTo: "/services",
    },
    {
      icon: <MdOutlineSportsSoccer />,
      title: t("renew_membership"),
      desc: t("renewal_description"),
      linkTo: "/profile",
    },
    {
      icon: <TiGroupOutline />,
      title: t("member_profile"),
      desc: t("member_profile_description"),
      linkTo: "/profile",
    },
  ];

  const {
    data: servicesData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["all-services", i18n.language, selectedBranch],
    queryFn: () =>
      All_Services({
        language: i18n.language,
        page: 1,
        page_size: 6,
        branchId: selectedBranch === "all" ? "" : selectedBranch,
      }),
  });
  const events = servicesData?.message?.data || [];

const steps = events.slice(0, 3).map((item) => ({
  id: item.service_id,
  title: item.title,
  category: item.category,
  capacity: item.capacity ,
}));

  const handleNavigation = (linkTo) => {
    if (!linkTo) return;

    navigate(linkTo);
  };

  return (
    <div className="p-10 rounded-3xl border shadow-md bg-gradient-to-l from-[#DBEFEA] via-[#EBF3F1] to-white flex flex-wrap justify-between gap-8">
      <div className="flex flex-col py-5 gap-3 w-full lg:w-[60%]">
        <h2 className="text-[36px] font-bold flex gap-1">
          {t("book_online")}
          <Title_1 title={t("online")} />
        </h2>

        <SubTitle SubTitle={t("booking_subtitle")} />

        <div className="flex flex-wrap py-2">
          {services.map((item, index) => (
            <div key={index} className="md:w-1/2 w-full px-2 py-2">
              <button
                type="button"
                onClick={() => handleNavigation(item.linkTo)}
                className="w-full flex items-center gap-3 justify-between bg-white border rounded-xl px-5 py-4 shadow-sm hover:shadow-md transition text-start"
              >
                <div className="flex gap-2">
                  <div className="p-3 rounded-md text-[22px] bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF]">
                    {item.icon}
                  </div>

                  <div className="flex flex-col">
                    <span className="font-bold text-[15px]">
                      {item.title}
                    </span>

                    <span className="text-[13px] text-[#6A7282]">
                      {item.desc}
                    </span>
                  </div>
                </div>

                <div
                  className={`flex justify-end text-[20px] ${
                    i18n.language === "en" ? "rotate-180" : ""
                  }`}
                >
                  <IoIosArrowRoundBack />
                </div>
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={() => navigate("/profile")}
          className="mx-5 mt-5 bg-[#00786F] text-white py-4 rounded-xl hover:bg-[#00645c] transition"
        >
          {t("view_member_dashboard")}
        </button>
      </div>

      <div className="bg-white border rounded-2xl shadow-md p-6 w-full lg:w-[35%]">
        <h2 className="font-bold text-[22px] bg-gradient-to-r from-[#08AC85DB] to-[#00786F] bg-clip-text text-transparent">
          {t("events_agenda")}
        </h2>

        <div className="flex flex-col gap-4 py-2">
          {isLoading && (
            <p className="text-center text-gray-500 py-5">
              {t("loading") || "Loading..."}
            </p>
          )}

          {isError && (
            <p className="text-center text-red-500 py-5">
              {t("error_loading_data") || "Error loading events"}
            </p>
          )}

         <div className="flex flex-col gap-4 py-2">
  {steps.map((step) => (
    <div
      key={step.id}
      className="flex items-center gap-3 border rounded-xl p-3"
    >
      <div className="px-5 py-3 flex flex-col items-center justify-center rounded-md bg-gradient-to-l from-[#FFF7ED] via-[#EFF4F2] to-[#ECFEFF] font-bold min-w-[70px]">
        <span>{step.capacity}</span>
      </div>

      <div className="flex flex-col gap-1">
        <span className="font-bold text-[16px]">
          {step.title}
        </span>

        <span className="text-[13px] text-gray-500">
          {step.category}
        </span>
      </div>
    </div>
  ))}
</div>

          {!isLoading && !isError && steps.length === 0 && (
            <p className="text-center text-gray-500 py-5">
              {t("no_data") || "No events found"}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={() => navigate("/services")}
          className="w-full mt-5 border border-[#00786F] text-[#36534C] py-2 rounded-lg hover:bg-[#00786F] hover:text-white transition"
        >
          {t("view_all_events")}
        </button>
      </div>
    </div>
  );
};

export default Booking_home;