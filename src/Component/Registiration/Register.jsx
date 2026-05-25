import React from 'react'
import { IoMdArrowBack, IoMdArrowForward } from 'react-icons/io'
import { IoPersonOutline } from 'react-icons/io5'
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next'

const Register = () => {
      const { t, i18n } = useTranslation();
      const navigate = useNavigate();
      const arrowIcon = i18n.dir() === 'rtl' ? <IoMdArrowBack /> : <IoMdArrowForward />;

    return (
        <div className='py-10'>
            <h1 className='text-[48px] font-bold text-center'>{t('register_new_account')}</h1>
            <p className='text-center font-medium text-[20px] text-[#4A5565] py-2'>{t('choose_account_type')}</p>
            <div className='flex justify-center gap-5 py-5'>
                <div className=' w-1/4 border border-[#00000040] shadow-2xl p-9 rounded-xl flex flex-col gap-5 items-center justify-center text-center'>
                    <div className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] p-4 rounded-xl text-white font-bold  flex items-center justify-center'>
                        <span className='text-[40px]'>
                            <IoPersonOutline />
                        </span>
                    </div>
                    <p className='font-bold text-[24px]'>{t('member_account')}</p>
                    <p className='font-medium text-[16px] text-[#4A5565]'>{t('member_active')}</p>
                    <button onClick={() => navigate('/member-register')}
                     className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white font-semibold py-1 px-5 rounded-xl hover:bg-[#005f5a] flex gap-3'>
                        {t('continue')}
                        <span className='py-1'> {arrowIcon} </span>
                    </button>
                </div>

                <div className=' w-1/4 border border-[#00000040] shadow-2xl p-9 rounded-xl flex flex-col gap-5 items-center justify-center text-center'>
                    <div className='bg-gradient-to-r from-[#FFA811] to-[#FF683B] p-4 rounded-xl text-white font-bold  flex items-center justify-center'>
                        <span className='text-[40px]'>
                            <IoPersonOutline />
                        </span>
                    </div>
                    <p className='font-bold text-[24px]'>{t('continue_as_guest')}</p>
                    <p className='font-medium text-[16px] text-[#4A5565]'>{t('no_membership')}</p>
                    <button onClick={() => navigate('/new-guest')}
                     className='bg-gradient-to-r from-[#FFA811] to-[#FF683B] text-white font-semibold py-1 px-5 rounded-xl hover:bg-[#005f5a] flex gap-3'>
                        {t('continue')}
                        <span className='py-1 '> {arrowIcon} </span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Register
