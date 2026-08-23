import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Contact_us } from "../../axiosConfig/APIs/Contact_us";
import Select from "react-select";
import { usePopup } from "../../context/PopupContext";
import { GiConfirmed } from "react-icons/gi";
import { FaArrowRightToBracket } from "react-icons/fa6";
import { Get_profile } from "../../axiosConfig/APIs/Profile/Profile";
import { useBranch } from "../../context/BranchContext";

const Form_Contact_us = () => {
  const { t, i18n } = useTranslation();
  const { showPopup, closePopup } = usePopup();
  const { branches = [] } = useBranch();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branchId: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const branchOptions = branches.map((branch) => ({
    value: branch.id,
    label: branch.name,
  }));

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
    {
      name: "subject",
      label: t("sub"),
      placeholder: t("sub_placeholder"),
      type: "text",
    },
  ];

  const submitform = async (data) => {
    const body = {
      fullName: data.fullName,
      email: data.email,
      phone: data.phone,
      branchId: data.branchId,
      subject: data.subject,
      message: data.message,
    };


    try {
      const response = await Contact_us(body);


      return response;
    } catch (error) {
      console.error("Failed to submit contact form:", error);

      throw error;
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

    if (!formData.fullName.trim()) {
      newErrors.fullName = t("full_name_required");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("email_required");
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t("email_invalid");
    }

    if (!formData.phone.trim()) {
      newErrors.phone = t("phone_required");
    }

    if (!formData.branchId) {
      newErrors.branchId = t("branch_required");
    }

    if (!formData.message.trim()) {
      newErrors.message = t("message_required");
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
      });

      await submitform(formData);

      showPopup({
        title: "تم الإرسال بنجاح",
        message: "سنتواصل معك قريبًا",
        icon: <GiConfirmed />,
      });

      setFormData({
        fullName: "",
        email: "",
        phone: "",
        branchId: "",
        subject: "",
        message: "",
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
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token || branches.length === 0) return;

    const getProfile = async () => {
      try {
        const profile = await Get_profile();
        const user = profile?.message?.data;

        const profileBranch =
          branches.find(
            (branch) =>
              branch.id === user?.branchId ||
              branch.id === user?.branch
          ) || null;

        setFormData((prev) => ({
          ...prev,
          fullName: user?.fullName || "",
          email: user?.email || "",
          phone: user?.phone || "",
          branchId: profileBranch?.id || "",
        }));
      } catch (error) {
        console.error("Profile Error:", error);
      }
    };

    getProfile();
  }, [branches]);

  return (
    <form onSubmit={handleSubmit} className="w-full xl:w-[70%]">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {inputs.map((input) => (
          <div key={input.name}>
            <label
              className={`mb-2 block font-bold text-gray-700 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {input.label}
            </label>

            <input
              type={input.type}
              name={input.name}
              placeholder={input.placeholder}
              value={formData[input.name]}
              onChange={handleChange}
              className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            />

            {errors[input.name] && (
              <p className="mt-1 text-sm text-red-500">
                {errors[input.name]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="py-3">
        <label className="mb-2 block font-bold text-gray-700">
          {t("branch_label")}
        </label>

        <Select
          options={branchOptions}
          value={
            branchOptions.find(
              (option) => option.value === formData.branchId
            ) || null
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
              color: state.isFocused ? "white" : "black",
            }),
          }}
        />

        {errors.branchId && (
          <p className="mt-1 text-sm text-red-500">
            {errors.branchId}
          </p>
        )}
      </div>

      <div>
        <label className="mb-2 block font-bold text-gray-700">
          {t("message_label")}
        </label>

        <textarea
          name="message"
          placeholder={t("message_placeholder")}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className="w-full resize-none rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500"
        />

        {errors.message && (
          <p className="mt-1 text-sm text-red-500">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-lg font-bold text-white shadow-md transition hover:opacity-90"
      >
        {t("send_message_btn")}
      </button>
    </form>
  );
};

export default Form_Contact_us;