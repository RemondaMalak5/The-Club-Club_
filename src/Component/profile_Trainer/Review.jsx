import React from "react";
import { FaStar } from "react-icons/fa";

const Review = ({ data }) => {
  const reviews = Array.isArray(data?.data) ? data.data : [];

  const formatDate = (date) => {
    if (!date) return "";

    return new Date(date).toLocaleDateString("ar-EG", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">
          آراء وتقييمات المتدربين وأولياء الأمور
        </h2>

        <span className="text-xs text-gray-500">
          {reviews.length} تقييم
        </span>
      </div>

      {reviews.length > 0 ? (
        <div className="space-y-3">
          {reviews.map((review) => (
            <div
              key={review.id}
              className="border border-gray-200 rounded-xl p-4 bg-[#F9FAFB]"
            >
              <div className="flex items-start justify-between gap-3">
                
                <div className="flex items-center gap-3">
                  {review?.reviewerImage ? (
                    <img
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      className="w-10 h-10 rounded-full object-cover "
                    />
                  ) : (
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-sm font-bold text-gray-500">
                      {review?.reviewerName?.charAt(0)}
                    </div>
                  )}

                  <div>
                    <h3 className="text-sm font-semibold text-gray-900">
                      {review?.reviewerName}
                    </h3>

                    <p className="text-[11px] text-gray-400 mt-0.5">
                      {formatDate(review?.createdAt)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <FaStar
                      key={star}
                      className={`text-[18px] ${
                        star <= Number(review?.rating)
                          ? "text-[#FFCC00]"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-[14px] text-[#364153] bg-white border border-gray-200 rounded-lg p-3 leading-6 mt-3">
                {review?.comment}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <div className="py-10 text-center text-sm text-gray-400">
          لا توجد تقييمات حتى الآن
        </div>
      )}

      {data?.hasMore && (
        <button className="w-full mt-4 text-sm font-medium text-[#15957e] hover:underline">
          عرض المزيد من التقييمات
        </button>
      )}
    </div>
  );
};

export default Review;