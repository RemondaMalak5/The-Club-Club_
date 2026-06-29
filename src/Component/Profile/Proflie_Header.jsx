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
  const { t } = useTranslation();

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
    image:"",
    language: i18next.language,
  });

  useEffect(() => {
    if (data) {
      setFormData({
        fullName: data?.fullName || "",
        phone: data?.phone || "",
        email: data?.email || "",
        dateOfBirth: data?.dateOfBirth || "",
        gender: data?.gender || "",
        image:data?.image,
        language: i18next.language,
      });
    }
  }, [data]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/";
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
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
        image:formData.image,
        language: i18next.language,
      };

      await Update_profile(body);

      setOpen(false);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="py-5 px-10 rounded-2xl flex flex-wrap bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A]">
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
                title: "تسجيل الخروج",
                message:
                  "هل أنت متأكد من رغبتك في تسجيل الخروج من حسابك؟ ستحتاج إلى تسجيل الدخول مرة أخرى للوصول إلى حسابك.",
                confirmText: "تسجيل خروج",
                cancelText: "إلغاء",
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
                  تعديل البيانات الشخصية
                </h2>
                <p className="text-[#6A7282]">
                  حدّث بياناتك الشخصية لضمان دقة معلومات حسابك وسهولة التواصل معك.
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
                        "/images/default-user.png"
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
                    <label>الاسم بالكامل</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>رقم الهاتف</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>البريد الإلكتروني</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col xl:w-1/2 w-full px-2">
                    <label>تاريخ الميلاد</label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="border p-2 rounded-xl mt-2"
                    />
                  </div>

                  <div className="flex flex-col  w-full px-2">
                    <label>النوع</label>
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
                      <MenuItem value="">اختاري النوع</MenuItem>
                      <MenuItem value="Male">Male</MenuItem>
                      <MenuItem value="Female">Female</MenuItem>
                    </Select>
                  </div>
                </div>

                <div className="flex w-full gap-3 mt-5">
                  <button
                    type="submit"
                    disabled={loading}
                    className="bg-[#08AC85] text-white px-5 py-2 rounded-xl w-1/2 disabled:opacity-60"
                  >
                    {loading ? "جاري التعديل..." : "تعديل البيانات"}
                  </button>

                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="px-5 py-2 border rounded-xl w-1/2"
                  >
                    إلغاء
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