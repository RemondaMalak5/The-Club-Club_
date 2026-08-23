import React, { useContext, useState } from 'react'
import { IoIosArrowRoundBack, IoMdPerson } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import Stepper_green from '../../Shared_Component/Stepper_green';
import H_one_register from '../../Shared_Component/H_one_register';
import Already_Have_Account from '../../Shared_Component/Already_Have_Account';
import { Step_1_validation } from '../../../axiosConfig/APIs/Auth/Register/Step_1_Validate_Input';
import { UserTokenContext } from '../../../context/UserContext';
import i18next from 'i18next';
import { Send_OTP } from '../../../axiosConfig/APIs/Auth/Register/Send_OTP';
import Select from "react-select";
import { useTranslation } from 'react-i18next';
import { IoIosArrowRoundForward } from "react-icons/io";
import { useBranch } from '../../../context/BranchContext';

const Member_Register = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { saveToken } = useContext(UserTokenContext);
  const [currentStep, setCurrentStep] = useState(1);
  const { branches } = useBranch();
  const [formData, setFormData] = useState({
    branch: '',
    full_name: '',
    national_id: '',
    phone: '',
    card_number: '',
    email: "",
    is_dependant: 0,

    language: i18next.language,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const branchOptions =
    branches?.map((branch) => ({
      value: branch.id,
      label: branch.name,
    }));

  const fields = [
    {
      label: t("card_number_label"),
      name: 'card_number',
      placeholder: t("card_number_placeholder"),
    },

    {
      label: t("full_name_label"),
      name: 'full_name',
      placeholder: t("full_name_placeholder"),
    },
    {
      label: t("phone_label"),
      name: 'phone',
      placeholder: '01200000000',
    },
    {
      label: t("national_id_label"),
      name: 'national_id',
      placeholder: '00000000000000',
    },
    {
      label: t("email_label"),
      name: 'email',
      placeholder: t("email_placeholder"),
    },

  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const parseApiError = (error) => {
    if (!error) return 'حدث خطأ غير متوقع';
    if (typeof error === 'string') return error;
    if (typeof error === 'object') {
      if (error.message) return error.message;
      if (error.error) return typeof error.error === 'string' ? error.error : JSON.stringify(error.error);
      if (error.status_code) return `${error.status_code} - ${error.code || ''}`.trim();
      return JSON.stringify(error);
    }
    return String(error);
  };
  const handleVerify = async (receivedToken) => {
    try {
      const body = {
        registration_token: receivedToken,
        language: i18next.language,
      };

      const response = await Send_OTP(body);
    } catch (error) {
    }
  };
  const handleSubmit = async () => {
    const newErrors = {};
    if (!formData.card_number.trim()) newErrors.card_number = t("MemberShip_is_required");
    if (!formData.phone.trim()) newErrors.phone = t("phone_required");
    if (!formData.national_id.trim()) newErrors.national_id = t("national_id_required");
    if (!formData.full_name.trim()) newErrors.full_name = t("full_name_required");
    if (!formData.branch.trim()) newErrors.branch = t("branch_required");

    setErrors(newErrors);
    if (Object.keys(newErrors).length) return;

    try {
      setLoading(true);
      const response = await Step_1_validation(formData);
      const receivedToken = response?.message?.registration_token;

      if (receivedToken) {
        saveToken(receivedToken);
        handleVerify(receivedToken);
      }
      navigate('/confirm-data', { state: { formData } });
    } catch (error) {
      const apiError =
        error?.response?.data?.error ||
        error?.response?.data?.message ||
        error.message ||
        error;
      setErrors({ general: parseApiError(apiError) });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='py-10  flex flex-col items-center justify-center'>
      <Stepper_green currentStep={currentStep} totalSteps={4} title={t("Member_Registration")} onStepClick={(step) => setCurrentStep(step)} />

      <div className='border p-7 w-[55%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
        <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]'><IoMdPerson />
        </span>
        <H_one_register title={t("Member_Registration")} />
        <p className=' text-[16px] text-[#5B626E]'> {t("member_registration_instructions")}</p>


        <div className=' w-full flex flex-wrap '>
          {fields.map((field) => (
            <div
              key={field.name}
              className="mb-3 md:w-1/2 w-full px-2"
            >
              <label className="font-medium text-[15px] text-[#364153] px-1">
                {field.label}
              </label>

              <input
                type="text"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className="border p-3 my-2 rounded-lg w-full text-[14px] text-[#5B626E]"
              />


              {errors[field.name] && (
                <p className="text-red-500 text-sm">
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}
          
          <div className='mb-3 w-1/2 px-2  '>
            <label className='font-medium text-[15px] text-[#364153] px-1 block mb-2'>
              {t("branch_label")}
            </label>

            <Select
              placeholder={t("select_branch")}
              options={branchOptions}

              value={
                formData.branch
                  ? {
                    value: formData.branch,
                    label: formData.branch,
                  }
                  : null
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
            />

            {errors.branch && (
              <p className='text-red-500 text-sm mt-1'>
                {errors.branch}
              </p>
            )}
          </div>

<div className="flex items-center gap-2 px-3">
    <input
      type="checkbox"
      checked={formData.is_dependant === 1}
      onChange={(e) => {
        setFormData((prev) => ({
          ...prev,
          is_dependant: e.target.checked ? 1 : 0,
        }));
      }}
    />

    <label className="text-md text-[#5B626E]">
{     t("dependent_member")  
}    </label>
  </div>
          {errors.general && <p className='text-red-500 text-sm text-center'>{errors.general}</p>}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-3 flex justify-center gap-3 disabled:opacity-50'
          >
            {loading ? 'جارٍ المعالجة...' : t("next")}
            <span className='py-1'> {i18next.language === "ar" ? <IoIosArrowRoundBack /> : <IoIosArrowRoundForward />} </span>
          </button>

        </div>
        <Already_Have_Account />

      </div>
    </div>

  )
}

export default Member_Register
