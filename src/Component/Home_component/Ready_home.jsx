import React from 'react'
import { useTranslation } from 'react-i18next'
import { IoChatboxEllipsesOutline } from 'react-icons/io5'
import { MdOutlinePersonAddAlt1 } from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

const Ready_home = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className='px-12 '>
      <div className="w-full bg-gray-100 rounded-xl p-6 flex flex-wrap items-center justify-between ">
        <div >
          <h2 className="text-[36px] font-bold text-gray-900">{t('ready_to_start')}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {t('ready_subtitle')}
          </p>
        </div>

        <div className="flex gap-3 py-5">
          <button onClick={() => navigate('/register')} 
           className="bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white px-5 py-2 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition">
            <MdOutlinePersonAddAlt1 />
            <span>{t('subscribe_now')}</span>

          </button>
          <button onClick={() => navigate('/contact')} className="flex items-center gap-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-full hover:bg-gray-50 transition">
            <IoChatboxEllipsesOutline />
            <span>{t('contact_us_btn')}</span>
          </button>
        </div>

      </div>
    </div>

  )
}

export default Ready_home
