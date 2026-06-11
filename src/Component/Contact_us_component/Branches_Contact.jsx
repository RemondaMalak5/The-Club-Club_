import React from 'react'
import { FaPhone } from 'react-icons/fa';
import { FaLocationDot } from 'react-icons/fa6';
import { LuClock } from 'react-icons/lu';
import { useTranslation } from 'react-i18next'

const Branches_Contact = () => {
  const { t } = useTranslation()

  const Branches = [
    {
      name: t('new_capital'),
      address: t('branch_address'),
      phone: "+20123456789",
    },
    {
      name: t('sheraton_airport'),
      address: t('branch_address'),
      phone: "+20123456789",
    },
    {
      name: t('october_6'),
      address: t('branch_address'),
      phone: "+20123456789",
    },
  ];
  
  const timeWork = [
    { day: t('friday'), hours: "7:00 ص - 12:00 م" },
    { day: t('saturday'), hours: "6:00 ص - 12:00 م" },
    { day: t('sunday_to_thursday'), hours: "6:00 ص - 11:00 م" },
  ];

  return (
    <div className="w-full flex flex-wrap justify-center gap-6 mt-10  ">
        {Branches.map((branch, index) => (
          <div
            key={index}
            className=" bg-white rounded-2xl shadow-md p-5 w-sm w-full relative hover:scale-105 transition border border-[#E5E7EB]"
          >
            <span className="absolute left-4 top-4 bg-gray-100 text-gray-700 px-4 py-1 rounded-full text-sm">
              {t('open')}
            </span>

            <h2 className="text-xl font-bold text-gray-700 text-right mb-4">
              {branch.name}
            </h2>

            <div className="flex items-start gap-2 mb-3 text-gray-600">
              <FaLocationDot className="mt-1 " />
              <div className="text-right">
                <p className="font-semibold">{t('address')}</p>
                <p className="text-sm">{branch.address}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-3 text-gray-600">
              <FaPhone className="" />
              <div className="text-right">
                <p className="font-semibold">{t('phone')}</p>
                <a
                  href={`tel:${branch.phone}`}
                  className="text-green-600 text-sm"
                >
                  {branch.phone}
                </a>
              </div>
            </div>

            <div className="flex items-start gap-2 mb-5 text-gray-600">
              <LuClock className="mt-1 " />
              <div className="text-right text-sm">
                <p className="font-semibold mb-1">{t('working_hours')}</p>
                {timeWork.map((time, idx) => (
                  <p key={idx}>
                    {time.day}: {time.hours}
                  </p>
                ))}
              </div>
            </div>

            <button className="w-full bg-gradient-to-r from-[#08AC85] to-[#00786F] text-white py-3 rounded-xl font-semibold hover:opacity-90 transition">
              {t('visit_branch')}
            </button>
          </div>
        ))}
      </div>
  )
}

export default Branches_Contact