import { Stepper } from "@mui/material";
import React from "react";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import H_one_register from "../../Shared_Component/H_one_register";
import { useNavigate } from "react-router-dom";
import { BsPersonPlus } from "react-icons/bs";
import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
import { IoIosArrowRoundBack } from "react-icons/io";

const Account_setup = () => {
  const navigate = useNavigate();
  const arr = [
    { label: "الاسم المستخدم ", description: "ادخل الاسم المستخدم" },
    { label: "كلمة المرور", description: "*****  " },
    { label: "تاكيد كلمة المرور", description: "*****  " },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title="اعدادات الحساب " currentStep={3} />
      <div className="border p-7 w-[50%] flex flex-col gap-3  rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
            <BsPersonPlus/>
          </span>
          <H_one_register title="اعدادات الحساب " />
          <p className=" text-[16px] text-[#5B626E]">
            قم بإنشاء اسم مستخدم وكلمة مرور
          </p>
        </div>

        <div>
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-4">
              <label className="font-medium text-[16px] text-[#364153]"> {item.label}</label>
              <input
                type="text"
                className="border p-2 rounded-lg text-[14px] text-[#5B626E]"
                placeholder={item.description}
              />
            </div>
          ))}
        </div>
        <button
          onClick={() => navigate("/")}
          className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1"
        >
          التالى
          <span className="text-[19px] "> <IoIosArrowRoundBack/> </span>
        </button>
       <Already_Have_Account/>
      </div>
    </div>
  );
};
 
export default Account_setup;