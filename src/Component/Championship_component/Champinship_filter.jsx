import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";
import { Champins_list } from "../../axiosConfig/APIs/Champanship/Champins_list";
import i18next from "i18next";
import { LayoutGrid, List } from "lucide-react";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";
import Pagination_Component from "../Shared_Component/Pagination_Component";
import { HiCalendarDateRange } from "react-icons/hi2";
import { GiTrophyCup } from "react-icons/gi";
import { useBranch } from "../../context/BranchContext";

const Champinship_filter = () => {
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [activecategory, setActiveCategory] = useState("all");
  // const [selectedBranch, setSelectedBranch] = useState("all");
  const [searchTerm, setSearchTerm] = useState();
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const paginationRef = useRef();
  const [Categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  // const [branches, setBranches] = useState([]);

  // const Get_Branches = async () => {
  //   const params = {
  //     language: i18next.language,
  //   };
  //   try {
  //     const response = await AllBranches(params);
  //     setBranches(response.message.data);
  //   } catch (error) {}
  // };
const { selectedBranch, changeBranch, branches } = useBranch();
  const Get_Champins_List = async () => {
    const params = {
      language: i18next.language,
      branchId: selectedBranch || "all",
      per_page: 6,
      page: currentPage,
      search: searchTerm,
    };
    try {
      const response = await Champins_list(params);
      setData(response.message.data);
      setTotalPages(response.message.total_pages);
    } catch (error) {
      setError(true);
    }
    // finally{
    //     setLoading(false)
    // }
  };
  // useEffect(() => {
  //   Get_Branches();
  // }, [i18next.language]);

  useEffect(() => {
    Get_Champins_List();
  }, [
    i18next.language,
    currentPage,
    activecategory,
    selectedBranch,
    searchTerm,
  ]);

  return (
    <div >
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {Categories.map((e, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveCategory(e.id);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm transition ${
              activecategory === e.id
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {e.title}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder="ابحث في ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none"
        />

        <select
          value={selectedBranch}
          onChange={(e) => {
            changeBranch(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">كل الفروع</option>

          {branches.map((e) => (
            <option key={e.id} value={e.registryId}>
              {e.name}
            </option>
          ))}
        </select>

        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg border transition ${
            viewMode === "grid"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <LayoutGrid size={18} />
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg border transition ${
            viewMode === "list"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
          }`}
        >
          <List size={18} />
        </button>
      </div>

      <div
        className={`w-full flex flex-wrap ${
          viewMode === "list" ? "flex-col" : ""
        }`}
      >
        {data.length > 0 ? (
          data.map((e, index) => (
           <div
  key={index}
  className={
    viewMode === "grid"
      ? "w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
      : "w-full mb-6"
  }
>
  <div
    className={`relative border rounded-lg shadow-md overflow-hidden bg-white ${
      viewMode === "list" ? "flex flex-col md:flex-row" : ""
    }`}
  >
    {/* الصورة */}
    <div className="relative">
      <img
        src={e.image}
        alt={e.name}
        className={`object-cover ${
          viewMode === "grid"
            ? "w-full h-40"
            : "w-full md:w-[320px] h-52 md:h-auto"
        }`}
        loading="lazy"
      />

      {/* الـ Badges */}
      <div className="absolute top-3 right-3 flex gap-2 z-10">
        <button className="rounded-full bg-[#AFEBE5] px-4 py-2 text-sm font-medium">
          {e.type}
        </button>

        <button className="rounded-full bg-[#E5E7EB] px-4 py-2 text-sm font-medium">
          {e.status}
        </button>
      </div>
    </div>

    {/* المحتوى */}
    <div className="flex-1">
      <h3 className="text-[19px] font-bold overflow-hidden text-ellipsis whitespace-nowrap p-4">
        {e.name}
      </h3>

      <div className="text-[#6A7282] font-medium text-[16px] flex flex-col gap-2 px-4">
        <button className="border-2 border-[#FFDF20] bg-[#FFF7ED] flex gap-2 items-center px-3 py-2 rounded-lg w-fit">
          <span className="text-[#FFDF20] text-xl">
            <GiTrophyCup />
          </span>
          المركز الأول
        </button>

        <p className="flex items-center gap-2">
          <span className="text-[#08AC85DB]">
            <IoLocationOutline />
          </span>
          {e.branchName}
        </p>

        <p className="flex items-center gap-2">
          <span className="text-[#08AC85DB]">
            <MdOutlineSportsSoccer />
          </span>
          {e.teamsCount} لاعبين
        </p>

        <p className="flex items-center gap-2">
          <span className="text-[#08AC85DB]">
            <HiCalendarDateRange />
          </span>
{         `${e.startDate} - ${e.endDate}`
}        </p>
      </div>

      <div className="px-4 py-4">
        <button
          onClick={() =>
            navigation(`/champions/${e.id}`, {
              state: {
                branchId: e.branchId,
                branchName: e.branchName,
              },
            })
          }
          className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition"
        >
          عرض التفاصيل
        </button>
      </div>
    </div>
  </div>
</div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-lg">
            لا توجد أكاديميات مطابقة
          </div>
        )}
      </div>
      <Pagination_Component
        currentPage={currentPage}
        totalPages={totalPages}
        setCurrentPage={setCurrentPage}
        paginationRef={paginationRef}
      />
    </div>
  );
};

export default Champinship_filter;
