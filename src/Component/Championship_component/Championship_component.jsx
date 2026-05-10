import React, { useEffect, useState } from 'react'
import SubTitle from '../Shared_Component/SubTitle'
import Champions from '../../Pages/Champions'
import { icon } from 'leaflet'
import { FaAward, FaMedal } from 'react-icons/fa'
import { GiTrophyCup } from 'react-icons/gi'
import Title_1 from '../Shared_Component/Title_1'
import Achievements from './Achievements'
import i18next from 'i18next'
import { Champins_State } from '../../axiosConfig/APIs/Champanship/Champins_State'
import H_one from '../Shared_Component/H_one'

const Championship_component = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const Champions = [
        {
            title: "إجمالي البطولات",
            icon: <FaAward />,
            count: data.totalTrophies

        },
        {
            title: "مراكز متقدمة",
            icon: <FaMedal />,
            count: data.totalAdvancedPositions

        },
        {
            title: "كؤوس ذهبية",
            icon: <GiTrophyCup />,
            count: data.totalGold
        },
    ]
    const Get_champinship_state = async () => {
        const params = {
            "language": i18next.language,
            "branchId":"master",
            
        }
        try {
            const response = await Champins_State (params);
            setData(response.message.data);
            console.log(response.message);
            setTotalPages(response.message.total_pages);
        }
        catch (error) {
            setError(true) ;
            console.error("Error fetching news:", error);
        }
        // finally{
        //     setLoading(false)
        // }
    }
    useEffect(() => {
        Get_champinship_state();
    }, [i18next.language]);
    return (
        <div className='xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10'>
            <div className='py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] '>
                <H_one text={"البطولات والإنجازات"} />
                <SubTitle SubTitle={"سجل حافل بالإنجازات الرياضية والبطولات المحلية والدولية"} />
                <div className='flex flex-wrap gap-5 mt-2'>
                    {Champions.map((champion, index) => (
                        <div key={index} className='flex flex-col xl:w-1/4 w-full md:w-1/2 bg-white border  gap-1 px-6 py-3 rounded-2xl shadow-md'>
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

