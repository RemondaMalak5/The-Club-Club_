import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Contact_us } from "../../axiosConfig/APIs/Contact_us";
import Select from "react-select";
import { usePopup } from "../../context/PopupContext";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Get_profile } from "../../axiosConfig/APIs/Profile/Profile";

const Form_Contact_us = () => {
  const { t, i18n } = useTranslation();
const { showPopup, closePopup } = usePopup();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branchId: "",
    subject: "",
  });

  const [errors, setErrors] = useState({});
  const inputs = [
    {
      name: "fullName",
      label: t("full_name_label"),
      placeholder: t("full_name_placeholder"),
      type: "text",
    },
    {
      name: "email",
      label: t("email_label"),
      placeholder: t("email_placeholder"),
      type: "email",
    },
    {
      name: "phone",
      label: t("phone_label"),
      placeholder: t("phone_placeholder"),
      type: "text",
    },
  ];

  const branches = [
    {
      value: "The Club - New Capital",
      label: t("branch_capital"),
      branch: "new_capital",
    },
    {
      value: "The Club- Sheraton",
      label: t("branch_shiraton"),
      branch: "sheraton",
    },
    {
      value: "نادي النادي - 6 اكتوبر",
      label: t("branch_6_october"),
      branch: "master",
    },
  ];

  const submitform = async (formData) => {
    const selectedBranch = branches.find(
  (branch) => branch.value === formData.branchId
);

    const body = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      branchId: selectedBranch?.branch ,
      subject: formData.subject,
    };
 console.log(formData.branchId)
    try {
      const response = await Contact_us(body);
      console.log("Success:", response);
      
    } catch (error) {
      console.error("Failed to submit contact form", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) {
      newErrors.fullName = t("full_name_required");
    }

    if (!formData.email?.trim()) {
      newErrors.email = t("email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("email_invalid");
    }

    if (!formData.phone?.trim()) {
      newErrors.phone = t("phone_required");
    }

    if (!formData.branchId) {
      newErrors.branchId = t("branch_required");
    }

    if (!formData.subject?.trim()) {
      newErrors.subject = t("message_required");
    }

    return newErrors;
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  const validationErrors = validateForm();

  if (Object.keys(validationErrors).length > 0) {
    setErrors(validationErrors);
    return;
  }

  try {
    showPopup({
      loading: true,
      title: "جاري الإرسال...",
      message: "برجاء الانتظار",
      showButtons: false,
    });

    await submitform(formData);

    showPopup({
      title: "تم الإرسال بنجاح",
      message: "سنتواصل معك قريبًا",
      icon: <FaArrowRightToBracket />,
      showButtons: false,
    });

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      branchId: "",
      subject: "",
    });

    setErrors({});

    setTimeout(() => {
      closePopup();
    }, 2000);
  } catch (error) {
    showPopup({
      title: "حدث خطأ أثناء الإرسال",
      message: "حاولي مرة أخرى",
      icon: <FaArrowRightToBracket />,
      confirmText: "تمام",
    });
  }
};
useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) return;

  const getProfile = async () => {
    try {
      const profile = await Get_profile();

      const user = profile?.message?.data;

      setFormData((prev) => ({
        ...prev,
        fullName: user?.fullName || "",
        email: user?.email || "",
        phone: user?.phone || "",
        branchId:
  branches.find(
    (b) => b.value === user?.branch
  )?.value || "",
      }));
    } catch (error) {
      console.error("Profile Error:", error);
    }
  };

  getProfile();
}, []);

  return (
    <form onSubmit={handleSubmit} className="w-full xl:w-[70%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {inputs.map((i, index) => (
          <div key={index}>
            <label
              className={`block font-bold text-gray-700 mb-2 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {i.label}
            </label>
            <input
              type={i.type}
              name={i.name}
              placeholder={i.placeholder}
              value={formData[i.name]}
              onChange={handleChange}
              className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            />
            {errors[i.name] && (
              <p
                className={`text-red-500 text-sm mt-1 
                `}
              >
                {errors[i.name]}
              </p>
            )}
          </div>
        ))}
         <div className="">
        <label
          className={`block font-bold text-gray-700 mb-2 
          `}
        >
          {t("branch_label")}
        </label>

        <Select
          options={branches}
          value={
            branches.find((option) => option.value === formData.branchId) || null
          }
         onChange={(selectedOption) => {
  setFormData((prev) => ({
    ...prev,
    branchId: selectedOption?.value || "",
  }));

  setErrors((prev) => ({
    ...prev,
    branchId: "",
  }));
}}
          placeholder={t("select_branch")}
          isSearchable={false}
          styles={{
            control: (provided) => ({
              ...provided,
              minHeight: "50px",
              borderRadius: "12px",
              borderColor: "#d1d5db",
              boxShadow: "none",
            }),
            option: (provided, state) => ({
              ...provided,
backgroundColor: state.isSelected
  ? "#EBF3F1"
  : state.isFocused
    ? "#009689"
    : "white",

color: state.isSelected
  ? "black"
  : "black",
            }),
          }}
        />

        {errors.branchId && (
          <p
            className={`text-red-500 text-sm mt-1 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {errors.branchId}
          </p>
        )}
      </div>

      </div>

     

      {/* Message */}
      <div className="mt-6">
        <label
          className={`block font-bold text-gray-700 mb-2 `}
        >
          {t("message_label")}
        </label>

        <textarea
          name="subject"
          placeholder={t("message_placeholder")}
          value={formData.subject}
          onChange={handleChange}
          rows={5}
          className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-teal-500 
          `}
        />

        {errors.subject && (
          <p
            className={`text-red-500 text-sm mt-1 
            `}
          >
            {errors.subject}
          </p>
        )}
      </div>

      <button 
        type="submit"
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-white font-bold text-lg shadow-md transition hover:opacity-90"
      >
        {t("send_message_btn")}
      </button>
    </form>
  );
};

export default Form_Contact_us;
