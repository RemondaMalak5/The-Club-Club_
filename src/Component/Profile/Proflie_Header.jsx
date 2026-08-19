import React, { useEffect, useState } from "react";
import { RiShieldUserLine } from "react-icons/ri";
import { CiEdit, CiLocationOn, CiStar } from "react-icons/ci";
import { FaArrowRightToBracket } from "react-icons/fa6";
import H_one from "../Shared_Component/H_one";
import { usePopup } from "../../context/PopupContext";
import { FaCamera } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import i18next from "i18next";
import { Update_profile } from "../../axiosConfig/APIs/Profile/Update_profile";

const Proflie_Header = ({ data }) => {
  const { showPopup } = usePopup();
  const { t, i18n } = useTranslation();

  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    email: "",
    dateOfBirth: "",
    gender: "",
    image: "",
    language: i18next.language,
  });

useEffect(() => {
  if (!data) return;

  setFormData({
    fullName: data.fullName || "",
    phone: data.phone || "",
    email: data.email || "",
    dateOfBirth: data.dateOfBirth || "",
    gender:
      data.gender === "ذكر"
        ? "Male"
        : data.gender === "انثى"
        ? "Female"
        : "",
    language: i18next.language,
  });

  setPreview(data.profileImage || "");
  setImage("");
}, [data, i18next.language]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
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

  reader.onerror = () => {
    console.log("Failed to read image");
  };

  reader.readAsDataURL(file);
};

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const body = {
      fullName: formData.fullName,
      phone: formData.phone,
      email: formData.email,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      language: i18next.language,
    };

    if (image) {
      body.image = image;
    }

    const response = await Update_profile(body);

    console.log("Profile updated successfully", response);

    setOpen(false);
  } catch (error) {
    console.log(error?.response?.data || error);
  } finally {
    setLoading(false);
  }
};

  return (
    <div>
      <div className="py-5 px-10 rounded-2xl flex flex-wrap bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] to-[#DCF0EB9A]">
        <div className="flex gap-4 items-center xl:w-1/2 w-full">
          <img
            src={data?.profileImage || "/images/default-user.png"}
            className="w-20 h-20 rounded-full object-cover"
            loading="lazy"
            alt="profile"
          />

          <div className="flex flex-col gap-2">
            <H_one text={data?.fullName} />

            <div className="flex text-[#6A7282] font-medium gap-4">
              <p className="flex items-center gap-1">
                <RiShieldUserLine />
                {data?.membershipType}
              </p>

              <p className="flex items-center gap-1">
                <CiStar />
                {data?.membershipTier}
              </p>

              <p className="flex items-center gap-1">
                <CiLocationOn />
                {data?.branch}
              </p>
            </div>
          </div>
        </div>

        <div className="hidden md:flex xl:w-1/2 w-full gap-4 justify-end py-5 h-fit">
          <span
            onClick={() => setOpen(true)}
            className="p-3 bg-[#00786F] text-white rounded-xl text-[18px] font-bold cursor-pointer"
          >
            <CiEdit />
          </span>

          <span
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
            className="p-3 bg-[#00786F] text-white rounded-xl text-[18px] cursor-pointer"
          >
            <FaArrowRightToBracket />
          </span>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
            <div className="bg-white xl:w-[50%] w-[90%] max-h-[90vh] overflow-y-auto rounded-2xl p-6">
              <div className="justify-center flex flex-col items-center text-center">
                <h2 className="text-2xl font-bold">
                  {t("edit_profile")}
                </h2>
                <p className="text-[#6A7282]">
                  {t("edit_profile_subtitle")}
                </p>
              </div>

              <div className="flex flex-col items-center mt-4">
                <div className="relative w-24 h-24">
                  <input
                    id="image"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImage}
                  />

                  <label htmlFor="image" className="cursor-pointer">
                    <img
                      src={
                        preview ||
                        data?.image ||
                        ""
                      }
                      alt="profile"
                      className="w-24 h-24 rounded-full object-cover border"
                    />

                    <div className="absolute bottom-0 right-0 w-7 h-7 rounded-full bg-gray-700 text-white flex items-center justify-center border-2 border-white">
                      <FaCamera size={12} />
                    </div>
                  </label>
                </div>

                <p className="mt-2 font-semibold">{formData.fullName}</p>
              </div>

              <form onSubmit={handleSubmit} className="mt-5">
                <div className="w-full flex flex-wrap gap-y-3">
                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>{t("full_name_label")}</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>{t("phone_label")}</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>{t("email_label")}</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>
<div className="flex flex-col xl:w-1/2 w-full px-2">
  <label>{t("date_of_birth")}</label>

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
    className="border p-2 rounded-xl mt-2 cursor-pointer"
  />
</div>

                  <div className="flex flex-col  w-full px-2">
                    <label>{t("gender")}</label>
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

                <div className="flex w-full gap-3 mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#08AC85] text-white px-5 py-2 rounded-xl w-1/2 disabled:opacity-60"
                  >
                    {loading ? t("updating") : t("update_profile")}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 border rounded-xl w-1/2"
                  >
                    {t("cancel")}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Proflie_Header;