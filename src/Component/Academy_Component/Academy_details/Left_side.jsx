import React from "react";
import {
  FaUsers,
  FaStar,
  FaTrophy,
  FaClock,
} from "react-icons/fa";

const Left_side = ({ data }) => {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">

          <div>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl font-bold text-gray-800">
                {data?.name}
              </h1>

              {data?.isFeatured && (
                <span className="bg-[#00BFA6]/10 text-[#00BFA6] px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
              )}
            </div>

            <p className="text-gray-500 mt-3 leading-7">
              {data?.description}
            </p>
          </div>

          <button className="bg-[#00BFA6] hover:bg-[#00a892] duration-300 text-white px-8 py-3 rounded-xl font-semibold">
            احجز الآن
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">

        <div className="bg-white border rounded-2xl p-5">
          <FaStar className="text-[#00BFA6] text-2xl mb-3" />

          <h3 className="text-gray-500 text-sm mb-1">
            التقييم
          </h3>

          <p className="font-bold text-2xl">
            {data?.rating}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <FaUsers className="text-[#00BFA6] text-2xl mb-3" />

          <h3 className="text-gray-500 text-sm mb-1">
            عدد الطلاب
          </h3>

          <p className="font-bold text-2xl">
            {data?.studentsCount}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <FaUsers className="text-[#00BFA6] text-2xl mb-3" />

          <h3 className="text-gray-500 text-sm mb-1">
            عدد المدربين
          </h3>

          <p className="font-bold text-2xl">
            {data?.trainersCount}
          </p>
        </div>

        <div className="bg-white border rounded-2xl p-5">
          <FaClock className="text-[#00BFA6] text-2xl mb-3" />

          <h3 className="text-gray-500 text-sm mb-1">
            البرامج
          </h3>

          <p className="font-bold text-2xl">
            {data?.programs?.length}
          </p>
        </div>
      </div>

      {/* Programs */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          البرامج المتاحة
        </h2>

        <div className="space-y-4">
          {data?.programs?.map((program, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5"
            >
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

                <div>
                  <h3 className="font-bold text-lg text-gray-800">
                    {program.name}
                  </h3>

                  <div className="flex flex-wrap gap-4 mt-3 text-sm text-gray-500">
                    <span>
                      المدة: {program.duration} شهور
                    </span>

                    <span>
                      {program.sessionsPerWeek} حصص أسبوعيًا
                    </span>

                    <span>
                      العمر:
                      {" "}
                      {program.ageMin}
                      {program.ageMax && ` - ${program.ageMax}`}
                    </span>
                  </div>
                </div>

                <div className="text-[#00BFA6] font-bold text-2xl">
                  {program.price} ج
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Objectives */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          أهداف الأكاديمية
        </h2>

        <div className="space-y-4">
          {data?.objectives?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <div className="w-2 h-2 rounded-full bg-[#00BFA6] mt-3"></div>

              <p className="text-gray-600 leading-7">
                {item}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Facilities */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          المرافق
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data?.facilities?.map((facility, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl p-4 text-gray-700"
            >
              {facility}
            </div>
          ))}
        </div>
      </div>

      {/* Trainers */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          المدربين
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {data?.trainers?.map((trainer, index) => (
            <div
              key={index}
              className="border rounded-2xl p-5 flex items-center gap-4"
            >
              <img
                src={trainer.photo}
                alt={trainer.name}
                className="w-20 h-20 rounded-full object-cover"
              />

              <div>
                <h3 className="font-bold text-lg">
                  {trainer.name}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {trainer.role}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {trainer.certifications?.map((cert, i) => (
                    <span
                      key={i}
                      className="bg-[#00BFA6]/10 text-[#00BFA6] text-xs px-3 py-1 rounded-full"
                    >
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-2xl border p-6 shadow-sm">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">
          الإنجازات
        </h2>

        <div className="space-y-4">
          {data?.achievements?.map((item, index) => (
            <div
              key={index}
              className="flex items-start gap-4 border-b pb-4 last:border-none"
            >
              <FaTrophy className="text-[#00BFA6] text-xl mt-1" />

              <div>
                <h3 className="font-semibold text-gray-800">
                  {item.title}
                </h3>

                <p className="text-sm text-gray-500 mt-1">
                  {item.season}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};

export default Left_side;