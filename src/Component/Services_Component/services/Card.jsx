import React from "react";
import { Calendar, MapPin, Users } from "lucide-react";

const Card = ({ item }) => {
  return (
    <div className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden">

      {/* Image */}
      <div className="relative">
        <img
          src={item.image}
          alt=""
          className="w-full h-48 object-cover"
          loading="lazy"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 bg-white px-3 py-1 rounded-full text-sm shadow">
          {item.category}
        </span>

        {/* Price */}
        <span className="absolute top-3 right-3 bg-teal-600 text-white px-3 py-1 rounded-full text-sm">
          {item.price} جنيه
        </span>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{item.title}</h3>
        <p className="text-gray-500 text-sm mb-3">{item.desc}</p>

        {/* Info */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <Calendar size={16} />
          {item.date}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
          <MapPin size={16} />
          {item.location}
        </div>

        <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
          <Users size={16} />
          {item.seats} مقاعد
        </div>

        {/* Button */}
        <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
          عرض التفاصيل
        </button>
      </div>
    </div>
  );
};

export default Card;