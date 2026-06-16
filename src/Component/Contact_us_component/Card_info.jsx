import React from 'react'
import { LuMail, LuPhone } from 'react-icons/lu'
import { FaWhatsapp } from 'react-icons/fa'
import { IoChevronBack, IoChevronForwardOutline } from 'react-icons/io5'
import { useTranslation } from 'react-i18next'
import Social_Media from '../Shared_Component/Social_Media'
import i18next from 'i18next'

const Card_info = () => {
  const { t } = useTranslation()

  const contactData = [
  {
    title: t("phone"),
    value: "16647",
    icon: <LuPhone />,
    link: "tel:16647",
  },
  {
    title: t("whatsapp"),
    value: "201234567890+",
    icon: <FaWhatsapp />,
    link: "https://wa.me/201234567890",
  },
  {
  title: t("email"),
  value: "info@theclub.com.eg",
  icon: <LuMail />,
  link: "https://mail.google.com/mail/?view=cm&fs=1&to=info@theclub.com.eg",
}
];

  return (
    <div
      className="xl:w-1/4 w-full rounded-2xl px-4 py-8 md:px-6
      bg-gradient-to-b from-[#2CC7A6] to-[#006B68] text-white
      flex flex-col justify-between gap-6"
    >
      <div className="text-center flex flex-col gap-2">
        <h2 className="text-2xl font-bold">{t('contact_information')}</h2>
        <p className="text-sm text-white/80">
          {t('contact_description')}
        </p>
      </div>

      <div className="flex flex-col gap-3">
       {contactData.map((item, index) => (
  <a
    key={index}
    href={item.link}
    target={item.title === t("whatsapp") ? "_blank" : "_self"}
    rel="noreferrer"
    className="bg-white/10 rounded-lg px-4 py-3 flex items-center justify-between hover:bg-white/20 transition"
  >
    <div className="text-white/90 text-xl bg-white/10 rounded-md p-2">
      {item.icon}
    </div>

    <div className="flex flex-col flex-1 px-3">
      <p className="text-sm text-white/90">{item.title}</p>
      <p className="text-sm text-white font-medium">{item.value}</p>
    </div>

    <div className="text-white/90 text-lg">
    {i18next.language==="ar"?    <IoChevronBack /> : <IoChevronForwardOutline/>}
    </div>
  </a>
))}
      </div>

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">{t('follow_us')}</p>
        <Social_Media />
      </div>
    </div>
  )
}

export default Card_info

