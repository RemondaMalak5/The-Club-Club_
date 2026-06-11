import React from "react";
import { CalendarDays, IdCard, Award } from "lucide-react";

const Membership_Stats = ({ data }) => {
  const stats = [
    {
      title: "نقاط المكافآت",
      value: `${data?.loyaltyPoints || 0} نقطة`,
      desc: "يمكن استبدالها بخصومات",
      icon: Award,
      color: "border-r-yellow-400",
      bg: "bg-yellow-100",
      iconColor: "text-yellow-500",
    },
    {
      title: "تاريخ انتهاء العضوية",
      value: data?.membershipExpiry || "غير متاح",
      desc: "تاريخ انتهاء العضوية",
      icon: CalendarDays,
      color: "border-r-blue-500",
      bg: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      title: "آخر تجديد للعضوية",
      value: data?.lastRenewalDate || "غير متاح",
      desc: "آخر مرة تم فيها تجديد العضوية",
      icon: CalendarDays,
      color: "border-r-green-500",
      bg: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      title: "رقم العضوية",
      value: data?.membershipNo || data?.membershipId,
      desc: data?.membershipType || "غير متاح",
      icon: IdCard,
      color: "border-r-orange-400",
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
  ];

  return (
    <div className="py-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`
                bg-white rounded-xl p-5 min-h-[122px]
                border-r-4 ${item.color}
                shadow-[0_2px_10px_rgba(0,0,0,0.08)]
                flex flex-col gap-1 justify-between
                text-right
              `}
            >
              <div className="flex justify-start items-start">
                <div
                  className={`
                    w-9 h-9 rounded-md ${item.bg}
                    flex items-center justify-center
                  `}
                >
                  <Icon size={20} className={item.iconColor} />
                </div>
              </div>

              <div>
                <p className="text-xs text-gray-400 mb-2">
                  {item.title}
                </p>

                <h3 className="text-lg font-bold text-slate-900 leading-tight">
                  {item.value}
                </h3>

                <p className="text-[11px] text-gray-400 mt-2">
                  {item.desc}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Membership_Stats;