import React from 'react'
import { IoIosArrowRoundBack, IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';

const Confirm_data = () => {
     const navigate = useNavigate();
    return (
        <div className='py-10 flex justify-center '>
            <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
                <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]'><IoMdCheckmarkCircleOutline />
                </span>
                <h1 className='text-[33px] font-bold text-center'> تأكيد البيانات </h1>
                <p className='font-semibold text-[16px] text-[#5B626E]'> هل هذه بياناتك الصحيحة؟ </p>
                <div className='bg-[#EBF1F166] w-full p- rounded-xl flex flex-col gap-3'>
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'> الاسم   : احمد محمد</p>
                    <hr className='w-[95%]' />
                    <p className='font-medium text-[15px] text-[#364153] px-1 py-3'>    رقم الهاتف : 01272912352 </p>

                </div>
                <div className='flex justify-center w-full gap-5'>
         <button onClick={() => navigate('/send-otp')} className='w-1/2  bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-bold py-3 px-5 rounded-xl hover:bg-[#005f5a]  mt-5 flex justify-center gap-3'>
                    التالى
                    <span className='py-1'> <IoIosArrowRoundBack /> </span>
                </button>

                  <button onClick={() => navigate('/')} className='w-1/2 bg-[#EBF1F1] text-[#364153] font-bold py-3 px-5 rounded-xl   mt-5 flex justify-center gap-3'>
            تعديل


                </button>
                </div>
              
                <p className='text-[14px] text-[#5B626E] pt-9 flex justify-center gap-1'> لديك حساب بالفعل؟ <a href="#" className='text-[#00786F] font-semibold underline'>تسجيل الدخول</a></p>

            </div>
        </div>
    )
}

export default Confirm_data
