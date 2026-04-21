import React from 'react'
import { Link } from 'react-router-dom'

const Already_Have_Account = () => {
  return (
    <div>
               <p className='text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1'> لديك حساب بالفعل؟   <Link to="/login" className='text-[#00786F] font-semibold underline'>تسجيل الدخول</Link></p>

    </div>
  )
}

export default Already_Have_Account