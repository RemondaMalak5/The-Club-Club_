import React from "react";

const AchievementsTimeline = () => {
  const data = [
    {
      year: "2025-2026",
      wins: 0,
      runnerUp: 0,
      third: 0,
      progress: 0,
    },
    {
      year: "2024-2025",
      wins: 0,
      runnerUp: 0,
      third: 0,
      progress: 75,
    },
    {
      year: "2023-2024",
      wins: 0,
      runnerUp: 0,
      third: 0,
      progress: 80,
    },
  ];

  return (
    <div className=" px-20 py-5 ">
      
      {/* Title */}
      <h2 className="text-right text-xl font-bold mb-6">
        الإنجازات عبر السنوات الماضية
      </h2>

      <div className="relative">
        
        {/* Vertical Line */}
        <div className="absolute right-4 top-0 bottom-0 w-[2px] bg-teal-500"></div>

        <div className="flex flex-col gap-6">
          {data.map((item, index) => (
            
            <div key={index} className="relative">
              
              {/* Circle */}
              <div className="absolute right-0 top-5 w-8 h-8 bg-teal-500 rounded-full flex items-center justify-center text-white text-sm shadow">
                📋
              </div>

              {/* Card */}
              <div className="bg-white rounded-xl p-5 mr-12 shadow-sm">
                
                {/* Top Row */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-700 font-semibold">
                    {item.year}
                  </span>

                  <div className="flex gap-6 text-sm text-gray-600">
                    
                    <div className="flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-500 p-1 rounded">
                        🏆
                      </span>
                      البطولات {item.wins}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-orange-100 text-orange-500 p-1 rounded">
                        🥈
                      </span>
                      المراكز المتقدمة {item.runnerUp}
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="bg-yellow-100 text-yellow-500 p-1 rounded">
                        🥇
                      </span>
                      الكؤوس الذهبية {item.third}
                    </div>

                  </div>
                </div>

                {/* Progress Label */}
                <div className="text-sm text-gray-500 text-right mb-1">
                  نسبة الإنجاز
                </div>

                {/* Progress Bar */}
                <div className="w-full bg-gray-200 h-2 rounded-full">
                  <div
                    className="bg-teal-500 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${item.progress}%` }}
                  ></div>
                </div>

                {/* Percentage */}
                <div className="text-xs text-gray-400 mt-1">
                  {item.progress}%
                </div>

              </div>
            </div>

          ))}
        </div>
      </div>
    </div>
  );
};

export default AchievementsTimeline;