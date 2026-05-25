import React from 'react'
import { IoIosArrowRoundBack, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useNavigate, useLocation } from 'react-router-dom';
import Already_Have_Account from '../../Shared_Component/Already_Have_Account';
import H_one_register from './../../Shared_Component/H_one_register';
import Stepper_green from './../../Shared_Component/Stepper_green';

const Confirm_data = () => {
     const navigate = useNavigate();
     const location = useLocation();
     const formData = location.state?.formData || {};

    return (
        <div className='py-4 flex flex-col items-center justify-center '>
            <Stepper_green currentStep={2} title={"التحقق من البيانات"}/>
            <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
                <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]'><IoMdCheckmarkCircleOutline />
                </span>
<H_one_register title="تأكيد البيانات" />
                <p className='font-semibold text-[16px] text-[#5B626E]'> هل هذه بياناتك الصحيحة؟ </p>
                <div className='bg-[#EBF1F166] w-full p- rounded-xl flex flex-col gap-3'>
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> الاسم   : {formData.full_name || '-'}</p>
                    <hr className='w-[95%]' />
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> رقم الهاتف : {formData.phone || '-'}</p>
                    <hr className='w-[95%]' />
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> الرقم القومي : {formData.national_id || '-'}</p>
                    <hr className='w-[95%]' />
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> رقم العضوية : {formData.card_number || '-'}</p>
                    <hr className='w-[95%]' />
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> الفرع : {formData.branch || '-'}</p>
                </div>
                <div className='flex justify-center w-full gap-5'>
         <button onClick={() => navigate('/send-otp', { state: { formData } })} className='w-1/2  bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-bold py-3 px-5 rounded-xl hover:bg-[#005f5a]  mt-5 flex justify-center gap-3'>
                    التالى
                    <span className='py-1'> <IoIosArrowRoundBack /> </span>
                </button>

                  <button onClick={() => navigate('/member-register')} className='w-1/2 bg-[#EBF1F1] text-[#364153] font-bold py-3 px-5 rounded-xl   mt-5 flex justify-center gap-3'>
            تعديل


                </button>
                </div>
              
<Already_Have_Account/>
            </div>
        </div>
    )
}

export default Confirm_data
