import React from "react";

const villas = [
  {
    title: "فيلا فاخرة",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227",
  },
  {
    title: "فيلا عائلية",
    image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
  },
  {
    title: "فيلا على البحر",
    image: "https://images.unsplash.com/photo-1505691938895-1758d7feb511",
  },
  {
    title: "فيلا بمسبح",
    image: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
  },
];

const values = [
  {
    title: "الراحة",
    desc: "نوفر لك تجربة إقامة مريحة ومتكاملة داخل أفضل الفيلات.",
  },
  {
    title: "الخصوصية",
    desc: "نضمن لك أعلى مستويات الخصوصية والأمان أثناء إقامتك.",
  },
  {
    title: "الفخامة",
    desc: "تصميمات عصرية وتجهيزات فاخرة تناسب جميع الأذواق.",
  },
  {
    title: "الموقع المميز",
    desc: "فيلات في أفضل المواقع السياحية والقريبة من الخدمات.",
  },
  {
    title: "الخدمة الممتازة",
    desc: "فريق دعم متكامل لخدمتك على مدار الساعة.",
  },
];

const About_services = () => {
  return (
    <div className="bg-gray-100 py-16 px-6 md:px-16">

      {/* الفيلات */}
      <h2 className="text-2xl md:text-3xl font-bold text-teal-700 text-right mb-10">
        فيلات مميزة للإقامة
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
        {villas.map((villa, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition"
          >
            <img
              src={villa.image}
              alt={villa.title}
              className="h-40 w-full object-cover"
            />
            <div className="p-4 text-center text-gray-700 font-medium">
              {villa.title}
            </div>
          </div>
        ))}
      </div>

      {/* المميزات */}
      <div className="grid md:grid-cols-2 gap-10 items-center">

        {/* النصوص */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-teal-700 text-right mb-6">
            مميزات الفيلات
          </h2>

          <div className="space-y-4">
            {values.map((item, index) => (
              <div
                key={index}
                className="bg-gray-200 rounded-xl p-4 shadow-sm text-right"
              >
                <h3 className="text-teal-700 font-semibold mb-1">
                  {item.title}
                </h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* الصور */}
        <div className="relative flex justify-center">
          <img
            src="https://images.unsplash.com/photo-1613977257363-707ba9348227"
            alt="villa"
            className="w-56 h-80 object-cover rounded-2xl shadow-lg absolute top-0"
          />
          <img
            src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
            alt="villa"
            className="w-56 h-80 object-cover rounded-2xl shadow-lg mt-20 mr-20"
          />
        </div>
      </div>
    </div>
  );
};

export default About_services;