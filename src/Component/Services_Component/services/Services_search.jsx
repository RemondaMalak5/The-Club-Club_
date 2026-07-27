import React, { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { LayoutGrid, List, Calendar, MapPin, Users } from "lucide-react";
import { All_Services } from "../../../axiosConfig/APIs/Services/All_Services";
import { Services_category } from "../../../axiosConfig/APIs/Services/Services_category";
import { AllBranches } from "../../../axiosConfig/APIs/Branches/All_Branches";
import i18next from "i18next";
import { useTranslation } from "react-i18next";
import Pagination_Component from "../../Shared_Component/Pagination_Component";
import { useBranch } from "../../../context/BranchContext";

const Services_search = () => {
  const navigate = useNavigate();
  const {t}=useTranslation();
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  // const [selectedBranch, setSelectedBranch] = useState("All");
  const [viewMode, setViewMode] = useState("grid");
   const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState();
    const paginationRef = useRef();
  const { selectedBranch, changeBranch, branches } = useBranch();

const { data: servicesData, isLoading, isError } = useQuery({
  queryKey: ["all-services", i18next.language, currentPage ,selectedBranch],
  queryFn: () =>
    All_Services({
      language: i18next.language,
      page: currentPage,
      page_size: 6,
              branchId: selectedBranch || "all",

    }),
});

  const { data: categoriesData } = useQuery({
    queryKey: ["services-categories", i18next.language , selectedBranch],
    queryFn: () =>
      Services_category({
        language: i18next.language,
        branchId: selectedBranch || "all",
      }),
  });

  const { data: branchesData } = useQuery({
    queryKey: ["branches", i18next.language],
    queryFn: () =>
      AllBranches({
        language: i18next.language,
      }),
  });
 useEffect(() => {
  if (servicesData?.message?.total_pages) {
    setTotalPages(servicesData.message.total_pages);
  }
}, [servicesData]);

  const services = servicesData?.message?.data || [];
  const categories = categoriesData?.message?.data || [];
  // const branches = branchesData?.message?.data || [];

  const tabs = useMemo(() => {
    return [
      { label: "الكل", value: "all" },
      ...categories?.map((cat) => ({
        label: cat.name,
        value: cat.id,
      })),
    ];
  }, [categories, i18next.language,currentPage]);

  const filteredData = useMemo(() => {
    return services.filter((item) => {
      const matchesCategory =
        activeTab === "all" || item.category === activeTab;

      const matchesBranch =
  selectedBranch === "all" ||
  String(item.branchId).toLowerCase() ===
    String(selectedBranch).toLowerCase();

      const searchValue = `
        ${item.title || ""}
        ${item.sub_title || ""}
        ${item.category || ""}
        ${item.branchName || ""}
      `.toLowerCase();

      const matchesSearch = searchValue.includes(searchTerm.toLowerCase());

      return matchesCategory && matchesBranch && matchesSearch;
    });
  }, [services, activeTab, selectedBranch, searchTerm]);

  const getPriceLabel = (price, currency) => {
    return Number(price) === 0 ? "مجاني" : `${price} ${currency || "EGP"}`;
  };

  if (isLoading) {
    return <div className="py-10 text-center">جاري التحميل...</div>;
  }

  if (isError) {
    return (
      <div className="py-10 text-center text-red-500">
        حدث خطأ أثناء تحميل الخدمات
      </div>
    );
  }

 
  return (
    <div className="xl:py-6 md:py-5 py-3 xl:px-16 md:px-10 px-4 bg-[#f8faf9]">
      <div className="flex flex-wrap gap-3 mb-4 justify-center">
        {tabs?.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`px-4 py-2 rounded-xl border text-sm transition ${
              activeTab === tab.value
                ? "bg-teal-600 text-white border-teal-600"
                : "bg-white text-gray-600 border-gray-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap gap-3 mb-6 items-center">
        <input
          type="text"
          placeholder={t("search_services")}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 min-w-[220px] px-4 py-2 border rounded-lg outline-none bg-white"
        />

        <select
  value={selectedBranch}
  onChange={(e) => {
    changeBranch(e.target.value);
  }}
  className="px-4 py-2 border rounded-lg bg-white"
>
  <option value="all">{t("all_branches")}</option>

  {branches?.map((e) => (
    <option key={e.id} value={e.id || e.id}>
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
        className={
          viewMode === "grid" ? "flex flex-wrap" : "flex flex-col gap-5"
        }
      >
        {filteredData.length > 0 ? (
          filteredData?.map((item) => (
            <div
              key={`${item.service_id}-${item.branchId}`}
              className={
                viewMode === "grid"
                  ? "w-full sm:w-1/2 lg:w-1/3 px-3 mb-6"
                  : "w-full"
              }
            >
              <div
                className={`bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition ${
                  viewMode === "grid"
                    ? "h-full flex flex-col"
                    : "flex flex-col md:flex-row min-h-[280px]"
                }`}
              >
                <div
                  className={`relative ${
                    viewMode === "grid"
                      ? "w-full h-52"
                      : "w-full md:w-[320px] lg:w-[360px] h-[220px] md:h-auto md:min-h-[280px] shrink-0"
                  }`}
                >
                  <img
                    src={item.image || item.cover_photo}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />

                  <span className="absolute top-3 right-3 bg-white/95 px-3 py-1 rounded-full text-sm shadow text-gray-700">
                    {item.category}
                  </span>
                </div>

                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <div className="p-4 flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex items-center gap-3 justify-between w-full">
                        <h3 className="text-lg font-bold text-gray-800 mb-1">
                          {item.title}
                        </h3>

                        <span className="border text-[#F45816] rounded-full bg-[#FFF7ED] py-1 px-2 font-bold">
                          {getPriceLabel(item.price_from, item.currency)}
                        </span>
                      </div>
                    </div>

                    <p className="px-4 text-gray-500 text-sm leading-6 mb-3">
                      {item.sub_title}
                    </p>

                    <div className="px-4 pb-4 text-sm text-gray-600 space-y-2">
                      <p className="flex items-center gap-2">
                        <Calendar size={16} className="text-teal-500" />
                        {item.start_date}
                      </p>

                      <p className="flex items-center gap-2">
                        <MapPin size={16} className="text-teal-500" />
                        {item.branchName}
                      </p>

                      <p className="flex items-center gap-2">
                        <Users size={16} className="text-teal-500" />
                        {item.is_unlimited
                          ? "غير محدود"
                          : `${item.available_count} مقاعد`}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0">
                    <button
                      onClick={() =>
                        navigate(`/services/${item.service_id}`, {
                          state: { service: item },
                        })
                      }
                      className="w-full bg-teal-600 text-white py-2.5 rounded-lg hover:bg-teal-700 transition"
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
            لا توجد نتائج مطابقة
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

export default Services_search;