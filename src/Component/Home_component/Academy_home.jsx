import i18next from "i18next";
import React, { useEffect, useState } from "react";
import { IoArrowBack, IoArrowForward } from "react-icons/io5";
import { Academylist } from "../../axiosConfig/APIs/Academy/Academy_list";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useBranch } from "../../context/BranchContext";
import { assets } from "../../assets/assets";

const Academy_home = () => {
  const { t } = useTranslation();
  const navigation = useNavigate();
  const [data, setData] = useState([]);
  const [activecategory, setActiveCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState();
  const [error, setError] = useState(false);
const {selectedBranch ,changeBranch , branches} = useBranch();


  const Get_Academy_List = async () => {
    const params = {
      language: i18next.language,
      branchId: selectedBranch === "all" ? "" : selectedBranch,
      per_page: 4,
      page: currentPage,
    };

    try {
      const response = await Academylist(params);
      setData(response?.message?.data );
      setTotalPages(response?.message?.total_pages);
    } catch (error) {
      console.log("Academy Error:", error);
      setError(true);
    }
  };
  useEffect(() => {
    Get_Academy_List();
  }, [
    i18next.language,
    selectedBranch,
    currentPage,
  ]);

 const handleBooking = (academy) => {
  const token = localStorage.getItem("token");
  if (!token) {
    navigation("/login");
  }
    else
 navigation(`/academy/${academy.id}`, {
                    state: {
                      branchId: academy.branchId,
                      branchName: academy.branchName,
                      openBooking: true,
                    },
                  })  };

  return (
    <div className="w-full bg-[#F2F6F5] p-4 sm:p-6 lg:p-8 rounded-2xl">

      <div>
        <h2 className="text-2xl sm:text-3xl lg:text-[36px] font-bold">
          {t("academy")}{" "}
          <span className="bg-gradient-to-r from-[#08AC85] to-[#00786F] bg-clip-text text-transparent">
            {t("sport")}
          </span>
        </h2>

        <p className="text-gray-500 text-sm mt-1">
          {t("search_hint")}
        </p>
      </div>


      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between py-4">
        <div className="flex flex-wrap gap-3 mb-4 justify-center">
          {/* ALL */}

          <button
            type="button"
            onClick={() => {
              changeBranch("all");
              setCurrentPage(1);
            }}
            className={`px-4 py-2 rounded-xl font-bold w-fit border transition ${
              selectedBranch === "all"
                ? "bg-[#0A8F7A] text-white border-[#0A8F7A]"
                : "border-[#0A8F7A] text-[#0A8F7A] hover:bg-[#0A8F7A] hover:text-white"
            }`}
          >
            {t("all")}
          </button>

          {/* BRANCHES */}

          {branches.map((branch) => (
            <button
              type="button"
              key={branch.id}
              onClick={() => {
                changeBranch(branch.id);
                setCurrentPage(1);
              }}
              className={`px-4 py-2 rounded-xl font-bold w-fit border transition ${
                selectedBranch === branch.id
                  ? "bg-[#0A8F7A] text-white border-[#0A8F7A]"
                  : "border-[#0A8F7A] text-[#0A8F7A] hover:bg-[#0A8F7A] hover:text-white"
              }`}
            >
              {branch.name}
            </button>
          ))}
                </div>

        {/* VIEW ALL */}

        <button
          type="button"
          onClick={() => navigation("/academy")}
          className="border border-[#0A8F7A] text-[#0A8F7A] px-4 py-2 rounded-full hover:bg-[#0A8F7A] hover:text-white transition font-bold flex items-center justify-center gap-2 w-full sm:w-fit"
        >
          {t("view_all_academies")}

          <span className="text-[18px]">
            {i18next.language === "ar" ? (
              <IoArrowBack />
            ) : (
              <IoArrowForward />
            )}
          </span>
        </button>
      </div>

      {/* Academies list */}

      <div className="flex flex-col gap-4">
        {data?.map((academy, index) => (
          <div
            key={academy.id || index}
            className="bg-white rounded-xl p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 shadow-sm"
          >
            {/* Academy info */}

            <div className="flex items-center gap-3">
              <div className="bg-gray-100 p-3 rounded-lg text-[#0A8F7A] text-lg shrink-0">
                {academy.categoryIcon || <img className="w-8 h-8" 
                src={assets.logo}/>}
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

            {/* Buttons */}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full md:w-auto">
              {/* BOOK */}

              <button
                type="button"
                onClick={() => handleBooking(academy)
                 
                }
                className="bg-[#0A8F7A] text-white px-4 py-2 rounded-2xl font-bold sm:w-28 hover:bg-white hover:text-[#0A8F7A] border border-[#0A8F7A] transition"
              >
                {t("book")}
              </button>

              {/* DETAILS */}

              <button
                type="button"
                onClick={() =>
                  navigation(`/academy/${academy.id}`, {
                    state: {
                      branchId: academy.branchId,
                      branchName: academy.branchName,
                      openBooking: false,
                    },
                  })
                }
                className="border border-[#0A8F7A] px-4 py-2 rounded-2xl text-sm sm:w-28 font-bold hover:bg-[#0A8F7A] hover:text-white transition"
              >
                {t("details")}
              </button>
            </div>
          </div>
        ))}

        {data?.length === 0 && (
          <p className="text-center text-gray-500 py-5">
            {t("no_data") || "No academies found"}
          </p>
        )}
      </div>
    </div>
  );
};

export default Academy_home;