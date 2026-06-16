import React from "react";
// import SubTitle from "./../Shared_Component/SubTitle";
import { assets } from "./../../assets/assets";
// import { Type } from "lucide-react";
import { RiShieldUserLine } from "react-icons/ri";
import { CiEdit, CiLocationOn, CiStar } from "react-icons/ci";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaArrowRightToBracket } from "react-icons/fa6";
import H_one from "../Shared_Component/H_one";
import { usePopup } from "../../context/PopupContext";

const Proflie_Header = ({data}) => {
  const { showPopup } = usePopup();
const handleLogout = () => {
  localStorage.clear();
  window.location.href = "/";
};

  return (
    <div >
      <div className="py-5 px-10   rounded-2xl flex flex-wrap bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] ">
        <div className="flex gap-4 items-center xl:w-1/2 w-full">
          <img src={assets.logo} className="w-20 h-20 rounded-full" loading="lazy" />
          <div className=" flex flex-col gap-2">
            <H_one text={data?.fullName} />
            <div className="flex text-[#6A7282] font-medium gap-4 ">
              <p className="flex items-center gap-1">
                <span>
                  <RiShieldUserLine />
                </span>
                {data?.membershipType}
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <CiStar />
                </span>
                {data?.membershipTier}
              </p>
              <p className="flex items-center gap-1">
                <span>
                  <CiLocationOn />
                </span>{" "}
        {data?.branch}
              </p>
            </div>
          </div>
        </div>
        <div className="xl:w-1/2 w-full flex gap-4 justify-end py-5  h-fit">
            <span className="p-3 bg-[#00786F] text-white rounded-xl text-[18px] font-bold"><CiEdit/></span>
                        {/* <span className="p-3 bg-[#00786F] text-white rounded-xl text-[18px]"><IoSettingsOutline/></span> */}
      <span
  onClick={() =>
    showPopup({
      title: "تسجيل الخروج",
      message: "هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟ ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.",
      confirmText: "تسجيل خروج",
      cancelText: "إلغاء",
      onConfirm: handleLogout,
      icon:  <FaArrowRightToBracket />

    })
  }
  className="p-3 bg-[#00786F] text-white rounded-xl text-[18px] cursor-pointer"
>
  <FaArrowRightToBracket />
</span>


        </div>
       
       
    </div>
    </div>
  );
};

export default Proflie_Header;
