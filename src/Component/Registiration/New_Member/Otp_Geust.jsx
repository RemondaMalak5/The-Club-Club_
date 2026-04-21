import { Stepper } from "@mui/material";
import React, { use, useRef } from "react";
import Stepper_orange from "../../Shared_Component/Stepper_orange";
import H_one_register from "../../Shared_Component/H_one_register";
import { LuShield } from "react-icons/lu";
import { useNavigate } from "react-router-dom";

const Otp_Geust = ({ length=6 }) => {
  const inputsRef = useRef([]);
 const navigation = useNavigate();

  const handleChange = (e, index) => {
    const value = e.target.value;

    // يسمح برقم واحد بس
    if (!/^[0-9]?$/.test(value)) return;

    // الانتقال للأبعد
    if (value && index < length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    // رجوع للخانة اللي قبلها
    if (e.key === "Backspace" && !e.target.value && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };
  return (
    <div className="flex flex-col justify-center items-center">
      <Stepper_orange title="تحقق الهويه " currentStep={2} />
      <div className="border p-7 w-[50%] flex flex-col gap-3 justify-center items-center rounded-xl shadow-2xl">
        <span className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-5 rounded-full text-[30px]">
          <LuShield />
        </span>
        <H_one_register title="تحقق الهويه " />
        <p className=" text-[16px] text-[#5B626E]">
          أدخل الرمز المرسل إلى رقم الهاتف ***5678{" "}
        </p>
        <p className=" text-[16px] text-[#5B626E] pt-5">ادخل رمز التحقق</p>
        <div className="flex gap-3">
          {Array.from({ length }).map((_, index) => (
            <input
              ref={(el) => (inputsRef.current[index] = el)}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              key={index}
              type="text"
              className="border p-2 rounded-lg w-16 h-16 text-center text-[18px]"
              maxLength={1}
            />
          ))}
        </div>
        <p>يمكنك إعادة إرسال الرمز بعد 56 ثانية</p>
          <button onClick={()=>{navigation("/account-setup")}}   className="bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white p-3 rounded-lg w-full mb-1 mt-5 ">
            تحقيق
          </button>
          <button className=" text-[#5B626E] border border-[#FF683B] font-bold py-3 px-5 rounded-lg w-full ">
            اعادة ارسال الرمز
          </button>
        </div>
    </div>
  );
};

export default Otp_Geust;
