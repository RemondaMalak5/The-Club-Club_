// import React from 'react'
// import { LuMail, LuPhone } from 'react-icons/lu'
// import SocialMedia from '../Shared_Component/SocialMedia'
// import { FaFacebookF, FaInstagram, FaWhatsapp } from 'react-icons/fa'
// import { FaXTwitter } from 'react-icons/fa6'


// const Form_Contact_us = () => {
//   return (
   
//   )
// }

// export default Form_Contact_us

import { useState } from "react";

const Form_Contact_us = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    branch: "",
    message: "",
  });

  const [errors, setErrors] = useState({});

  const branches = [
    "فرع القاهرة",
    "فرع الإسكندرية",
    "فرع الجيزة",
    "فرع المنصورة",
  ];

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
      newErrors.fullName = "الاسم بالكامل مطلوب";
    }

    if (!formData.email.trim()) {
      newErrors.email = "البريد الإلكتروني مطلوب";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "رقم الهاتف مطلوب";
    }

    if (!formData.branch.trim()) {
      newErrors.branch = "يرجى اختيار الفرع";
    }

    if (!formData.message.trim()) {
      newErrors.message = "الرسالة مطلوبة";
    }

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    console.log("Form Data:", formData);

    alert("تم إرسال الرسالة بنجاح");

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
        <div>
          <label className="block text-sm text-gray-700 mb-2 text-right">
            الاسم بالكامل
          </label>
          <input
            type="text"
            name="fullName"
            placeholder="ادخل اسمك بالكامل"
            value={formData.fullName}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-right outline-none focus:border-teal-500"
          />
          {errors.fullName && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {errors.fullName}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2 text-right">
            البريد الإلكتروني
          </label>
          <input
            type="email"
            name="email"
            placeholder="example@email.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-right outline-none focus:border-teal-500"
          />
          {errors.email && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {errors.email}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2 text-right">
            الفرع
          </label>
          <select
            name="branch"
            value={formData.branch}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-1 text-right outline-none focus:border-teal-500"
          >
            <option value="">اختر الفرع</option>
            {branches.map((branch, index) => (
              <option key={index} value={branch}>
                {branch}
              </option>
            ))}
          </select>
          {errors.branch && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {errors.branch}
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm text-gray-700 mb-2 text-right">
            رقم الهاتف
          </label>
          <input
            type="text"
            name="phone"
            placeholder="ادخل رقم الهاتف"
            value={formData.phone}
            onChange={handleChange}
            className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-right outline-none focus:border-teal-500"
          />
          {errors.phone && (
            <p className="text-red-500 text-sm mt-1 text-right">
              {errors.phone}
            </p>
          )}
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-sm text-gray-700 mb-2 text-right">
          الرسالة
        </label>
        <textarea
          name="message"
          placeholder="اكتب رسالتك هنا..."
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full rounded-xl border border-gray-300 bg-gray-50 px-4 py-1 text-right outline-none resize-none focus:border-teal-500"
        />
        {errors.message && (
          <p className="text-red-500 text-sm mt-1 text-right">
            {errors.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        className="mt-4 w-full rounded-xl bg-gradient-to-r from-teal-400 to-teal-700 py-3 text-white font-bold text-[18px] shadow-md transition hover:opacity-90"
      >
        إرسال الرسالة
      </button>
    </form>
  );
};

export default Form_Contact_us;