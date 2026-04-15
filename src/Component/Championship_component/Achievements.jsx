import React from "react";

const Achievements = () => {
  const achievements = [
    {
      title: "كرة السلة",
      icon: "🏀",
      total: 16,
      indoor: 10,
      outdoor: 6,
    },
    {
      title: "الكاراتيه",
      icon: "🥋",
      total: 14,
      indoor: 8,
      outdoor: 6,
    },
    {
      title: "السباحة",
      icon: "🏊",
      total: 18,
      indoor: 12,
      outdoor: 6,
    },
    {
      title: "كرة القدم",
      icon: "⚽",
      total: 24,
      indoor: 15,
      outdoor: 9,
    },
  ];

  return (
    <div className="">
      
      {/* Title */}
      <h2 className="text-right text-xl font-semibold mb-6">
        الإنجازات الرياضية
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {[...achievements, ...achievements].map((item, index) => (
          
          <div
            key={index}
            className="bg-white rounded-xl shadow-sm p-5 hover:shadow-md hover:-translate-y-1 transition duration-300"
          >
            
            {/* Top */}
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-bold text-teal-600">
                  {item.total}
                </h2>
                <p className="text-sm text-gray-400">بطولة</p>
              </div>

              <div className="text-3xl">{item.icon}</div>
            </div>

            {/* Title */}
            <h3 className="mt-3 text-gray-700 font-medium text-right">
              {item.title}
            </h3>

            {/* Bottom */}
            <div className="flex gap-3 mt-4 justify-end">
              
              <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-lg text-sm">
                {item.outdoor} خارجية
              </div>

              <div className="bg-teal-100 text-teal-600 px-4 py-2 rounded-lg text-sm">
                {item.indoor} داخلية
              </div>

            </div>

          </div>

        ))}
      </div>

    </div>
  );
};

export default Achievements;