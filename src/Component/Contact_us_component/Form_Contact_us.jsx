import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Contact_us } from "../../axiosConfig/APIs/Contact_us";
import Select from "react-select";

const Form_Contact_us = () => {
  const { t, i18n } = useTranslation();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const branches = [
    {
      value: "capital",
      label: t("branch_capital"),
      eng: "The Club - New Capital",
    },
    {
      value: "shiraton",
      label: t("branch_shiraton"),
      eng: "The Club - Sheraton",
    },
    {
      value: "october",
      label: t("branch_6_october"),
      eng: "6 October Branch",
    },
  ];

  const submitform = async (formData) => {
    const selectedBranch = branches.find(
      (branch) => branch.value === formData.branch
    );

    const body = {
      full_name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      branch: selectedBranch?.eng || "",
      message: formData.message,
    };

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

    if (!formData.branch) {
      newErrors.branch = t("branch_required");
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

    await submitform(formData);

    setFormData({
      fullName: "",
      email: "",
      phone: "",
      branch: "",
      message: "",
    });

    setErrors({});
  };

  return (
    <form onSubmit={handleSubmit} className="w-full xl:w-[70%]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Full Name */}
        <div>
          <label
            className={`block text-sm text-gray-700 mb-2 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {t("full_name_label")}
          </label>

          <input
            type="text"
            name="fullName"
            placeholder={t("full_name_placeholder")}
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          />

          {errors.fullName && (
            <p
              className={`text-red-500 text-sm mt-1 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {errors.fullName}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label
            className={`block text-sm text-gray-700 mb-2 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {t("email_label")}
          </label>

          <input
            type="email"
            name="email"
            placeholder={t("email_placeholder")}
            value={formData.email}
            onChange={handleChange}
            className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          />

          {errors.email && (
            <p
              className={`text-red-500 text-sm mt-1 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {errors.email}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="md:col-span-2">
          <label
            className={`block text-sm text-gray-700 mb-2 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {t("phone_label")}
          </label>

          <input
            type="text"
            name="phone"
            placeholder={t("phone_placeholder")}
            value={formData.phone}
            onChange={handleChange}
            className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none focus:border-teal-500 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          />

          {errors.phone && (
            <p
              className={`text-red-500 text-sm mt-1 ${
                i18n.dir() === "rtl" ? "text-right" : "text-left"
              }`}
            >
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      {/* Branch */}
      <div className="mt-6">
        <label
          className={`block text-sm text-gray-700 mb-2 ${
            i18n.dir() === "rtl" ? "text-right" : "text-left"
          }`}
        >
          {t("branch_label")}
        </label>

        <Select
          options={branches}
          value={
            branches.find(
              (option) => option.value === formData.branch
            ) || null
          }
          onChange={(selectedOption) => {
            setFormData((prev) => ({
              ...prev,
              branch: selectedOption?.value || "",
            }));

            setErrors((prev) => ({
              ...prev,
              branch: "",
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
                ? "#FFA811"
                : state.isFocused
                ? "#FFE0B2"
                : "white",
              color: state.isSelected ? "white" : "black",
            }),
          }}
        />

        {errors.branch && (
          <p
            className={`text-red-500 text-sm mt-1 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {errors.branch}
          </p>
        )}
      </div>

      {/* Message */}
      <div className="mt-6">
        <label
          className={`block text-sm text-gray-700 mb-2 ${
            i18n.dir() === "rtl" ? "text-right" : "text-left"
          }`}
        >
          {t("message_label")}
        </label>

        <textarea
          name="message"
          placeholder={t("message_placeholder")}
          value={formData.message}
          onChange={handleChange}
          rows={5}
          className={`w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-3 outline-none resize-none focus:border-teal-500 ${
            i18n.dir() === "rtl" ? "text-right" : "text-left"
          }`}
        />

        {errors.message && (
          <p
            className={`text-red-500 text-sm mt-1 ${
              i18n.dir() === "rtl" ? "text-right" : "text-left"
            }`}
          >
            {errors.message}
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