// import React from 'react'
// import { RiShieldUserLine } from "react-icons/ri";
// import { CiLocationOn } from "react-icons/ci";
// import H_one from '../../Component/Shared_component/H_one';

// const Header_t_profie = ({data}) => {
//   return (
//       <div>
//       <div className="py-5 px-10 rounded-2xl flex flex-wrap bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] to-[#DCF0EB9A]">
//          <div className="flex gap-4 items-center xl:w-1/2 w-full">
//           <img
//             src={data?.image || "/images/default-user.png"}
//             className="w-28 h-28 rounded-full object-cover"
//             loading="lazy"
//             alt="profile"
//           />


//           <div className="flex flex-col gap-2">
//             <H_one text={data?.name} />

//               <p className="flex items-center gap-1 ">
//                 {data?.bio}
//               </p>
//                <div className="flex items-center gap-2">
//                 <p className="bg-white p-3 rounded-2xl">
//                   {data?.tags?.map((tag, index) => (
//                     <span key={index} className="text-sm ">
//                       {tag}
//                     </span>
//                   ))}
//                 </p>
//                </div>
                
//           </div>
//         </div>
//         <div className="hidden md:flex xl:w-1/2 w-full gap-4 justify-end py-5 h-fit">
//                <button className="bg-[#0D6E5A] text-[#ffffff] px-4 py-2 rounded-2xl hover:bg-[#ffffff] hover:text-[#0D6E5A] transition">
//                 اترك تعليق</button>  
                 
//          </div>
//       </div>
//     </div>
//   )
// }

// export default Header_t_profie
import React, { useState } from "react";
import { FaStar, FaTimes } from "react-icons/fa";
import i18next from "i18next";
import { createPortal } from "react-dom";
import { Add_Trainer_Review } from "../../axiosConfig/APIs/Profile_Trainer/Add_Trainer_Review";
import H_one from "../Shared_component/H_one";

const Header_t_profie = ({ data, trainerId, branchId, onReviewAdded }) => {
  const [showReview, setShowReview] = useState(false);
  const [reviewerName, setReviewerName] = useState("");
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitReview = async (e) => {
    e.preventDefault();

    if (!reviewerName || !rating || !comment) {
      alert("من فضلك كملي كل البيانات");
      return;
    }

    const body = {
      branchId,
      language: i18next.language,
      trainerId,
      reviewerName,
      rating,
      comment,
    };

    try {
      setLoading(true);

      const response = await Add_Trainer_Review(body);

      console.log("Add review response:", response);

      setShowReview(false);
      setReviewerName("");
      setRating(0);
      setComment("");

      // لو عايزة تعملي refresh للداتا بعد إضافة التعليق
      if (onReviewAdded) {
        onReviewAdded();
      }
    } catch (error) {
      console.error("Add trainer review error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div>
        <div className="py-5 px-10 rounded-2xl flex flex-wrap bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] to-[#DCF0EB9A]">
          <div className="flex gap-4 items-center xl:w-1/2 w-full">
            <img
              src={data?.image || "/images/default-user.png"}
              className="w-28 h-28 rounded-full object-cover"
              loading="lazy"
              alt="profile"
            />

            <div className="flex flex-col gap-2">
              <H_one text={data?.name} />

              <p className="flex items-center gap-1">
                {data?.bio}
              </p>

              <div className="flex items-center gap-2">
                {data?.tags?.map((tag, index) => (
                  <span
                    key={index}
                    className="text-sm bg-white px-3 py-2 rounded-2xl"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden md:flex xl:w-1/2 w-full gap-4 justify-end py-5 h-fit">
            <button
              type="button"
              onClick={() => setShowReview(true)}
              className="bg-[#0D6E5A] text-white px-4 py-2 rounded-2xl hover:bg-white hover:text-[#0D6E5A] transition"
            >
              اترك تعليق
            </button>
          </div>
        </div>
      </div>

      {showReview &&
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">
            <div className="bg-white w-full max-w-md rounded-2xl p-6 relative">
              <button
                type="button"
                onClick={() => setShowReview(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
              >
                <FaTimes />
              </button>

              <h2 className="text-xl font-bold text-center mb-6">
                اترك تعليق
              </h2>

              <form
                onSubmit={handleSubmitReview}
                className="space-y-4"
              >
                <div>
                  <label className="block mb-2 font-medium">
                    الاسم
                  </label>

                  <input
                    type="text"
                    value={reviewerName}
                    onChange={(e) => setReviewerName(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0D6E5A]"
                    placeholder="اكتب اسمك"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    التقييم
                  </label>

                  <div className="flex gap-2 text-2xl">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className={
                          star <= rating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      >
                        <FaStar />
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    التعليق
                  </label>

                  <textarea
                    rows="4"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full border rounded-xl px-4 py-3 outline-none focus:border-[#0D6E5A]"
                    placeholder="اكتب تعليقك..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#0D6E5A] text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                >
                  {loading ? "جاري الإرسال..." : "إرسال التعليق"}
                </button>
              </form>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Header_t_profie;