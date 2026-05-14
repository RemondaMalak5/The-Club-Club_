import React from "react";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineDateRange } from "react-icons/md";
import { FiUsers } from "react-icons/fi";

const Left_side_chamin = ({ data }) => {
  return (
    <div className="space-y-5">
      {/* Title Card */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-[#1B1B1B]">
              {data?.name || "دوري كرة القدم المصري"}
            </h1>

            <p className="text-[#8A8A8A] mt-2 leading-7">
              {data?.description ||
                "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."}
            </p>
          </div>

          <button className="bg-[#D4AF37] hover:bg-[#c39f2f] duration-300 text-white px-6 py-3 rounded-xl font-medium">
            سجل الآن
          </button>
        </div>
      </div>

      {/* Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F4F4F4] flex items-center justify-center">
              <IoLocationOutline className="text-[#D4AF37] text-xl" />
            </div>

            <div>
              <p className="text-[#8A8A8A] text-sm">الموقع</p>
              <h3 className="font-semibold">
                {data?.location || "القاهرة"}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F4F4F4] flex items-center justify-center">
              <MdOutlineDateRange className="text-[#D4AF37] text-xl" />
            </div>

            <div>
              <p className="text-[#8A8A8A] text-sm">التاريخ</p>
              <h3 className="font-semibold">
                {data?.date || "12 مايو 2026"}
              </h3>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-[#F4F4F4] flex items-center justify-center">
              <FiUsers className="text-[#D4AF37] text-xl" />
            </div>

            <div>
              <p className="text-[#8A8A8A] text-sm">عدد الفرق</p>
              <h3 className="font-semibold">
  {data?.teams?.length || 16} فريق
</h3>
            </div>
          </div>
        </div>
      </div>

      {/* About */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⭐</span>
          <h2 className="text-xl font-bold">نبذة عن البطولة</h2>
        </div>

        <p className="text-[#6B6B6B] leading-8 text-sm">
          {data?.about ||
            "هذا النص هو مثال لنص يمكن أن يستبدل في نفس المساحة."}
        </p>
      </div>

      {/* Teams */}
      <div className="bg-yellow-50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🏆</span>
          <h2 className="text-xl font-bold">الفريقات المشاركة</h2>
        </div>

        <div className="space-y-2">
          {data?.teams?.map((team, index) => (
            <div key={index} className="flex items-center gap-3 p-2 hover:bg-yellow-100 rounded">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">
                {index + 1}
              </span>
              {team?.logo && (
                <img src={team.logo} alt={team?.name} className="w-6 h-6 rounded-full object-cover" />
              )}
              <span className="text-sm font-medium text-gray-700">{team?.name || "فريق"}</span>
            </div>
          )) || (
            <>
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[#D4AF37] flex items-center justify-center text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-600">فريق {i + 1}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Main Participants */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">⭐</span>
          <h2 className="text-xl font-bold">المشاركين الأساسيين</h2>
        </div>

        <div className="space-y-2">
          {data?.participants?.map((participant, index) => (
            <div key={index} className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded">
              <span className="flex-shrink-0 text-xl">
                {participant?.role === 'coach' ? '🎖️' : participant?.role === 'referee' ? '👨‍⚖️' : '⚽'}
              </span>
              {participant?.avatar && (
                <img
                  src={participant.avatar}
                  alt={participant?.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <span className="text-sm font-medium text-gray-800">{participant?.name || `مشارك`}</span>
              </div>
            </div>
          )) || (
            <>
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex items-center gap-3 p-2">
                  <span className="flex-shrink-0 text-xl">
                    {i === 0 ? '🎖️' : i === 1 ? '👨‍⚖️' : '⚽'}
                  </span>
                  <div className="w-6 h-6 rounded-full bg-gray-300"></div>
                  <span className="text-sm font-medium text-gray-600">مشارك {i + 1}</span>
                </div>
              ))}
            </>
          )}
        </div>
      </div>

      {/* Gallery */}
      <div className="bg-white rounded-2xl shadow-sm p-6">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl">🎥</span>
          <h2 className="text-xl font-bold">معرض الصور والفيديوهات</h2>
        </div>

        <div className="grid grid-cols-3 gap-3">
          {data?.gallery?.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="gallery"
              className="w-full h-[120px] object-cover rounded-lg hover:opacity-80 transition-opacity"
            />
          )) || (
            <>
              {[...Array(9)].map((_, i) => (
                <div
                  key={i}
                  className="w-full h-[120px] bg-gray-300 rounded-lg animate-pulse"
                ></div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Left_side_chamin;