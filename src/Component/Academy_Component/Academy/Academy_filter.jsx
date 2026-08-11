import React, {  useEffect, useRef, useState } from "react";
import { LayoutGrid, List } from "lucide-react";
import { assets } from "../../../assets/assets";
import { FaStar } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { MdOutlineSportsSoccer } from "react-icons/md";
import { LiaAwardSolid } from "react-icons/lia";
// import Academy from "./../../../Pages/Academy";
import { Academylist } from "../../../axiosConfig/APIs/Academy/Academy_list";
import i18next from "i18next";
import { useNavigate } from "react-router-dom";
import { Academy_Category } from "../../../axiosConfig/APIs/Academy/Academy_Category";
// import { AllBranches } from "../../../axiosConfig/APIs/Branches/All_Branches";
import Pagination_Component from "../../Shared_Component/Pagination_Component";
import { useTranslation } from "react-i18next";
import { useBranch } from "../../../context/BranchContext";

const Academy_filter = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [activecategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const paginationRef = useRef();
  const [Categories, setCategories] = useState([]);
  const [error, setError] = useState(false);
  // const [branches, setBranches] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const isLoggedIn = user;
  // const Get_Branches = async () => {
  //   const params = {
  //     language: i18next.language,
  //   };
  //   try {
  //     const response = await AllBranches(params);
  //     setBranches(response.message.data);
  //   } catch (error) { }
  // };
const{selectedBranch, changeBranch, branches} = useBranch();

  const Get_Academy_Category = async () => {
    try {
      const params = {
        language: i18next.language,
        branchId: selectedBranch || "all",
      };
      const response = await Academy_Category(params);
      const uniqueCategories = response.message.data.filter(
        (category, index, self) =>
          index === self.findIndex((c) => c.id === category.id),
      );
      setCategories(uniqueCategories);
      console.log(selectedBranch, "selectedBranch");
    } catch (error) { }
  };

const Get_Academy_List = async () => {
  // const finalBranchId = !isLoggedIn ? selectedBranch || "all" : selectedBranch;

  const params = {
    language: i18next.language,
    branchId: selectedBranch || "all",
    per_page: 6,
    page: currentPage,
    category: activecategory,
    search: searchTerm,
  };

  try {
    const response = await Academylist(params);
    setData(response.message.data || []);
    setTotalPages(response.message.total_pages);
    console.log(response.message.data.branchId)
  } catch (error) {
    setError(true);
  }
};
  // useEffect(() => {
  //   Get_Branches();
  // }, [i18next.language]);
  useEffect(() => {
    Get_Academy_Category();
  }, [i18next.language , selectedBranch]);

 useEffect(() => {
 

  Get_Academy_List();
}, [
  i18next.language,
  currentPage,
  activecategory,
  selectedBranch,
  searchTerm,
]);

  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-4">
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        <button
          onClick={() => {
            setActiveCategory("all");
            setCurrentPage(1);
          }}
          className={`px-4 py-2 rounded-full border text-sm transition ${activecategory === "all"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
            }`}
        >
          {t("all_academies")}
        </button>
        {Categories.map((e, index) => (
          <button
            key={index}
            onClick={() => {
              setActiveCategory(e.id);
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-full border text-sm transition ${activecategory === e.id
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
          placeholder={t("search_academies")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none"
        />

       {!isLoggedIn && (
 <select
  value={selectedBranch || "all"}
  onChange={(e) => {
    changeBranch(e.target.value);
    setCurrentPage(1);
  }}
  
>
    <option value="all">{t("all_branches")}</option>

    {branches.map((e) => (
      <option key={e.id} value={e.id}>
        {e.name}
      </option>
    ))}
  </select>
)}

        <button
          onClick={() => setViewMode("grid")}
          className={`p-2 rounded-lg border transition ${viewMode === "grid"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
            }`}
        >
          <LayoutGrid size={18} />
        </button>

        <button
          onClick={() => setViewMode("list")}
          className={`p-2 rounded-lg border transition ${viewMode === "list"
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-gray-600 border-gray-300"
            }`}
        >
          <List size={18} />
        </button>
      </div>

      <div
        className={`w-full flex flex-wrap ${viewMode === "list" ? "flex-col" : ""
          }`}
      >
        {data.length > 0 ? (
          data.map((academy, index) => (
            <div
              onClick={() =>
                navigation(`/academy/${academy.id}`, {
                  state: {
                    branchId: academy.branchName,
                    branchName: academy.branchName,
                  },
                })
              }
              key={index}
              className={
                viewMode === "grid"
                  ? "w-full sm:w-1/2 lg:w-1/3 px-3 mb-6 "
                  : "w-full mb-6"
              }
            >
              <div
                className={`border rounded-lg shadow-md overflow-hidden bg-white h-full flex flex-col ${viewMode === "list" ? "md:flex-row" : ""
                  }`}
              >
                <img
                  src={academy.image ? academy.image : assets.image_1}
                  alt={academy.name}
                  className={`object-cover ${viewMode === "grid"
                      ? "w-full h-40"
                      : "w-full md:w-[320px] h-52 md:h-auto"
                    }`}
                  loading="lazy"
                />

                <div className="flex-1">
                  <div className="p-4 flex justify-between items-center flex-wrap gap-3">
                    <h3 className="text-lg font-bold">
                      {academy.name?.slice(0, 30)}
                    </h3>
                    <div className="border px-2 py-1 text-sm rounded-xl font-bold flex items-center gap-1">
                      <span className="text-[#F0B100]">
                        <FaStar />
                      </span>
                      {academy.rating}
                    </div>
                  </div>

                  <div className="px-4">
                    <p className="text-[#6A7282] font-medium text-[16px]  line-clamp-2">
                      {academy.description}
                    </p>
                  </div>

                  <div className="text-[#6A7282] font-medium text-[14px] flex flex-col gap-1 p-4">
                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <IoLocationOutline />
                      </span>
                      {academy.branchName}
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <MdOutlineSportsSoccer />
                      </span>
                      {academy.reviewCount} متدرب
                    </p>

                    <p className="flex items-center gap-2">
                      <span className="text-[#08AC85DB]">
                        <LiaAwardSolid />
                      </span>
                      {academy.trainersCount} مدربين محترفين
                    </p>
                  </div>


                </div>
                                  <div className="px-4 py-3">
                    <button className="w-full bg-teal-600 text-white py-2 rounded-lg hover:bg-teal-700 transition">
                      {t("view_details")}
                    </button>
                  </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full text-center py-10 text-gray-500 text-lg">
            {t("no_matching_activities")}
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

export default Academy_filter;
