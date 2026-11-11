import React from "react";
import { UserCheck, MapPin, CalendarCheck2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useBranch } from "../../context/BranchContext";

const Guest_Stats = ({ data }) => {
  const { t } = useTranslation();
  const { branches, selectedBranch } = useBranch();

  const branchFromData =
    typeof data?.branch === "string"
      ? data.branch
      : typeof data?.branch?.name === "string"
      ? data.branch.name
      : "";

  const resolvedBranchName =
    branchFromData ||
    branches?.find((b) => String(b.id) === String(selectedBranch))?.name ||
    t("all_branches");

  const serviceBookingsCount =
    (Array.isArray(data?.servicePayments) ? data.servicePayments.length : 0) +
    (Array.isArray(data?.outstandingServices)
      ? data.outstandingServices.length
      : 0);

  const stats = [
    {
      title: t("account_type_label"),
      value: t("guest_account_badge"),
      desc: t("no_membership"),
      icon: UserCheck,
      color: "border-s-4 border-s-orange-400",
      bg: "bg-orange-100",
      iconColor: "text-orange-500",
    },
    {
      title: t("home_branch"),
      value: resolvedBranchName,
      desc: t("branches"),
      icon: MapPin,
      color: "border-s-4 border-s-teal-500",
      bg: "bg-teal-100",
      iconColor: "text-teal-600",
    },
    {
      title: t("active_bookings"),
      value: String(serviceBookingsCount),
      desc: t("services"),
      icon: CalendarCheck2,
      color: "border-s-4 border-s-emerald-500",
      bg: "bg-emerald-100",
      iconColor: "text-emerald-600",
    },
  ];

  return (
    <div className="py-5">
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`flex min-h-[122px] flex-col justify-between gap-2 rounded-xl bg-white p-5 shadow-[0_2px_10px_rgba(0,0,0,0.08)] ${item.color}`}
            >
              <div
                className={`flex h-9 w-9 items-center justify-center rounded-md ${item.bg}`}
              >
                <Icon size={20} className={item.iconColor} />
              </div>

              <div>
                <p className="mb-1 text-xs text-[#5B626E]">{item.title}</p>
                <h3 className="text-lg font-bold leading-tight text-slate-900">
                  {item.value}
                </h3>
                <p className="mt-1.5 text-xs text-[#5B626E]">{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Guest_Stats;
