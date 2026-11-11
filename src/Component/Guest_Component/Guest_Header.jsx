import React, { useEffect, useState } from "react";
import { RiUserSmileLine } from "react-icons/ri";
import { CiEdit, CiLocationOn, CiMail, CiPhone } from "react-icons/ci";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { FaCamera } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import H_one from "../Shared_component/H_one";
import { usePopup } from "../../context/PopupContext";
import { Update_profile } from "../../axiosConfig/APIs/Profile/Update_profile";
import { extractApiErrorMessage } from "../../utils/apiError";

const Guest_Header = ({ data }) => {
  const { showPopup } = usePopup();
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [updateError, setUpdateError] = useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
  });

  useEffect(() => {
    if (!data) return;

    const rawGender = String(data.gender || "").trim();
    const normalizedGender =
      rawGender === "ذكر" || rawGender.toLowerCase() === "male"
        ? "Male"
        : rawGender === "انثى" ||
          rawGender === "أنثى" ||
          rawGender.toLowerCase() === "female"
        ? "Female"
        : "";

    setFormData({
      fullName: data.fullName || data.name || "",
      phone: data.phone || data.mobile || "",
      email: data.email || "",
      dateOfBirth: data.dateOfBirth || "",
      gender: normalizedGender,
    });

    setPreview(data.profileImage || data.image || "");
    setImage(null);
  }, [data, i18n.language]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    localStorage.removeItem("branchId");
    localStorage.removeItem("loginBranchId");
    localStorage.removeItem("accountType");

    window.dispatchEvent(new Event("userUpdated"));
    navigate("/login", { replace: true });
  };

  const handleImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64Image = reader.result;
      setImage(base64Image);
      setPreview(base64Image);
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setUpdateError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdateError("");

    try {
      setLoading(true);

      const body = {
        fullName: formData.fullName,
        phone: formData.phone,
        email: formData.email,
        dateOfBirth: formData.dateOfBirth,
        gender: formData.gender,
        language: i18n.language,
      };

      if (image) {
        body.image = image;
      }

      const response = await Update_profile(body);
      if (response?.message?.success === false) {
        setUpdateError(extractApiErrorMessage(response, t("generic_error")));
        return;
      }

      try {
        const savedUser = JSON.parse(localStorage.getItem("user") || "{}");
        const updatedUser = {
          ...savedUser,
          fullName: formData.fullName || savedUser.fullName,
          phone: formData.phone || savedUser.phone,
          email: formData.email || savedUser.email,
          profileImage: preview || savedUser.profileImage,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        window.dispatchEvent(new Event("userUpdated"));
      } catch {}

      await queryClient.invalidateQueries({ queryKey: ["profile"] });
      setOpen(false);
    } catch (error) {
      setUpdateError(extractApiErrorMessage(error, t("generic_error")));
    } finally {
      setLoading(false);
    }
  };

  const avatarUrl =
    typeof data?.profileImage === "string"
      ? data.profileImage
      : typeof data?.image === "string"
      ? data.image
      : "";

  const displayName =
    typeof data?.fullName === "string" && data.fullName
      ? data.fullName
      : typeof data?.name === "string" && data.name
      ? data.name
      : t("guest");

  const displayBranch =
    typeof data?.branch === "string"
      ? data.branch
      : typeof data?.branch?.name === "string"
      ? data.branch.name
      : "";

  const displayPhone =
    typeof data?.phone === "string" && data.phone
      ? data.phone
      : typeof data?.mobile === "string"
      ? data.mobile
      : "";

  const displayEmail = typeof data?.email === "string" ? data.email : "";

  return (
    <div className="rounded-2xl border border-[#FFA811]/30 bg-gradient-to-br from-[#FFF7ED] via-[#EBF5F3] to-[#DCF0EB9A] px-6 py-6 shadow-sm sm:px-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          {avatarUrl ? (
            <img
              src={avatarUrl}
              className="h-20 w-20 rounded-full border-2 border-white object-cover shadow-sm"
              loading="lazy"
              alt={data?.fullName || t("guest")}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#FFA811] to-[#FF683B] text-4xl text-white shadow-sm">
              <CgProfile />
            </div>
          )}

          <div className="flex flex-col gap-1.5">
            <div className="flex flex-wrap items-center gap-2.5">
              <H_one text={displayName} />
              <span className="inline-flex items-center gap-1 rounded-full border border-[#FFA811]/40 bg-[#FFF3DB] px-3 py-1 text-xs font-bold text-[#C46A14]">
                <RiUserSmileLine className="text-sm" />
                {t("guest_account_badge")}
              </span>
            </div>

            <p className="text-sm text-[#5B626E]">
              {t("guest_welcome_subtitle")}
            </p>

            <div className="mt-1 flex flex-wrap items-center gap-4 text-sm font-medium text-[#6A7282]">
              {displayBranch && (
                <span className="flex items-center gap-1">
                  <CiLocationOn className="text-base text-[#00786F]" />
                  {displayBranch}
                </span>
              )}
              {displayPhone && (
                <span className="flex items-center gap-1">
                  <CiPhone className="text-base text-[#00786F]" />
                  {displayPhone}
                </span>
              )}
              {displayEmail && (
                <span className="flex items-center gap-1">
                  <CiMail className="text-base text-[#00786F]" />
                  {displayEmail}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t("edit_profile")}
            title={t("edit_profile")}
            className="flex items-center gap-2 rounded-xl bg-[#00786F] px-4 py-3 text-sm font-bold text-white transition hover:bg-[#005f5a]"
          >
            <CiEdit className="text-lg" />
            <span className="hidden sm:inline">{t("edit_profile")}</span>
          </button>

          <button
            type="button"
            onClick={() =>
              showPopup({
                title: t("logout_title"),
                message: t("logout_message"),
                confirmText: t("logout"),
                cancelText: t("cancel"),
                onConfirm: handleLogout,
                icon: <FaArrowRightToBracket />,
              })
            }
            aria-label={t("logout")}
            title={t("logout")}
            className="flex items-center gap-2 rounded-xl border border-red-200 bg-white px-4 py-3 text-sm font-bold text-red-600 transition hover:bg-red-50"
          >
            <FaArrowRightToBracket className="text-base" />
            <span className="hidden sm:inline">{t("logout")}</span>
          </button>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6">
            <div className="flex flex-col items-center text-center">
              <h2 className="text-2xl font-bold">{t("edit_profile")}</h2>
              <p className="mt-1 text-sm text-[#6A7282]">
                {t("edit_profile_subtitle")}
              </p>
            </div>

            <div className="mt-4 flex flex-col items-center">
              <div className="relative h-24 w-24">
                <input
                  id="guest-profile-image"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImage}
                />

                <label htmlFor="guest-profile-image" className="cursor-pointer">
                  {preview ? (
                    <img
                      src={preview}
                      alt="profile"
                      className="h-24 w-24 rounded-full border object-cover"
                    />
                  ) : (
                    <div className="flex h-24 w-24 items-center justify-center rounded-full border bg-[#F3F6F8] text-4xl text-[#00786F]">
                      <CgProfile />
                    </div>
                  )}

                  <div className="absolute bottom-0 right-0 flex h-7 w-7 items-center justify-center rounded-full border-2 border-white bg-gray-700 text-white">
                    <FaCamera size={12} />
                  </div>
                </label>
              </div>

              <p className="mt-2 font-semibold">{formData.fullName}</p>
            </div>

            {updateError && (
              <div className="mt-4 rounded-xl border border-red-200 bg-red-50 p-3 text-center text-sm text-red-700">
                {updateError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-5">
              <div className="flex w-full flex-wrap gap-y-3">
                <div className="flex w-full flex-col px-2 md:w-1/2">
                  <label className="text-sm font-medium">
                    {t("full_name_label")}
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    className="mt-2 rounded-xl border p-2.5 outline-none focus:border-[#00786F]"
                  />
                </div>

                <div className="flex w-full flex-col px-2 md:w-1/2">
                  <label className="text-sm font-medium">
                    {t("phone_label")}
                  </label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 rounded-xl border p-2.5 outline-none focus:border-[#00786F]"
                  />
                </div>

                <div className="flex w-full flex-col px-2 md:w-1/2">
                  <label className="text-sm font-medium">
                    {t("email_label")}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 rounded-xl border p-2.5 outline-none focus:border-[#00786F]"
                  />
                </div>

                <div className="flex w-full flex-col px-2 md:w-1/2">
                  <label className="text-sm font-medium">
                    {t("date_of_birth")}
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    onClick={(e) => {
                      if (typeof e.currentTarget.showPicker === "function") {
                        e.currentTarget.showPicker();
                      }
                    }}
                    className="mt-2 cursor-pointer rounded-xl border p-2.5 outline-none focus:border-[#00786F]"
                  />
                </div>

                <div className="flex w-full flex-col px-2">
                  <label className="text-sm font-medium">{t("gender")}</label>
                  <Select
                    name="gender"
                    value={formData.gender}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                    displayEmpty
                    sx={{
                      borderRadius: "12px",
                      marginTop: "8px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#ddd",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00786F",
                      },
                      "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#00786F",
                      },
                    }}
                  >
                    <MenuItem value="">{t("select_gender")}</MenuItem>
                    <MenuItem value="Male">{t("male")}</MenuItem>
                    <MenuItem value="Female">{t("female")}</MenuItem>
                  </Select>
                </div>
              </div>

              <div className="mt-6 flex w-full gap-3">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-1/2 rounded-xl bg-[#08AC85] px-5 py-2.5 font-semibold text-white transition hover:bg-[#00786F] disabled:opacity-60"
                >
                  {loading ? t("updating") : t("update_profile")}
                </button>

                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="w-1/2 rounded-xl border px-5 py-2.5 font-medium transition hover:bg-gray-50"
                >
                  {t("cancel")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Guest_Header;
