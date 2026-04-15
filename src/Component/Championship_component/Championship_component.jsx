import React from 'react'
import H_1 from '../Shared_component/H_1'
import SubTitle from '../Shared_Component/SubTitle'
import Champions from '../../Pages/Champions'
import { icon } from 'leaflet'
import { FaAward, FaMedal } from 'react-icons/fa'
import { GiTrophyCup } from 'react-icons/gi'
import Title_1 from '../Shared_Component/Title_1'
import Achievements from './Achievements'

const Championship_component = () => {
    const Champions = [
        {
            title: "إجمالي البطولات",
            icon: <FaAward />,
            count: 9

        },
        {
            title: "مراكز متقدمة",
            icon: <FaMedal />,
            count: 7

        },
        {
            title: "كؤوس ذهبية",
            icon: <GiTrophyCup />,
            count: 13
        },
    ]
    return (
        <div className='py-10 px-20'>
            <div className='py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] '>
                <H_1 text={"البطولات والإنجازات"} />
                <SubTitle SubTitle={"سجل حافل بالإنجازات الرياضية والبطولات المحلية والدولية"} />
                <div className='flex gap-5 mt-2'>
                    {Champions.map((champion, index) => (
                        <div key={index} className='flex flex-col w-1/3 bg-white border  gap-2   px-7 py-5 rounded-2xl shadow-md'>
                            <div className='flex gap-2 items-center'>
                                <span className=' text-[#F0B100] text-[20px]'>{champion.icon}</span>
                                <span className='text-[#4A5565]'>{champion.title}</span>
                            </div>
                            <Title_1 title={champion.count} />
                        </div>
                    ))}
                </div>
            </div>
            <div className='py-10'>
                  <Achievements/>
     
            </div>

        </div>
    )
}

export default Championship_component

