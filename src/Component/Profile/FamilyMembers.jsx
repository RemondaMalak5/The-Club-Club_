import { User } from "lucide-react";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { assets } from "../../assets/assets";


const FamilyMembers = ({ data ,onSelectMember}) => {

  const [selectedMember, setSelectedMember] = useState(null);

const handleSelectMember = (member) => {
  setSelectedMember(member.id);
  onSelectMember(member);
};
  const { t } = useTranslation();
  return (
    <div className="bg-white rounded-xl p-4 shadow border">
      <h3 className="font-bold text-[20px] mb-3">{t("family_members")}</h3> 

     {data?.map((e) => (
  <div
    key={e.id}
    onClick={() => handleSelectMember(e)}
    className={`
      flex justify-between items-center py-3 px-3
      border-b last:border-b-0
      cursor-pointer rounded-xl
      transition-all duration-200
      ${
        selectedMember === e.id
          ? "border-2 border-[#168C73]"
          : "border border-transparent"
      }
    `}
  >
    <div className="flex items-center gap-3">
      <img
        src={e.photo || assets.logo}
        alt={e.name}
        className="w-10 h-10 rounded-full object-cover"
      />

      <div>
        <p className="font-medium">{e.name}</p>

        <p className="text-xs text-gray-500 flex gap-3">
          <span>{e.relation}</span>

          <span>
            •{" "}
            {e.age > 0
              ? `${e.age} ${t("years")}`
              : t("not_specified")}
          </span>
        </p>
      </div>
    </div>
  </div>
))}

      
    </div>
  );
};

export default FamilyMembers;