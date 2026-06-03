import React, { useEffect, useRef, useState } from "react";
import { assets } from "../../assets/assets";
import { GoArrowUpRight } from "react-icons/go";
import { CgCalendarDates } from "react-icons/cg";
import { Newslist } from "../../axiosConfig/APIs/News/News_list";
import i18next from "i18next";
import Pagination_Component from "../Shared_Component/Pagination_Component";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { News_categoy } from "../../axiosConfig/APIs/News/News_categoy";
import { AllBranches } from "../../axiosConfig/APIs/Branches/All_Branches";

const All_News = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const paginationRef = useRef();
  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [branches, setBranches] = useState([]);

  const News_API = async () => {
    const params = {
      language: i18next.language,
      branchId: branch || "all",
      categoryId: category || "all",
      search: search || "",
      per_page: 6,
      page: currentPage,
    };
    try {
      const response = await Newslist(params);
      setData(response.message.data);
      setTotalPages(response.message.total_items);
    } catch (error) {
      setError(true);
    }
  };


  const getCategoryName = async () => {
    const params = {
      language: i18next.language,
      branchId: branch || "all",
    };

    try {
      const response = await News_categoy(params);
      setCategories(response.message.data);
    } catch (error) {
      console.error('Failed to load news categories', error);
    }
  };
 
  const getbranchName = async () => {
    const params = {
      "language": i18next.language,
    };
    try {
      const response = await AllBranches(params);
      setBranches(response.message.data);
    } catch (error) {
      console.error('Failed to load branches', error);
    }
  }

  useEffect(() => {
    News_API();
  }, [i18next.language, currentPage, branch, category, search]);

  useEffect(() => {
    setCurrentPage(1);
  }, [branch, category, search]);

  useEffect(() => {
    getbranchName();
  }, [i18next.language]);
 
  useEffect(() => {
    getCategoryName();
  }, [i18next.language, branch]);

  return (
    <div className="px-14 py-5">
      <div className="border p-4 rounded-xl mb-5">
              <div className="flex flex-wrap  w-full gap-4">
                <input
                  type="text"
                  placeholder={t("search_academies")}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none"
                />
      
                {/* الفئة */}
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="min-w-[220px] px-4 py-2 border rounded-lg outline-none"
                >
                  <option value="">{t("all_categories")}</option>
      
                  {categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.title}
                    </option>
                  ))}
                </select>
      
      
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="min-w-[220px] px-4 py-2 border rounded-lg outline-none"
                >
                  <option value="">{t("all_branches")}</option>
                  {branches.map((br) => (
                    <option key={br.id} value={br.id}>
                      {br.name}
                    </option>
                  ))}
                </select>
      
               
              </div>
            </div>

      <div className="grid md:grid-cols-3 gap-6">
        {data.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl shadow-md overflow-hidden"
          >
            <img src={item.image} alt="" className="w-full h-52 object-cover" />

            <div className="p-5 space-y-3">
              <div className="flex justify-between items-center text-sm text-gray-500">
                <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                  {item.category}
                </span>
                <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 justify-items-center">
                  <span className="text-[16px] ">
                    <CgCalendarDates />
                  </span>
                  {item.publishDate}
                </p>
              </div>

              <h3 className="font-bold text-[18px]  text-[#1E2939]">
                {item.title}
              </h3>

              <p className="text-[#6A7282] text-sm">{item.desc}</p>

              <button
  onClick={() =>
    navigate(`/news/${item.id}`, {
      state: {
        branchId: item.branchId,
        branchName: item.branchName,
      },
    })
  }
  className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] font-semibold text-[16px] text-white px-5 py-3 rounded-full text-sm hover:bg-[#0aa194] transition flex items-center gap-1"
>
  <span className="font-semibold text-[16px]">
    <GoArrowUpRight />
  </span>
  قراءة المزيد
</button>

            </div>
          </div>
        ))}
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

export default All_News;
