import React from "react";
import { Users, Activity, ClipboardList } from "lucide-react";
import H_1 from "../../Shared_component/H_1";
import SubTitle from "../../Shared_Component/SubTitle";
import Title_1 from "../../Shared_Component/Title_1";

const Academy_headers = () => {
  const stats = [
    {
      title: " اجمالى عدد الأكاديميات ",
      value: 24,
      icon: <ClipboardList/>,
    },
    {
      title: "إجمالي المشتركين",
      value: 980,
      icon: <Users  />,
    },
    {
      title: "الأكاديميات النشطة",
      value: 17,
      icon: <Activity />,
    },
  ];

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-10">
      <div className="py-5 px-10  flex flex-col gap-5 rounded-2xl bg-gradient-to-br from-[#DBEFEAB2] via-[#E2F1ED24] via-[#EBF3F1] to-[#DCF0EB9A] ">
        <H_1 text={"الأكاديميات الرياضية"} />
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
