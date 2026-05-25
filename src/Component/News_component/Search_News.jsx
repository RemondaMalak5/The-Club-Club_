import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from "@mui/material";
import { Most_read_news } from "../../axiosConfig/APIs/News/Most_Read_News";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";
import i18next from "i18next";
import { Last_news } from "../../axiosConfig/APIs/News/Last_News";

const Search_News = () => {
  const { t } = useTranslation();

  const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [activity, setActivity] = useState("");
  const [search, setSearch] = useState("");
  const [mostReadNews, setMostReadNews] = useState([]);
  const [lastNews, setLastNews] = useState([]);

  const Get_most_read_news = async () => {
    const params = {
      language: i18next.language,
    };
    try {
      const response = await Most_read_news(params);
      setMostReadNews(response.message.data);
    } catch (error) {
    }
  };
  const Get_last_news = async () => {
    const params = {
      language: i18next.language,

      branchId: "all",
    };
    try {
      const response = await Last_news(params);
      setLastNews(response.message.data);
    } catch (error) {
    }
  };
  useEffect(() => {
    Get_last_news();
  }, [i18next.language]);

  useEffect(() => {
    Get_most_read_news();
  }, [i18next.language]);

  return (
    <div className="px-14 py-5">
    <div className="border p-4 rounded-xl mb-5">
  <div className="flex flex-col md:flex-row flex-wrap gap-4">
    
    {/* البحث */}
    <TextField
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="ابحث في الأخبار"
      size="small"
      variant="outlined"
      fullWidth
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "48%", lg: "24%" },

        "& .MuiOutlinedInput-root": {
          borderRadius: "12px",
          backgroundColor: "#fff",
        },
      }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <FaSearch />
          </InputAdornment>
        ),
      }}
    />

    {/* الفئة */}
    <FormControl
      size="small"
      fullWidth
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "48%", lg: "24%" },
      }}
    >
     <Select
  value={category}
  displayEmpty
  onChange={(e) => setCategory(e.target.value)}
  sx={{
    borderRadius: "12px",
    backgroundColor: "#fff",
    direction: "rtl",

    "& .MuiSelect-icon": {
      left: "10px",
      right: "auto",
    },
  }}
>
        <MenuItem value="">
          <em>حسب الفئة</em>
        </MenuItem>
        <MenuItem value="1">Test 1</MenuItem>
        <MenuItem value="2">Test 2</MenuItem>
      </Select>
    </FormControl>

    {/* الفروع */}
    <FormControl
      size="small"
      fullWidth
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "48%", lg: "24%" },
      }}
    >
     <Select
  value={branch}
  displayEmpty
  onChange={(e) => setBranch(e.target.value)}
  sx={{
    borderRadius: "12px",
    backgroundColor: "#fff",
    direction: "rtl",

    "& .MuiSelect-icon": {
      left: "10px",
      right: "auto",
    },
  }}
>
        <MenuItem value="">
          <em>كل الفروع</em>
        </MenuItem>
        <MenuItem value="branch1">فرع 1</MenuItem>
        <MenuItem value="branch2">فرع 2</MenuItem>
      </Select>
    </FormControl>

    {/* الأنشطة */}
    <FormControl
      size="small"
      fullWidth
      sx={{
        flex: 1,
        minWidth: { xs: "100%", sm: "48%", lg: "24%" },
      }}
    >
     <Select
  value={activity}
  displayEmpty
  onChange={(e) => setActivity(e.target.value)}
  sx={{
    borderRadius: "12px",
    backgroundColor: "#fff",
    direction: "rtl",

    "& .MuiSelect-icon": {
      left: "10px",
      right: "auto",
    },
  }}
>
        <MenuItem value="">
          <em>كل الأنشطة</em>
        </MenuItem>
        <MenuItem value="activity1">نشاط 1</MenuItem>
        <MenuItem value="activity2">نشاط 2</MenuItem>
      </Select>
    </FormControl>
  </div>
</div>

      <div className="flex flex-wrap ">
        <div className="w-1/2 border bg-white rounded-2xl overflow-hidden shadow-sm">
          <img
            src={mostReadNews[0]?.image}
            alt={mostReadNews[0]?.title}
            className="w-full h-56 object-cover"
          />

          <div className="p-4">
            <span className="text-xs text-green-600">
              {" "}
              {mostReadNews[0]?.publishDate}{" "}
            </span>

            <h2 className="font-bold text-lg mt-2 mb-2">
              {mostReadNews[0]?.title}
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              {mostReadNews[0]?.summary}
            </p>

            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white px-4 py-2 rounded-xl text-sm">
                {t("view_more")}{" "}
              </button>

              <button className="border px-4 py-2 rounded-xl text-sm">
                حجز
              </button>
            </div>
          </div>
        </div>

        <div className="w-1/2 ps-5  ">
          {lastNews.slice(0, 5).map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center  w-full border p-4 rounded-xl my-2"
            >
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <span className="text-xs text-gray-400">
                  {item.publishDate}
                </span>
              </div>

              <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] border p-3 text-white rounded-2xl text-xs flex items-center gap-1">
                قراءة المزيد <FiArrowUpRight />
              </button>
            </div>
          ))}{" "}
        </div>
      </div>
    </div>
  );
};

export default Search_News;
