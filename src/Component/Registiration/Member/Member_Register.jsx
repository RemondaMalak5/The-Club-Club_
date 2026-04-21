import React from 'react'
import { IoIosArrowRoundBack, IoMdPerson } from 'react-icons/io'
import { useNavigate } from 'react-router-dom';
import Stepper_green from '../../Shared_Component/Stepper_green';
import H_one_register from '../../Shared_Component/H_one_register';
import Already_Have_Account from '../../Shared_Component/Already_Have_Account';

const Member_Register = () => {
    const navigate = useNavigate();
  return (
       <div className='py-10  flex flex-col items-center justify-center'>
      <Stepper_green currentStep={1} totalSteps={4} title="تسجيل عضو " />
      <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
       <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-5 rounded-full text-[30px]'><IoMdPerson/>
 </span>
         <H_one_register title="تسجيل عضو  " />
        <p className=' text-[16px] text-[#5B626E]'>الرجاء إدخال بيانات العضوية للمتابعة</p>
        <div className='mx-5 w-full'> 
            <label className='font-medium text-[15px] text-[#364153] px-1'>رقم العضوية</label>
            <input type="text" placeholder='أدخل رقم العضوية ' className='border p-3 my-2 rounded-lg w-full text-[14px] text-[#5B626E]' />
              <label className='font-medium text-[15px] text-[#364153] px-1'> رقم الهاتف او الرقم القومى</label>
            <input type="text" placeholder='01272934530 ' className='border p-3 my-2  rounded-lg w-full text-[14px] text-[#5B626E]' />
            <button onClick={()=>navigate('/confirm-data')} className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3'>
                 التالى 
                 <span className='py-1'> <IoIosArrowRoundBack/> </span>
                 </button>
<Already_Have_Account/>
        </div>
      </div>
    </div>
  
  )
}

export default Member_Register
