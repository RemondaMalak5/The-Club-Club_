import { User } from "lucide-react";
import React from "react";
import { assets } from "../../assets/assets";
import { FaRegArrowAltCircleLeft, FaRegArrowAltCircleRight } from "react-icons/fa";
import i18next from "i18next";
import { FiUsers } from "react-icons/fi";

const FamilyMembers = ({ data }) => {
  return (
    <div className="bg-white rounded-xl p-4 shadow">
      <h3 className="font-bold mb-3">أفراد العائلة</h3> 

      {data?.map((e) => (
        <div
          key={e.id}
          className="flex justify-between items-center py-3 border-b last:border-b-0"
        >
          <div className="flex items-center gap-3">
            <img
              src={e.photo || assets.logo}
              alt={e.name}
              className="w-10 h-10 rounded-full object-cover"
            />

            <div>
              <p className="font-medium">{e.name}</p>

              <p className="text-xs text-gray-500">
                {e.relation} • {e.age > 0 ? `${e.age} سنة` : "غير محدد"}
              </p>
            </div>
          </div>

  <span className="text-[18px] pe-8">
            {i18next.language === "ar" ? (
              <FaRegArrowAltCircleLeft />
            ) : (
              <FaRegArrowAltCircleRight />
            )}{" "}
          </span>
                  </div>
      ))}

      <button className="w-full rounded-2xl border  flex flex-col items-center p-3 my-1">
        <span> <FiUsers/></span> اضافه عضو </button>
    </div>
  );
};

export default FamilyMembers;