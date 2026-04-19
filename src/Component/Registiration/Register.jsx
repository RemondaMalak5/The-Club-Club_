import React from 'react'
import { IoMdArrowBack } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';

const Register = () => {
      const navigate = useNavigate();

    return (
        <div className='py-10'>
            <h1 className='text-[48px] font-bold text-center'>انشاء حساب جديد</h1>
            <p className='text-center font-medium text-[20px] text-[#4A5565] py-2'>اختر نوع الحساب المناسب لك</p>
            <div className='flex justify-center gap-5 py-5'>
                <div className=' w-1/4 border border-[#00000040] shadow-2xl p-9 rounded-xl flex flex-col gap-5 items-center justify-center text-center'>
                    <div className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-4 rounded-xl text-white font-bold  flex items-center justify-center'>
                        <span className='text-[40px]'>
                            <IoPersonOutline />
                        </span>
                    </div>
                    <p className='font-bold text-[24px]'>انا عضو</p>
                    <p className='font-medium text-[16px] text-[#4A5565]'>لديك رقم عضوية نشط في النادي</p>
                    <button onClick={() => navigate('/member-register')}
                     className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-1 px-5 rounded-xl hover:bg-[#005f5a] flex gap-3'>
                        متابعه
                        <span className='py-1'> <IoMdArrowBack /> </span>
                    </button>
                </div>

                <div className=' w-1/4 border border-[#00000040] shadow-2xl p-9 rounded-xl flex flex-col gap-5 items-center justify-center text-center'>
                    <div className='bg-gradient-to-r from-[#FFA811] to-[#FF683B] p-4 rounded-xl text-white font-bold  flex items-center justify-center'>
                        <span className='text-[40px]'>
                            <IoPersonOutline />
                        </span>
                    </div>
                    <p className='font-bold text-[24px]'> متابعه كضيف  </p>
                    <p className='font-medium text-[16px] text-[#4A5565]'>ليس لديك عضوية حالياً</p>
                    <button className='bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white font-semibold py-1 px-5 rounded-xl hover:bg-[#005f5a] flex gap-3'>
                        متابعه
                        <span className='py-1 '> <IoMdArrowBack /> </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
