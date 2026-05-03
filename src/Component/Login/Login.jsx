import React from 'react'
import H_one_register from '../Shared_Component/H_one_register'
import Already_Have_Account from '../Shared_Component/Already_Have_Account'
import { IoIosArrowRoundBack } from 'react-icons/io'
import { TbLogin } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate =useNavigate();
    const arr=[{label:'رقم العضوية أو البريد الإلكتروني', description:'أدخل رقم العضوية أو البريد الإلكتروني '},
    {label:'كلمة المرور', description:'أدخل كلمة المرور '},
  ]
  return (
    <div className='flex justify-center items-center py-10'>
         <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
               <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]'><TbLogin/>

         </span>
                 <H_one_register title="تسجيل دخول العضو  " />
                <p className=' text-[14px] text-[#6A7282]'>الرجاء إدخال بيانات العضوية للمتابعة
</p>
                <div className='mx-5 w-full'> 
                    {arr.map((item,index)=>(
                        <div key={index} className='flex flex-col gap-2 mt-4'>
                            <label className='font-medium text-[15px] text-[#364153] px-1'>{item.label}</label>     
                            <input type={item.label === 'كلمة المرور' ? 'password' : 'text'} placeholder={item.description} className='border p-3 my-1 rounded-lg w-full text-[14px] text-[#9A9FA8]' />
                        </div>
                    ))}
                    <button onClick={()=>navigate('/profile')} className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3'>
                        تسجيل الدخول 
                         </button>
               <p className='text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1'>  ليس لديك حساب؟   <Link to="/register" className='text-[#00786F] font-semibold underline'> سجل الآن </Link></p>
                </div>
              </div>
    </div>
  )
}

export default Login