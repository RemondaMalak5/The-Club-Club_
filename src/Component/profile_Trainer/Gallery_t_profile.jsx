import React, { useState } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const Gallery_t_profile = ({ data }) => {
  const gallery = Array.isArray(data) ? data : [];

  const [currentIndex, setCurrentIndex] = useState(0);

  // عدد الصور الظاهرة
  const visibleImages = 4;

  const nextImages = () => {
    if (currentIndex + visibleImages < gallery.length) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevImages = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  if (gallery.length === 0) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      
      {/* Title */}
      <h2 className="text-[30px] font-bold text-gray-900 mb-4">
        معرض الصور
      </h2>

      {/* Images */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {gallery
          .slice(currentIndex, currentIndex + visibleImages)
          .map((image, index) => (
            <div
              key={`${image}-${index}`}
              className="h-28 overflow-hidden rounded-xl"
            >
              <img
                src={image}
                alt={`صورة ${currentIndex + index + 1}`}
                loading="lazy"
                className="
                  w-full
                  h-full
                  object-cover
                  transition-transform
                  duration-300
                  hover:scale-105
                "
              />
            </div>
          ))}
      </div>

      {/* Arrows */}
      {gallery.length > visibleImages && (
        <div className="flex items-center justify-center gap-2 mt-4">
          
          <button
            type="button"
            onClick={prevImages}
            disabled={currentIndex === 0}
            className="
              w-8 h-8
              rounded-full
              bg-gray-100
              text-gray-600
              flex items-center justify-center
              transition
              hover:bg-gray-200
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <FiChevronRight />
          </button>

          <button
            type="button"
            onClick={nextImages}
            disabled={
              currentIndex + visibleImages >= gallery.length
            }
            className="
              w-8 h-8
              rounded-full
              bg-[#15957e]
              text-white
              flex items-center justify-center
              transition
              hover:bg-[#117c69]
              disabled:opacity-40
              disabled:cursor-not-allowed
            "
          >
            <FiChevronLeft />
          </button>

        </div>
      )}
    </div>
  );
};

export default Gallery_t_profile;