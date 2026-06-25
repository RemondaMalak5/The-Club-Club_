import React, { useEffect, useRef, useState } from "react";
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

  const [category, setCategory] = useState("all");
  const [branch, setBranch] = useState("all");
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [branches, setBranches] = useState([]);

  const News_API = async () => {
    const params = {
      language: i18next.language,
      branchId: branch,
      category: category,
      search: search || "",
      per_page: 6,
      page: currentPage,
    };

    try {
      setError(false);

      const response = await Newslist(params);

      setData(response?.message?.data || []);
      setTotalPages(response?.message?.total_pages || 1);
    } catch (error) {
      console.error("Failed to load news", error);
      setError(true);
      setData([]);
      setTotalPages(1);
    }
  };

  const getCategoryName = async () => {
    const params = {
      language: i18next.language,
      branchId: branch,
    };

    try {
      const response = await News_categoy(params);

      const uniqueCategories = [
        ...new Map(
          (response?.message?.data || []).map((cat) => [cat.id, cat])
        ).values(),
      ];

      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Failed to load news categories", error);
      setCategories([]);
    }
  };

  const getbranchName = async () => {
    const params = {
      language: i18next.language,
    };

    try {
      const response = await AllBranches(params);
      setBranches(response?.message?.data || []);
    } catch (error) {
      console.error("Failed to load branches", error);
      setBranches([]);
    }
  };

  useEffect(() => {
    News_API();
  }, [i18next.language, currentPage, branch, category, search]);

  useEffect(() => {
    getbranchName();
  }, [i18next.language]);

  useEffect(() => {
    getCategoryName();
  }, [i18next.language, branch]);

  return (
    <div className="px-14 py-5 bg-slate-100">
      <div className="border p-4 rounded-xl mb-5 bg-white">
        <div className="flex flex-wrap w-full gap-4">
          <input
            type="text"
            placeholder={t("search_academies")}
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none"
          />

          <select
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
              setCurrentPage(1);
            }}
            className="min-w-[220px] px-4 py-2 border rounded-lg outline-none"
          >
            <option value="all">{t("all_categories")}</option>

            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.title}
              </option>
            ))}
          </select>

          <select
            value={branch}
            onChange={(e) => {
              setBranch(e.target.value);
              setCategory("all");
              setCurrentPage(1);
            }}
            className="min-w-[220px] px-4 py-2 border rounded-lg outline-none"
          >
            <option value="all">{t("all_branches")}</option>

            {branches.map((br) => (
              <option key={br.id} value={br.registryId}>
                {br.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <p className="text-red-500 text-center mb-4">
          حدث خطأ أثناء تحميل الأخبار
        </p>
      )}

      <div className="grid md:grid-cols-3 gap-6">
        {data.length > 0 ? (
          data.map((item, index) => (
            <div
              key={item.id || index}
              className="bg-white rounded-2xl shadow-md overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.title || "news image"}
                className="w-full h-52 object-cover"
                loading="lazy"
              />

              <div className="p-5 space-y-3">
                <div className="flex justify-between items-center text-sm text-gray-500">
                  <span className="bg-[#EAF3F1] px-5 py-2 font-bold text-[14px] rounded-full text-[#1E2939]">
                    {item.category}
                  </span>

                  <p className="text-[#21857C] font-semibold text-[14px] flex gap-1 items-center">
                    <span className="text-[16px]">
                      <CgCalendarDates />
                    </span>
                    {item.publishDate}
                  </p>
                </div>

                <h3 className="font-bold text-[18px] text-[#1E2939]">
                  {item.title}
                </h3>

                <p className="text-[#6A7282] text-sm">{item.summary}</p>

                <button
                  onClick={() =>
                    navigate(`/news/${item.id}`, {
                      state: {
                        branchId: item.branchId,
                        branchName: item.branchName,
                      },
                    })
                  }
                  className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] font-semibold text-[16px] text-white px-5 py-3 rounded-full hover:bg-[#0aa194] transition flex items-center gap-1"
                >
                  <span className="font-semibold text-[16px]">
                    <GoArrowUpRight />
                  </span>
                  قراءة المزيد
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-white">لا توجد أخبار</p>
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

export default All_News;