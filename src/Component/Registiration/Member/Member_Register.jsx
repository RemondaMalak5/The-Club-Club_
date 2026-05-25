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

const Member_Register = () => {
    const navigate = useNavigate();
    const { saveToken } = useContext(UserTokenContext);
    const [formData, setFormData] = useState({
      branch: '',
      full_name: '',
      national_id: '',
      phone: '',
      card_number: '',
      email:"",
      language: i18next.language,
    });
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const fields = [
      {
        label: 'رقم العضوية',
        name: 'card_number',
        placeholder: 'أدخل رقم العضوية ',
      },
     
      {
        label: 'الاسم بالكامل',
        name: 'full_name',
        placeholder: 'أدخل الاسم بالكامل ',
      },
      {
        label: 'رقم الهاتف   ',
        name: 'phone',
        placeholder: '01272934530 ',
      },
      {
        label: 'الرقم القومي',
        name: 'national_id',
        placeholder: '29901011234568 ',
      },
       {
        label: 'البريد الالكترونى ',
        name: 'email',
        placeholder: '29901011234568 ',
      },
       {
        label: 'الفرع',
        name: 'branch',
        placeholder: 'أدخل اسم الفرع ',
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
      console.log("responseresponseresponseresponseresponse", response)
    } catch (error) {
      console.log(error?.response?.data);
    }
  };
    const handleSubmit = async () => {
      const newErrors = {};
      if (!formData.card_number.trim()) newErrors.card_number = 'رقم العضوية مطلوب';
      if (!formData.phone.trim()) newErrors.phone = 'رقم الهاتف أو الرقم القومي مطلوب';
      if (!formData.national_id.trim()) newErrors.national_id = 'الرقم القومي مطلوب';
      if (!formData.full_name.trim()) newErrors.full_name = 'الاسم بالكامل مطلوب';
      if (!formData.branch.trim()) newErrors.branch = 'الفرع مطلوب';

      setErrors(newErrors);
      if (Object.keys(newErrors).length) return;

      try {
        setLoading(true);
        const response = await Step_1_validation(formData);
        console.log(response)
        const receivedToken = response?.message?.registration_token;
                console.log()

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
      <Stepper_green currentStep={1} totalSteps={4} title="تسجيل عضو " />
      <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
       <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]'><IoMdPerson/>
 </span>
         <H_one_register title="تسجيل عضو  " />
        <p className=' text-[16px] text-[#5B626E]'>الرجاء إدخال بيانات العضوية للمتابعة</p>
        <div className='mx-5 w-full'> 
          {fields.map((field) => (
            <div key={field.name} className='mb-3'>
              <label className='font-medium text-[15px] text-[#364153] px-1'>
                {field.label}
              </label>
              <input
                type='text'
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                placeholder={field.placeholder}
                className='border p-3 my-2 rounded-lg w-full text-[14px] text-[#5B626E]'
              />
              {errors[field.name] && (
                <p className='text-red-500 text-sm'>
                  {errors[field.name]}
                </p>
              )}
            </div>
          ))}

          {errors.general && <p className='text-red-500 text-sm text-center'>{errors.general}</p>}

            <button
              onClick={handleSubmit}
              disabled={loading}
              className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3 disabled:opacity-50'
            >
              {loading ? 'جارٍ المعالجة...' : 'التالى'}
              <span className='py-1'> <IoIosArrowRoundBack/> </span>
            </button>
            <Already_Have_Account/>
        </div>
      </div>
    </div>
  
  )
}

export default Member_Register
