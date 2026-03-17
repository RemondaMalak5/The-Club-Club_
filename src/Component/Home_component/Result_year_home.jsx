
import React from "react";

const Result_year_home = () => {
  const data = [
    {
      title: "في الاستيعاب والقراءة الجيدة",
      percent: 88,
      description: "الإجابات: 810 من أصل 1000 على مستوى العالم",
    },
    {
      title: "في الفنون",
      percent: 64,
      description: "الإجابات: 680 من أصل 1000 على مستوى العالم",
    },
    {
      title: "في التطوير",
      percent: 78,
      description: "الإجابات: 782 من أصل 1000 على مستوى العالم",
    },
  ];

  const radius = 60;
  const stroke = 10;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;

  return (
    <div className="w-full flex flex-col items-center py-16 bg-white">
      <h2 className="text-[36px] font-bold text-gray-800 text-center py-2">
        نتائج   <span className="text-[#0A8F7A]"> رائعة ومُلهه </span>لهذا العام
      </h2>
      <p className="text-gray-500  mb-8 text-[18px] font-medium ">
        إحصائيات الأداء السنوي للنادي
      </p>

      <div className="flex flex-wrap justify-center gap-8  w-full">
        {data.map((item, index) => {
          const strokeDashoffset =
            circumference - (item.percent / 100) * circumference;

          return (
            <div
              key={index}
              className="bg-gray-100 rounded-2xl p-14  text-center shadow-xl"
            >
              <div className="relative flex items-center justify-center mb-4">
                <svg height={radius * 2} width={radius * 2}>
                  {/* الخلفية */}
                  <circle
                    stroke="#d1d5db"
                    fill="transparent"
                    strokeWidth={stroke}
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                  />

                  {/* التقدم */}
                  <circle
                    stroke="#0f766e"
                    fill="transparent"
                    strokeWidth={stroke}
                    strokeDasharray={`${circumference} ${circumference}`}
                    style={{ strokeDashoffset }}
                    strokeLinecap="round"
                    r={normalizedRadius}
                    cx={radius}
                    cy={radius}
                    className="transition-all duration-700"
                  />
                </svg>

                <span className="absolute text-2xl font-bold text-teal-700">
                  {item.percent}%
                </span>
              </div>

              <h3 className="font-semibold text-gray-800 mb-1">
                {item.title}
              </h3>

              <p className="text-sm text-gray-500">{item.description}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Result_year_home
