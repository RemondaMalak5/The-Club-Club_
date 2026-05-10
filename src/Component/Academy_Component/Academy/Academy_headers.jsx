import React, { useEffect, useState } from "react";
import { Users, Activity, ClipboardList } from "lucide-react";
import SubTitle from "../../Shared_Component/SubTitle";
import Title_1 from "../../Shared_Component/Title_1";
import i18next from "i18next";
import { Academy_Stats } from "../../../axiosConfig/APIs/Academy/Academy_state";
import H_one from "../../Shared_Component/H_one";

const Academy_headers = () => {
 const [data, setData] = useState({});
  const Get_Academy_Stats = async () => {
        const params = {
            "language": i18next.language,
            "branchId":"all",
        }
        try {
            const response = await Academy_Stats(params);
            setData(response.message);
            console.log(response.message);
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
        Get_Academy_Stats();
    }, [i18next.language ]);

      const stats = [
    {
      title: " اجمالى عدد الأكاديميات ",
      value: data.totalAcademies ,
      icon: <ClipboardList/>,
    },
    {
      title: "إجمالي المشتركين",
      value: data.certifiedTrainers ,
      icon: <Users  />,
    },
    {
      title: "الأكاديميات النشطة",
      value: data.totalStudents ,
      icon: <Activity />,
    },
  ];
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <div className="py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] ">
        <H_one text={"الأكاديميات الرياضية"} />
        <SubTitle SubTitle={"برامج تدريبية متخصصة لجميع الأعمار والمستويات"} />
        <div className="flex flex-wrap gap-7 mt-2">
          {stats.map((item, index) => (
            <div
              key={index}
              className="flex flex-col xl:w-1/4 w-full md:w-1/2 bg-white border  gap-1 px-6 py-3 rounded-2xl shadow-md"
            >
              <div className="flex gap-3 items-center">
                <div className="bg-teal-600 text-white p-4 rounded-lg">
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
  );
};

export default Academy_headers;
