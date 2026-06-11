import i18next from 'i18next';
import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { useNavigate, useParams } from 'react-router-dom';
import { Academylist } from '../../axiosConfig/APIs/Academy/Academy_list';

const Academy_branch = ({registryId}) => {
  const {t} = useTranslation();
  const navigation = useNavigate();
 const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [totalPages, setTotalPages] = useState(0);  
  
console.log("branchId in Academy_branch:", registryId);
  const Get_Academy_List = async () => {
    const params = {
      "language": i18next.language,
      "branchId":  registryId,
      "per_page": 4,
    };
    try {
      const response = await Academylist(params);
      setData(response.message.data);
      console.log(response.message.data)


      setTotalPages(response.message.total_pages);
    }
    catch (error) {
      setError(true);
    }
 
  };
 useEffect(() => {
  if (registryId) {
    Get_Academy_List();
  }
}, [i18next.language, registryId]);
  return (
 <div className="w-full bg-[#F2F6F5] p-4 sm:p-6 lg:p-8 rounded-2xl">

        {/* Header */}
        <div>
          <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
            {t("academies")}
            <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
              {t("sport")}
            </span>
          </h2>

          <p className="text-gray-500 text-sm mt-1">
           {t("search_hint")}
      </p>
        </div>

        {/* Branches + View All */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">

          
         

        </div>

        {/* Academies list */}
        <div className="flex flex-col gap-4">
          {data?.map((academy, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
            >

              {/* right side */}
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-3 rounded-lg text-[#0A8F7A] text-lg shrink-0">
                  {academy.categoryIcon}
                </div>

                <div className="text-right">
                  <h3 className="font-semibold text-gray-800">
                    {academy.name}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {academy.category}
                  </p>
                </div>
              </div>

              {/* buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full md:w-auto">
                <button className="bg-[#0A8F7A] text-white px-4 py-2 rounded-2xl font-bold sm:w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition">
                  {t("book")}
                </button>

                <button className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
                  {t("schedule")}
                </button>

                <button  onClick={() =>
                                        navigation(`/academy/${academy.id}`, {
                                          state: {
                                            branchId: academy.branchId,
                                            branchName: academy.branchName,
                                          },
                                        })
                                      } className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition">
                  {t("details")}
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>  )
}

export default Academy_branch