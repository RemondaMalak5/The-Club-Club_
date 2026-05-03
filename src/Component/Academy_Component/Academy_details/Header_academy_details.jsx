import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { AcademyDetail } from '../../../axiosConfig/APIs/Academy/Academy_Details';

const Header_academy_details = () => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const {id} = useParams();

    const Get_Academy_Details = async () => {
        const params = {
            "language": i18next.language,   
            "branchId": "new_capital",
            "id": id ,
        }
        try {
            const response = await AcademyDetail(params);   
            setData(response.message);
            console.log(response.message);
        }
        catch (error) {
            setError(true);
            console.error("Error fetching news:", error);
        }   
    }

        useEffect(() => {   
        Get_Academy_Details();
    }, [i18next.language,id])  
  return (
    <div>
        <img src={data?.image} alt="Academy" className='w-full h-[500px]'/>
        <p>{data?.name}</p>

    </div>
  )
}

export default Header_academy_details