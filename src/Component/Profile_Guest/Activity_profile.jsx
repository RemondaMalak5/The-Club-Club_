import React from "react";
import {
  Trophy,
  Activity,
  Accessibility,
  Target,
  ArrowLeft,
} from "lucide-react";

const activities = [
  {
    id: 1,
    title: "صالة الألعاب",
    description: "أجهزة حديثة ومدربين محترفين",
    buttonText: "احجز الآن",
    icon: Trophy,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-100",
    cardBg: "bg-orange-50/60",
    borderColor: "border-orange-100",
    buttonColor: "text-orange-500",
  },
  {
    id: 2,
    title: "السباحة",
    description: "حمامات سباحة أولمبية ومدربين عالميين",
    buttonText: "احجز الآن",
    icon: Activity,
    iconColor: "text-teal-500",
    iconBg: "bg-teal-100",
    cardBg: "bg-teal-50/60",
    borderColor: "border-teal-100",
    buttonColor: "text-teal-500",
  },
  {
    id: 3,
    title: "اليوجا والبيلاتس",
    description: "جلسات جماعية وفردية هادئة",
    buttonText: "احجز الآن",
    icon: Accessibility,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-100",
    cardBg: "bg-purple-50/60",
    borderColor: "border-purple-100",
    buttonColor: "text-purple-500",
  },
  {
    id: 4,
    title: "التنس",
    description: "ملاعب قانونية بأرضيات عالمية",
    buttonText: "احجز الآن",
    icon: Target,
    iconColor: "text-blue-500",
    iconBg: "bg-blue-100",
    cardBg: "bg-blue-50/60",
    borderColor: "border-blue-100",
    buttonColor: "text-blue-500",
  },
];

const Activity_profile = () => {
  return (
    <section
      dir="rtl"
      className="w-full rounded-xl border border-gray-200 bg-white p-3 shadow-sm"
    >
      <h2 className="mb-3 text-right text-[18px] font-bold text-gray-800">
        الأنشطة المقترحة لك
      </h2>

      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div
              key={activity.id}
              className={`
                ${activity.cardBg}
                ${activity.borderColor}
                flex min-h-[145px] flex-col 
                rounded-xl border p-4
                transition duration-300
                hover:-translate-y-1 hover:shadow-md
              `}
            >
              <div
                className={`
                  ${activity.iconBg}
                  ${activity.iconColor}
                  mb-3 flex h-9 w-9 items-center
                  justify-center rounded-lg
                `}
              >
                <Icon size={20} strokeWidth={2} />
              </div>

              <h3 className="mb-1 text-lg font-bold text-gray-800">
                {activity.title}
              </h3>

              <p className="mb-3  text-[14px] leading-5 text-gray-500">
                {activity.description}
              </p>

              <button
                type="button"
                className={`
                  ${activity.buttonColor}
                  mt-auto flex items-center gap-1 w-fit
                  rounded-full border border-gray-200
                  bg-white px-3 py-1 text-[10px]
                  font-medium shadow-sm transition
                  hover:shadow
                `}
              >
                {activity.buttonText}
                <ArrowLeft size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Activity_profile;

