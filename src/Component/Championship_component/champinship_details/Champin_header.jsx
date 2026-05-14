import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { useLocation, useParams } from 'react-router-dom';
import { Academy_Detail } from '../../../axiosConfig/APIs/Academy/Academy_Details';
// import Left_side from './Left_side';
// import Right_side from './Right_side';
import { Champins_details } from '../../../axiosConfig/APIs/Champanship/Champins_details';

const Champin_header = () => {
    const [data, setData] = useState();
    const [error, setError] = useState(false);
    const { id } = useParams();
    const location = useLocation();


    const branchId = location.state?.branchId;
    console.log("branchId11111111111111:", branchId);
    console.log("branchId11111111111111:", branchId);

    const params = {
        "language": i18next.language,
        "id": id,
        "branchId": branchId,
    }

    console.log("params:", params);

    const Get_Champins_Details = async () => {
        try {
            const response = await Champins_details(params);
            setData(response.message);
            console.log(response.message);
            console.log(id)
        }
        catch (error) {
            setError(true);
            console.error("Error fetching news:", error);
        }
    }

    useEffect(() => {
        if (id) {
            Get_Champins_Details();
        }
    }, [id, i18next.language, branchId]);

    return (
        <div>
            <img src={data?.image} alt="Academy" className='w-full h-[300px]' />
            <div className='grid grid-cols-1 lg:grid-cols-12 gap-5 px-14 '>
                <div className='lg:col-span-9 grid grid-cols-9 gap-5'>
                    {/* <Left_side/> */}
                </div>

                <div className='lg:col-span-3 grid grid-cols-3 gap-5'>
                    {/* <Right_side/> */}
                </div>

            </div>

        </div>
    )
}

export default Champin_header


