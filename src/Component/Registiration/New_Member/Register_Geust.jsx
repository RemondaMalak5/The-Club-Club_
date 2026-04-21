import React from "react";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import { BsPersonPlus } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import H_one_register from "../../Shared_Component/H_one_register";
import Already_Have_Account from "../../Shared_Component/Already_Have_Account";
import { IoIosArrowRoundBack } from "react-icons/io";

const Register_Geust = () => {
  const navigate = useNavigate();
  const arr = [
    { label: "الاسم بالكامل ", description: "ادخل الاسم بالكامل" },
    { label: "رقم الهاتف", description: "1755415336  " },
    { label: "البريد الإلكتروني", description: "ادخل البريد الإلكتروني" },
    { label: "الرقم القومى ", description: "13456789134" },
  ];
  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title="تسجيل كضيف" />
      <div className="border p-7 w-[50%] flex flex-col gap-3  rounded-xl shadow-2xl">
        <div className="flex flex-col items-center justify-center">
          <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
            <BsPersonPlus />
          </span>
          <H_one_register title="تسجيل كضيف" />
          <p className="font-semibold text-[16px] text-[#5B626E]">
            الرجاء إدخال بيانات العضوية للمتابعة
          </p>
        </div>

        <div>
          {arr.map((item, index) => (
            <div key={index} className="flex flex-col gap-2 mt-4">
              <label> {item.label}</label>
              <input
                type="text"
                className="border p-2 rounded-lg"
                placeholder={item.description}
              />
            </div>
          ))}
        </div>
        <button onClick={() => navigate("/otp-guest")} className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mt-5 flex justify-center items-center gap-1">
          التالى
          <span className="text-[19px] "> <IoIosArrowRoundBack/> </span>
        </button>
        <Already_Have_Account/>
      </div>
    </div>
  );
};


export default Register_Geust;
