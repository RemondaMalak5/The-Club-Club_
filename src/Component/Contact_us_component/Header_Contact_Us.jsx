import React from 'react'
import Title_1 from '../Shared_Component/Title_1';
import SubTitle from '../Shared_Component/SubTitle';
import H_1 from '../Shared_Component/H_1';
import { IoFlashOutline } from 'react-icons/io5';
import { LuPhoneCall } from 'react-icons/lu';
import { TbUserStar } from 'react-icons/tb';

const Header_Contact_Us = () => {
  const contact = [
    { title: "استجابة سريعة", icon:<IoFlashOutline/>},
   { title: "دعم مستمر", icon:<LuPhoneCall/>},
    { title: "فريق متخصص", icon:<TbUserStar/>
}

    ]
  return (
       <div>
      <div className="py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] ">
        <H_1 text={"تواصل معنا"} />
        <SubTitle SubTitle={"نسعد بتواصلك معنا للإجابة على استفساراتك ومساعدتك في الحصول على أفضل الخدمات الرياضية"} />
        <div className="flex flex-wrap gap-5 mt-2">
          {contact.map((item, index) => (
            <div
              key={index}
              className="flex flex-col xl:w-1/4 w-full md:w-1/2 bg-white border  gap-1 px-6 py-3 rounded-2xl shadow-md"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-[#E7F4F1] text-[#364153] p-4 rounded-lg text-[25px]">
                  {item.icon}
                </div>
                <div>
                  <span className="text-[#4A5565]">{item.title}</span>
                  <Title_1 title={item.value} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  )
}

export default Header_Contact_Us
