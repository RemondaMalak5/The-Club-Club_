// import React, { useEffect, useState } from 'react'
// import H_one_register from '../Shared_Component/H_one_register'
// import Already_Have_Account from '../Shared_Component/Already_Have_Account'
// import { IoIosArrowRoundBack } from 'react-icons/io'
// import { TbLogin } from 'react-icons/tb'
// import { Link } from 'react-router-dom'
// import { useNavigate } from 'react-router-dom';
// import { LoginApi } from '../../axiosConfig/APIs/Auth/Login'

// const Login = () => {
//   const navigate =useNavigate();
// const [formData, setFormData] = useState({
//   email: "",
//   password: "",
//   branch: "",
// });

// const arr=[{label:'رقم العضوية أو البريد الإلكتروني', description:'أدخل رقم العضوية أو البريد الإلكتروني '},
//     {label:'كلمة المرور', description:'أدخل كلمة المرور '},
//   ]

// const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value,
//   });
// };

//   const handleLogin = async () => {
//   try {
//     const body = {
//       email: email,
//       password: password,
//       branch:""
//     };

//     const response = await LoginApi (body);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// };

//   return (
//     <div className='flex justify-center items-center py-10'>
//          <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>
//                <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]'><TbLogin/>

//          </span>
//                  <H_one_register title="تسجيل دخول العضو  " />
//                 <p className=' text-[14px] text-[#6A7282]'>الرجاء إدخال بيانات العضوية للمتابعة
// </p>
//                 <div className='mx-5 w-full'> 
//                     {arr.map((item,index)=>(
//                         <div key={index} className='flex flex-col gap-2 mt-4'>
//                             <label className='font-medium text-[15px] text-[#364153] px-1'>{item.label}</label>     
//                             <input type={item.label === 'كلمة المرور' ? 'password' : 'text'} placeholder={item.description} className='border p-3 my-1 rounded-lg w-full text-[14px] text-[#9A9FA8]' />
//                         </div>
//                     ))}
//                     <button onClick={()=>navigate('/profile')} className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3'>
//                         تسجيل الدخول 
//                          </button>
//                <p className='text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1'>  ليس لديك حساب؟   <Link to="/register" className='text-[#00786F] font-semibold underline'> سجل الآن </Link></p>
//                 </div>
//               </div>
//     </div>
//   )
// }

// export default Login

import React, { useState } from 'react'
import H_one_register from '../Shared_Component/H_one_register'
import { TbLogin } from 'react-icons/tb'
import { Link, useNavigate } from 'react-router-dom'
import { LoginApi } from '../../axiosConfig/APIs/Auth/Login'

const Login = () => {
  const navigate = useNavigate();
const [errors ,setErrors]= useState({});
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    branch: '',
  });

  const arr = [
    {
      name: 'username',
      label: '  اسم المستخدم',
      description: 'أدخل اسم المستخدم  ',
    },
    {
      name: 'password',
      label: 'كلمة المرور',
      description: 'أدخل كلمة المرور',
    },
  ];
const validate = () => {
  let newErrors = {};

  // username
  if (!formData.username.trim()) {
    newErrors.username = 'الرجاء إدخال البريد الإلكتروني أو رقم العضوية';
  }

  // password
  if (!formData.password.trim()) {
    newErrors.password = 'الرجاء إدخال كلمة المرور';
  } else if (formData.password.length < 6) {
    newErrors.password = 'كلمة المرور يجب أن تكون 6 أحرف على الأقل';
  }

  // branch
  if (!formData.branch.trim()) {
    newErrors.branch = 'الرجاء إدخال الفرع';
  }

  setErrors(newErrors);

  return Object.keys(newErrors).length === 0;
};

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
     const isValid = validate();

  if (!isValid) return;
    try {
      const response = await LoginApi(formData);

      console.log(response);

      // بعد نجاح اللوجين
      navigate('/profile');

    } catch (error) {
console.log(error.response.data);    }
  };

  return (
    <div className='flex justify-center items-center py-10'>

      <div className='border p-7 w-[50%] flex flex-col gap-3 items-center justify-center rounded-xl shadow-2xl'>

        <span className='bg-gradient-to-br from-[#08AC85DB] to-[#00786F] text-white p-4 rounded-full text-[30px]'>
          <TbLogin />
        </span>

        <H_one_register title="تسجيل دخول العضو" />

        <p className='text-[14px] text-[#6A7282]'>
          الرجاء إدخال بيانات العضوية للمتابعة
        </p>

        <div className='mx-5 w-full'>

          {arr.map((item, index) => (
            <div key={index} className='flex flex-col gap-2 mt-4'>

              <label className='font-medium text-[15px] text-[#364153] px-1'>
                {item.label}
              </label>

              <input
                name={item.name}
                type={item.name === 'password' ? 'password' : 'text'}
                placeholder={item.description}
                value={formData[item.name]}
                onChange={handleChange}
                className='border p-3 my-1 rounded-lg w-full text-[14px] text-[#9A9FA8]'
              />
              {errors[item.name] && (
  <p className="text-red-500 text-sm">
    {errors[item.name]}
  </p>
)}

            </div>
          ))}

          {/* branch */}
          <div className='flex flex-col gap-2 mt-4'>
            <label className='font-medium text-[15px] text-[#364153] px-1'>
              الفرع
            </label>

            <input
              type='text'
              name='branch'
              placeholder='أدخل الفرع'
              value={formData.branch}
              onChange={handleChange}
              className='border p-3 my-1 rounded-lg w-full text-[14px] text-[#9A9FA8]'
            />
            {errors.branch && (
  <p className="text-red-500 text-sm">
    {errors.branch}
  </p>
)}
          </div>

          <button
            onClick={handleLogin}
            className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-3 px-5 rounded-xl hover:bg-[#005f5a] w-full mt-5 flex justify-center gap-3'
          >
            تسجيل الدخول
          </button>

          <p className='text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1'>
            ليس لديك حساب؟
            <Link
              to="/register"
              className='text-[#00786F] font-semibold underline'
            >
              سجل الآن
            </Link>
          </p>

        </div>
      </div>
    </div>
  )
}

export default Login