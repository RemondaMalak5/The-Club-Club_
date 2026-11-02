import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaStar,
  FaTimes,
  FaGlobe,
} from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { IoChatbubbleOutline } from "react-icons/io5";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { assets } from "../../../assets/assets";
import { useBranch } from "../../../Context/BranchContext";
import Spinner from "../../Shared_Component/Spinner";
import {
  Get_Trainer_Profile,
  Add_Trainer_Review,
} from "../../../axiosConfig/APIs/Academy/Trainer_Profile";

const TrophyOneIcon = () => (
  <svg
    width="28"
    height="28"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="shrink-0 text-[#F59E0B]"
  >
    <path
      d="M6 3H18V9C18 12.3137 15.3137 15 12 15C8.68629 15 6 12.3137 6 9V3Z"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M6 5H3V7C3 9.20914 4.79086 11 7 11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M18 5H21V7C21 9.20914 19.2091 11 17 11"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 15V19"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M8 21H16"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <text
      x="12"
      y="11"
      textAnchor="middle"
      fill="currentColor"
      fontSize="7.5"
      fontWeight="bold"
      fontFamily="Cairo, sans-serif"
    >
      1
    </text>
  </svg>
);

// Normalize branchId: Trainer Profile API is per-branch only and does NOT accept "all".
// Valid branch slugs: new_capital | sheraton | master
const normalizeTrainerBranchId = (rawBranch) => {
  if (!rawBranch) return "master";
  const value = String(rawBranch).trim();
  const lower = value.toLowerCase();

  if (!value || lower === "all") return "master";
  if (
    lower === "sheraton" ||
    lower.includes("sheraton") ||
    value.includes("شيراتون") ||
    value.includes("الشيراتون")
  ) {
    return "sheraton";
  }
  if (
    lower === "new_capital" ||
    lower.includes("capital") ||
    value.includes("العاصمة")
  ) {
    return "new_capital";
  }
  if (
    lower === "master" ||
    lower.includes("october") ||
    value.includes("اكتوبر") ||
    value.includes("أكتوبر")
  ) {
    return "master";
  }
  return value;
};

const getSocialIcon = (platform = "") => {
  const p = String(platform).toLowerCase();
  if (p.includes("whatsapp") || p.includes("واتس")) {
    return <FaWhatsapp className="text-lg" />;
  }
  if (p.includes("twitter") || p === "x" || p.includes("threads")) {
    return <FaXTwitter className="text-lg" />;
  }
  if (p.includes("instagram") || p.includes("انستا")) {
    return <FaInstagram className="text-lg" />;
  }
  if (p.includes("facebook") || p.includes("فيس")) {
    return <FaFacebookF className="text-lg" />;
  }
  return <FaGlobe className="text-lg" />;
};

const formatSocialHref = (platform = "", rawUrl = "") => {
  const url = String(rawUrl || "").trim();
  if (!url) return "#";
  const p = String(platform).toLowerCase();
  if (
    (p.includes("whatsapp") || p.includes("واتس")) &&
    !url.startsWith("http")
  ) {
    const digits = url.replace(/[^0-9+]/g, "");
    const phone = digits.startsWith("0") ? `2${digits}` : digits;
    return `https://wa.me/${phone}`;
  }
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    return `https://${url}`;
  }
  return url;
};

const Team_member_details = () => {
  const { i18n } = useTranslation();
  const isAr = i18n.language === "ar";
  const location = useLocation();
  const { id } = useParams();
  const { selectedBranch } = useBranch();

  const member = location.state?.member;
  const branchId = normalizeTrainerBranchId(
    location.state?.branchId || member?.branchId || selectedBranch
  );

  const [trainerData, setTrainerData] = useState(null);
  const [loading, setLoading] = useState(true);

  // API pagination state for achievements
  const [achievements, setAchievements] = useState([]);
  const [achievementsPage, setAchievementsPage] = useState(1);
  const [hasMoreAchievements, setHasMoreAchievements] = useState(false);
  const [loadingMoreAchievements, setLoadingMoreAchievements] = useState(false);

  // API pagination state for reviews
  const [reviews, setReviews] = useState([]);
  const [reviewsPage, setReviewsPage] = useState(1);
  const [hasMoreReviews, setHasMoreReviews] = useState(false);
  const [loadingMoreReviews, setLoadingMoreReviews] = useState(false);

  // Gallery & Review modal state
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [newCommentName, setNewCommentName] = useState("");
  const [newCommentText, setNewCommentText] = useState("");
  const [newCommentRating, setNewCommentRating] = useState(5);
  const [isSubmittingReview, setIsSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    const decodedRouteId = id ? decodeURIComponent(id) : "";
    const trainerId = member?.id || member?.trainerId || decodedRouteId;
    if (!trainerId) {
      setLoading(false);
      return;
    }

    const fetchTrainerProfile = async () => {
      setLoading(true);
      try {
        const res = await Get_Trainer_Profile({
          branchId,
          language: i18n.language,
          id: trainerId,
          achievements_page: 1,
          reviews_page: 1,
          achievements_per_page: 5,
          reviews_per_page: 5,
        });

        const payload =
          res?.message?.data || res?.message || res?.data || res;

        if (
          isMounted &&
          payload &&
          typeof payload === "object" &&
          !payload.error
        ) {
          setTrainerData(payload);

          if (Array.isArray(payload?.achievements?.data)) {
            setAchievements(payload.achievements.data);
            setAchievementsPage(payload.achievements.page || 1);
            setHasMoreAchievements(Boolean(payload.achievements.hasMore));
          } else if (Array.isArray(payload?.achievements)) {
            setAchievements(payload.achievements);
            setHasMoreAchievements(false);
          } else {
            setAchievements([]);
            setHasMoreAchievements(false);
          }

          if (Array.isArray(payload?.reviews?.data)) {
            setReviews(payload.reviews.data);
            setReviewsPage(payload.reviews.page || 1);
            setHasMoreReviews(Boolean(payload.reviews.hasMore));
          } else if (Array.isArray(payload?.reviews)) {
            setReviews(payload.reviews);
            setHasMoreReviews(false);
          } else {
            setReviews([]);
            setHasMoreReviews(false);
          }
        }
      } catch (error) {
        if (isMounted) {
          setTrainerData(null);
          setAchievements([]);
          setReviews([]);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchTrainerProfile();

    return () => {
      isMounted = false;
    };
  }, [id, member?.id, member?.trainerId, branchId, i18n.language]);

  const handleLoadMoreAchievements = async () => {
    if (!hasMoreAchievements || loadingMoreAchievements) return;
    const nextPage = achievementsPage + 1;
    const decodedRouteId = id ? decodeURIComponent(id) : "";
    const trainerId = trainerData?.id || member?.id || decodedRouteId;
    setLoadingMoreAchievements(true);
    try {
      const res = await Get_Trainer_Profile({
        branchId,
        language: i18n.language,
        id: trainerId,
        achievements_page: nextPage,
        reviews_page: reviewsPage,
        achievements_per_page: 5,
        reviews_per_page: 5,
      });
      const payload =
        res?.message?.data || res?.message || res?.data || res;
      const newItems = payload?.achievements?.data || [];
      setAchievements((prev) => [...prev, ...newItems]);
      setAchievementsPage(payload?.achievements?.page || nextPage);
      setHasMoreAchievements(Boolean(payload?.achievements?.hasMore));
    } catch (error) {
      // Keep current list on error
    } finally {
      setLoadingMoreAchievements(false);
    }
  };

  const handleLoadMoreReviews = async () => {
    if (!hasMoreReviews || loadingMoreReviews) return;
    const nextPage = reviewsPage + 1;
    const decodedRouteId = id ? decodeURIComponent(id) : "";
    const trainerId = trainerData?.id || member?.id || decodedRouteId;
    setLoadingMoreReviews(true);
    try {
      const res = await Get_Trainer_Profile({
        branchId,
        language: i18n.language,
        id: trainerId,
        achievements_page: achievementsPage,
        reviews_page: nextPage,
        achievements_per_page: 5,
        reviews_per_page: 5,
      });
      const payload =
        res?.message?.data || res?.message || res?.data || res;
      const newItems = payload?.reviews?.data || [];
      setReviews((prev) => [...prev, ...newItems]);
      setReviewsPage(payload?.reviews?.page || nextPage);
      setHasMoreReviews(Boolean(payload?.reviews?.hasMore));
    } catch (error) {
      // Keep current list on error
    } finally {
      setLoadingMoreReviews(false);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!newCommentText.trim() || !newCommentName.trim()) return;

    const reviewerNameValue = newCommentName.trim();
    const commentValue = newCommentText.trim();
    const decodedRouteId = id ? decodeURIComponent(id) : "";
    const trainerId = trainerData?.id || member?.id || decodedRouteId;

    setIsSubmittingReview(true);
    setReviewError(null);

    try {
      const response = await Add_Trainer_Review({
        branchId,
        language: i18n.language,
        trainerId,
        reviewerName: reviewerNameValue,
        rating: Number(newCommentRating),
        comment: commentValue,
      });

      const resPayload =
        response?.message?.data ||
        response?.data ||
        response?.message ||
        response;

      if (resPayload?.error || response?.message?.success === false) {
        setReviewError(
          resPayload?.error ||
            resPayload?.message ||
            (isAr ? "حدث خطأ أثناء إرسال التعليق" : "Failed to submit comment")
        );
        return;
      }

      const createdReview = {
        id: resPayload?.id || Date.now(),
        reviewerName: resPayload?.reviewerName || reviewerNameValue,
        reviewerImage:
          resPayload?.reviewerImage ||
          resPayload?.avatar ||
          resPayload?.image ||
          null,
        rating: Number(resPayload?.rating || newCommentRating),
        comment: resPayload?.comment || commentValue,
        createdAt: resPayload?.createdAt,
      };

      setReviews((prev) => [createdReview, ...prev]);
      setNewCommentName("");
      setNewCommentText("");
      setNewCommentRating(5);
      setIsCommentModalOpen(false);
    } catch (error) {
      const backendMsg =
        error?.response?.data?.message?.error ||
        error?.response?.data?.message?.message ||
        error?.response?.data?.error ||
        (isAr ? "حدث خطأ أثناء إرسال التعليق" : "Failed to submit comment");
      setReviewError(String(backendMsg));
    } finally {
      setIsSubmittingReview(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  const displayName = trainerData?.name || member?.name || "";
  const displayAvatar =
    trainerData?.image ||
    trainerData?.photo ||
    member?.logo ||
    member?.photo ||
    member?.image ||
    assets.image_1;
  const displaySpecialization =
    trainerData?.specialization || member?.role || "";
  const displayBio = trainerData?.bio || member?.bio || "";

  const displayTags = Array.isArray(trainerData?.tags)
    ? trainerData.tags
    : Array.isArray(member?.certifications)
    ? member.certifications
    : [];

  const socialLinks = Array.isArray(trainerData?.socialLinks)
    ? trainerData.socialLinks.map((item) => ({
        icon: getSocialIcon(item?.platform),
        href: formatSocialHref(item?.platform, item?.url),
        label: item?.platform || "Social",
      }))
    : [];

  const achievementsList = achievements.map((item) =>
    typeof item === "string"
      ? item
      : item?.title || item?.description || item?.name || ""
  );

  const awardsList = Array.isArray(trainerData?.awards)
    ? trainerData.awards.map((award) => {
        if (typeof award === "string") return award;
        if (award?.title && award?.year) {
          return String(award.title).includes(String(award.year))
            ? award.title
            : `${award.title} (${award.year})`;
        }
        return award?.title || award?.name || "";
      })
    : [];

  const galleryImages = Array.isArray(trainerData?.gallery)
    ? trainerData.gallery
        .map((img) =>
          typeof img === "string" ? img : img?.image || img?.url || ""
        )
        .filter(Boolean)
    : [];

  const visibleGalleryCount = Math.min(4, galleryImages.length);
  const visibleGallery = Array.from({ length: visibleGalleryCount }, (_, i) => {
    return galleryImages[(galleryIndex + i) % galleryImages.length];
  });

  const handleNextGallery = () => {
    if (galleryImages.length === 0) return;
    setGalleryIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const handlePrevGallery = () => {
    if (galleryImages.length === 0) return;
    setGalleryIndex(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
    );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-14">
      {/* Top Profile Banner */}
      <div className="bg-[#EBF2F0] py-10 px-4 sm:px-8 lg:px-16">
        <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Profile Info (Right in RTL) */}
          <div className="flex flex-col sm:flex-row items-center gap-6 md:gap-8 text-center sm:text-start">
            <img
              src={displayAvatar}
              alt={displayName}
              className="w-36 h-36 md:w-44 md:h-44 rounded-full object-cover shadow-md border-4 border-white/80 shrink-0"
            />

            <div className="flex flex-col items-center sm:items-start">
              {displayName && (
                <h1 className="text-2xl md:text-[30px] font-extrabold text-[#111827] mb-2">
                  {displayName}
                </h1>
              )}

              {displaySpecialization && (
                <p className="text-[#4B5563] text-sm md:text-[15px] leading-7 max-w-md mb-5">
                  {displaySpecialization}
                </p>
              )}

              {displayTags.length > 0 && (
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                  {displayTags.map((tag, idx) => (
                    <span
                      key={idx}
                      className="bg-white text-[#1F2937] font-semibold text-sm px-6 py-2 rounded-xl shadow-sm border border-gray-100"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Social Links & Leave Comment Button (Left in RTL) */}
          <div className="flex flex-col items-center md:items-end justify-between gap-6 md:self-stretch py-1">
            {socialLinks.length > 0 ? (
              <div className="flex items-center gap-2.5">
                {socialLinks.map((item, idx) => (
                  <a
                    key={idx}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.label}
                    className="w-10 h-10 rounded-full bg-[#097E6E] hover:bg-[#076356] text-white flex items-center justify-center transition shadow-sm"
                  >
                    {item.icon}
                  </a>
                ))}
              </div>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={() => {
                setReviewError(null);
                setIsCommentModalOpen(true);
              }}
              className="bg-[#097E6E] hover:bg-[#076356] text-white font-semibold text-sm md:text-base px-6 py-3 rounded-xl flex items-center gap-2.5 shadow-sm transition"
            >
              <IoChatbubbleOutline className="text-lg" />
              <span>{isAr ? "أترك تعليقاً" : "Leave a Comment"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 lg:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Right Column in RTL (About, Achievements, Awards) */}
          <div className="lg:col-span-7 space-y-6">
            {/* About Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-7">
              <h2 className="text-xl font-bold text-[#111827] mb-3">
                {isAr ? "نبذة عن المدرب" : "About the Coach"}
              </h2>
              {displayBio ? (
                <p className="text-[#4B5563] text-sm md:text-[15px] leading-8">
                  {displayBio}
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  {isAr ? "لا توجد نبذة متاحة" : "No bio available"}
                </p>
              )}
            </div>

            {/* Achievements Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-7">
              <h2 className="text-xl font-bold text-[#111827] mb-5">
                {isAr ? "الإنجازات المحققة" : "Achievements"}
              </h2>

              {achievementsList.length > 0 ? (
                <div className="space-y-3.5">
                  {achievementsList.map((item, index) => (
                    <div
                      key={index}
                      className="bg-[#FEFCE8] border border-[#FDE047] rounded-xl px-5 py-3.5 text-[#374151] text-sm md:text-[15px] font-medium"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  {isAr ? "لا توجد إنجازات مسجلة" : "No achievements listed"}
                </p>
              )}

              {hasMoreAchievements && (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    disabled={loadingMoreAchievements}
                    onClick={handleLoadMoreAchievements}
                    className="text-sm font-semibold text-[#374151] underline hover:text-[#097E6E] transition disabled:opacity-50"
                  >
                    {loadingMoreAchievements
                      ? isAr
                        ? "جاري التحميل..."
                        : "Loading..."
                      : isAr
                      ? "عرض المزيد من الإنجازات"
                      : "View More Achievements"}
                  </button>
                </div>
              )}
            </div>

            {/* Awards Card */}
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-7">
              <h2 className="text-xl font-bold text-[#111827] mb-5">
                {isAr ? "الجوائز الحاصل عليها" : "Awards Received"}
              </h2>

              {awardsList.length > 0 ? (
                <div className="space-y-4">
                  {awardsList.map((award, index) => (
                    <div
                      key={index}
                      className="bg-[#F9FAFB] border border-gray-200/70 rounded-xl px-5 py-4 flex items-center gap-3.5"
                    >
                      <TrophyOneIcon />
                      <span className="text-[#374151] text-sm md:text-[15px] font-semibold">
                        {award}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-400 text-sm">
                  {isAr ? "لا توجد جوائز مسجلة" : "No awards listed"}
                </p>
              )}
            </div>
          </div>

          {/* Left Column in RTL (Trainees & Parents Reviews) */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6">
              <h2 className="text-lg md:text-xl font-bold text-[#111827] mb-5 text-center">
                {isAr
                  ? "آراء وتعليقات المتدربين وأولياء الأمور"
                  : "Trainees & Parents Reviews"}
              </h2>

              {reviews.length > 0 ? (
                <div className="space-y-4">
                  {reviews.map((review, idx) => {
                    const reviewerName =
                      review?.reviewerName || review?.name || "";
                    const reviewerAvatar =
                      review?.reviewerImage ||
                      review?.avatar ||
                      review?.image ||
                      assets.image_1;
                    const reviewRating = Number(review?.rating ?? 5);

                    return (
                      <div
                        key={review?.id || idx}
                        className="bg-[#F9FAFB] rounded-xl p-3.5 border border-gray-100"
                      >
                        <div className="flex items-center justify-between gap-2 mb-2.5">
                          <div className="flex items-center gap-2.5">
                            <img
                              src={reviewerAvatar}
                              alt={reviewerName}
                              className="w-8 h-8 rounded-full object-cover shrink-0"
                            />
                            <span className="text-xs md:text-sm font-bold text-[#1F2937]">
                              {reviewerName}
                            </span>
                          </div>

                          <div className="flex items-center gap-0.5 text-[#FACC15] text-xs">
                            {[...Array(5)].map((_, i) => (
                              <FaStar
                                key={i}
                                className={
                                  i < reviewRating
                                    ? "text-[#FACC15]"
                                    : "text-gray-300"
                                }
                              />
                            ))}
                          </div>
                        </div>

                        <div className="bg-white rounded-lg p-2.5 border border-gray-100">
                          <p className="text-xs text-[#6B7280] leading-6">
                            {review?.comment}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-gray-400 text-sm text-center py-4">
                  {isAr ? "لا توجد تعليقات حتى الآن" : "No reviews yet"}
                </p>
              )}

              {hasMoreReviews && (
                <div className="mt-5 text-center">
                  <button
                    type="button"
                    disabled={loadingMoreReviews}
                    onClick={handleLoadMoreReviews}
                    className="text-sm font-semibold text-[#374151] underline hover:text-[#097E6E] transition disabled:opacity-50"
                  >
                    {loadingMoreReviews
                      ? isAr
                        ? "جاري التحميل..."
                        : "Loading..."
                      : isAr
                      ? "عرض المزيد من التعليقات"
                      : "View More Comments"}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Full-Width Photo Gallery */}
        {galleryImages.length > 0 && (
          <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-7 mt-6">
            <h2 className="text-xl font-bold text-[#111827] mb-5">
              {isAr ? "معرض الصور" : "Photo Gallery"}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {visibleGallery.map((img, index) => (
                <div
                  key={index}
                  className="rounded-2xl overflow-hidden h-[190px] shadow-sm"
                >
                  <img
                    src={img}
                    alt={`gallery-${index}`}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>

            {galleryImages.length > 4 && (
              <div className="flex items-center justify-center gap-3 mt-6">
                <button
                  type="button"
                  onClick={handleNextGallery}
                  aria-label="Next photos"
                  className="w-10 h-10 rounded-full bg-[#097E6E] hover:bg-[#076356] text-white flex items-center justify-center transition shadow-sm"
                >
                  {isAr ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
                </button>

                <button
                  type="button"
                  onClick={handlePrevGallery}
                  aria-label="Previous photos"
                  className="w-10 h-10 rounded-full bg-[#E5E7EB] hover:bg-gray-300 text-[#4B5563] flex items-center justify-center transition"
                >
                  {isAr ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Leave a Comment Modal */}
      {isCommentModalOpen && (
        <div className="fixed inset-0 z-[9999] bg-black/50 flex items-center justify-center px-4">
          <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-6 relative">
            <button
              type="button"
              onClick={() => setIsCommentModalOpen(false)}
              className="absolute top-4 left-4 text-gray-400 hover:text-red-500 text-xl"
            >
              <FaTimes />
            </button>

            <h3 className="text-xl font-bold text-[#111827] mb-4 text-center">
              {isAr ? "أترك تعليقاً" : "Leave a Comment"}
            </h3>

            <form onSubmit={handleAddComment} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isAr ? "الاسم" : "Name"}
                </label>
                <input
                  type="text"
                  required
                  value={newCommentName}
                  onChange={(e) => setNewCommentName(e.target.value)}
                  placeholder={isAr ? "أدخل اسمك" : "Enter your name"}
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#097E6E]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isAr ? "التقييم" : "Rating"}
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setNewCommentRating(star)}
                      className="text-xl focus:outline-none"
                    >
                      <FaStar
                        className={
                          star <= newCommentRating
                            ? "text-[#FACC15]"
                            : "text-gray-300"
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {isAr ? "التعليق" : "Comment"}
                </label>
                <textarea
                  rows={4}
                  required
                  value={newCommentText}
                  onChange={(e) => setNewCommentText(e.target.value)}
                  placeholder={
                    isAr ? "اكتب تعليقك هنا..." : "Write your comment here..."
                  }
                  className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-[#097E6E]"
                />
              </div>

              {reviewError && (
                <p className="text-xs text-red-600 text-center">
                  {reviewError}
                </p>
              )}

              <button
                type="submit"
                disabled={isSubmittingReview}
                className="w-full bg-[#097E6E] hover:bg-[#076356] disabled:opacity-60 text-white font-semibold py-2.5 rounded-xl transition"
              >
                {isSubmittingReview
                  ? isAr
                    ? "جاري الإرسال..."
                    : "Submitting..."
                  : isAr
                  ? "إرسال التعليق"
                  : "Submit Comment"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Team_member_details;
