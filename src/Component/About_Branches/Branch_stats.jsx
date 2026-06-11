import React, { useEffect, useMemo, useState } from "react";
import { Branch_stats } from "../../axiosConfig/APIs/Home/Branch_stats";

const BranchStats = ({ branchId }) => {
  const [branchData, setBranchData] = useState(null);
  const [loading, setLoading] = useState(true);

  const getBranchStats = async () => {
    try {
      setLoading(true);

      const params = {
        branch_id: branchId,
      };

      const response = await Branch_stats(params);
      const data = response?.message?.data || [];

      const selectedBranch =
        data.find((item) => String(item.branchId) === String(branchId)) ||
        data[0] ||
        null;

      setBranchData(selectedBranch);
    } catch (error) {
      console.log("Branch Stats Error:", error);
      setBranchData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (branchId) {
      getBranchStats();
    }
  }, [branchId]);

  const getPercent = (value, maxValue) => {
    if (!maxValue || maxValue <= 0) return 0;
    return Math.min((Number(value) / Number(maxValue)) * 100, 100);
  };

  const stats = useMemo(() => {
    if (!branchData) return [];

    const values = {
      currentMembers: Number(branchData.currentMembers) || 0,
      todayEntry: Number(branchData.todayEntry) || 0,
      todayExit: Number(branchData.todayExit) || 0,
      averageVisitDuration: Number(branchData.averageVisitDuration) || 0,
      occupancyRate: Number(branchData.occupancyRate) || 0,
    };

    const maxNumber = Math.max(
      values.currentMembers,
      values.todayEntry,
      values.todayExit,
      values.averageVisitDuration,
      1
    );

    return [
      {
        title: "الأعضاء الحاليين",
        value: values.currentMembers,
        subtitle: `${values.occupancyRate}% نسبة الإشغال`,
        color: "#00A63E",
        percent: values.occupancyRate,
      },
      {
        title: "إجمالي الزيارات",
        value: values.todayEntry,
        subtitle: "عدد زيارات اليوم",
        color: "#D73502",
        percent: getPercent(values.todayEntry, maxNumber),
      },
      {
        title: "إجمالي الخروج",
        value: values.todayExit,
        subtitle: "عدد الخروج اليوم",
        color: "#F5B400",
        percent: getPercent(values.todayExit, maxNumber),
      },
      {
        title: "متوسط مدة الزيارة",
        value: `${values.averageVisitDuration} ساعات`,
        subtitle: `آخر تحديث ${branchData.lastUpdated || ""}`,
        color: "#FF6900",
        percent: getPercent(values.averageVisitDuration, maxNumber),
      },
    ];
  }, [branchData]);

  const CircleCard = ({ title, value, subtitle, color, percent }) => {
    const radius = 58;
    const stroke = 10;
    const circumference = 2 * Math.PI * radius;
    const safePercent = Math.min(Math.max(Number(percent) || 0, 0), 100);
    const offset = circumference - (safePercent / 100) * circumference;

    return (
      <div className="bg-[#EEF5F5] w-full min-h-[280px] rounded-xl shadow-md flex flex-col items-center justify-center p-5">
        <div className="relative w-[160px] h-[160px] flex items-center justify-center">
          <svg width="160" height="160" className="rotate-[-90deg]">
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#D9DDE1"
              strokeWidth={stroke}
              fill="none"
            />

            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={color}
              strokeWidth={stroke}
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
            />
          </svg>

          <span
            className="absolute text-3xl font-bold text-center px-2"
            style={{ color }}
          >
            {value}
          </span>
        </div>

        <h3 className="text-[#1F2937] font-bold text-[16px] mt-3 text-center">
          {title}
        </h3>

        <p className="text-[#7A8794] text-sm mt-1 text-center">{subtitle}</p>
      </div>
    );
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!branchData) {
    return <div className="text-center py-10">لا توجد بيانات</div>;
  }

  return (
    <section dir="rtl" className="py-12 px-4">
      <h2 className="text-center text-3xl font-bold text-[#1F2937] mb-10">
        إحصائيات الدخول والخروج بالفرع
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {stats.map((item) => (
          <CircleCard
            key={item.title}
            title={item.title}
            value={item.value}
            subtitle={item.subtitle}
            color={item.color}
            percent={item.percent}
          />
        ))}
      </div>
    </section>
  );
};

export default BranchStats;