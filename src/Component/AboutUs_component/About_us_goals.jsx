import React from 'react'
import Title_1 from '../Shared_Component/Title_1'
import i18n from './../../i18n/i18n';
import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

const About_us_goals = ({ data }) => {
const { t } = useTranslation();
  return (
    <div className='bg-[#E9F0F0] px-4 sm:px-6 lg:px-10 py-8 overflow-hidden'>
      <div className='w-full flex flex-wrap items-center gap-y-10'>

        <div className='xl:w-2/3 w-full '>
          <Title_1 title={t("our_goals")} />

          <div className='mt-5'>
            {data?.goals?.description}
            {/* {data?.goals?.map((e, index) => (
              <div key={index} className='flex items-start gap-2 mb-2'>
                <span className='text-black leading-7'>•</span>
                <p className='text-sm sm:text-base leading-7 text-gray-800'>
                  {e.goal}
                </p>
              </div>
            ))} */}
          </div>
        </div>

      <div className="xl:w-1/3 w-full flex justify-center xl:justify-start pb-7 ">
  <div className="relative w-[150px] sm:w-[180px] h-[200px] sm:h-[230px] ">
    
    <div
      className={`absolute top-0 ${
        i18next.language === "ar"
          ? "right-16 sm:rigth-8"
          : "left-16 sm:left-8"
      } w-full h-full rounded-3xl overflow-hidden shadow-xl`}
    >
      <div className="absolute inset-0 bg-[#277C79]"></div>
    </div>

    <div
      className={`absolute top-8 sm:top-10 ${
        i18next.language === "ar"
          ? "right-36"
          : "left-36"
      } w-full h-full rounded-3xl overflow-hidden shadow-xl bg-white`}
    >
      <img
        src={data?.goals?.image}
        alt="football"
        className="w-full h-full object-cover"
        loading="lazy"
      />
    </div>
  </div>
</div>

      </div>
    </div>
  )
}

export default About_us_goals