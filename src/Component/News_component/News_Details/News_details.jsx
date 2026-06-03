import React, { useEffect, useState } from 'react'
import { NewsDetails } from '../../../axiosConfig/APIs/News/News_details';
import { useLocation, useParams } from 'react-router-dom';
import i18next from 'i18next';
import More_News from './More_News';
import { icon } from 'leaflet';
import { MdOutlineDateRange } from "react-icons/md";
import { IoIosTimer } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import Social_Media from '../../Shared_component/Social_Media';


const News_details = () => {
    const [data, setData] = useState({});
    const { id } = useParams();
    const location = useLocation();
    const branchId = location.state?.branchId;

    const Get_News_Details = async () => {
        const params = {
            "language": i18next.language,
            "id": id,
            "branchId": branchId
        }
        try {
            const response = await NewsDetails(params);
            setData(response.message);
        } catch (error) {
        }
    }
    useEffect(() => {
        Get_News_Details();
    }, [id, i18next.language, branchId]);

    const info = [
        { icon: <MdOutlineDateRange />, value: data.publishDate },
        { icon: <IoIosTimer />, value: "" },
        { icon: <FaEye />, value: "" },
    ];

    return (
        <div >
            <div className='border rounded-xl my-4 mx-8'>
                <img src={data?.image} alt="News" className='w-[1325px] h-[384px] rounded-t-xl' />
                <div className='px-10 py-5'>
                    <div className='pb-4  flex flex-wrap gap-4 justify-between items-center'>
                        <div>
                            <h2 className='text-xl font-bold mt-4'>{data?.title}</h2>
                            <div className='flex flex-wrap gap-4'>
                                {info.map((item, index) => (
                                    <p key={index} className='text-[#08AC85DB] text-sm mt-1 flex items-center gap-1'>
                                        <span className='font-semibold'>{item.icon} </span>
                                        {item.value}
                                    </p>
                                ))}
                            </div>
                        </div>
                        <div>
                            <button className='bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white p-2 rounded-xl '>سجل الان  </button>
                        </div>
                    </div>
                    <div className='w-full h-[1px] bg-gray-300'></div>
                    <p className='py-4'>{data?.summary}</p>
                    <div className='w-full h-[1px] bg-gray-100'></div>
                    <Social_Media />

                </div>
            </div>
            <More_News />
        </div>

    )
}

export default News_details
