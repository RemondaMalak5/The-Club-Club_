import React from 'react'
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom'

const Already_Have_Account = () => {
  const { t } = useTranslation();
  return (
    <div>
               <p className='text-[14px] text-[#5B626E] pt-3 flex justify-center gap-1'> {t("have_account")}  <Link to="/login" className='text-[#00786F] font-semibold underline'> {t("login")} </Link></p>

    </div>
  )
}

export default Already_Have_Account