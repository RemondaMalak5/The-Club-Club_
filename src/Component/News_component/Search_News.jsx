import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { TextField, Select, MenuItem, FormControl, InputAdornment } from "@mui/material";


const Search_News = () => {
  const news = [
    {
      title: "بطولة شتوية مفتوحة - شارك الآن",
      date: "2 فبراير 2026",
    },
    {
      title: "خصومات على خدمات الملاعب هذا الأسبوع",
      date: "12 يناير 2026",
    },
    {
      title: "تنبيه: تحديث في مواعيد بعض الأنشطة",
      date: "18 يناير 2026",
    },
    {
      title: "فتح باب التسجيل لأكاديمية كرة السلة",
      date: "29 يناير 2026",
    },
    {
      title: "افتتاح ملعب جديد لكرة اليد",
      date: "13 يناير 2026",
    },
  ];
   const [category, setCategory] = useState("");
  const [branch, setBranch] = useState("");
  const [activity, setActivity] = useState("");
  const [search, setSearch] = useState("");


  return (
    <div className="px-14 py-5">
      <div className="border p-4 rounded-xl mb-5">
      <div className="flex flex-wrap justify-between  px-10">
        {/* البحث */}
        <TextField
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="ابحث في الأخبار"
          size="small"
          variant="outlined"
          sx={{
            width: "25%",
            "& .MuiOutlinedInput-root": {
              borderRadius: "12px", 
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
        <FormControl size="small" sx={{ width: "25%" }}>
          <Select
            value={category}
            displayEmpty
            onChange={(e) => setCategory(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="">
              <em>حسب الفئة</em>
            </MenuItem>
            <MenuItem value="1">Test 1</MenuItem>
            <MenuItem value="2">Test 2</MenuItem>
          </Select>
        </FormControl>

        {/* الفروع */}
        <FormControl size="small" sx={{ width: "25%" }}>
          <Select
            value={branch}
            displayEmpty
            onChange={(e) => setBranch(e.target.value)}
            sx={{ borderRadius: "12px" }}
          >
            <MenuItem value="">
              <em>كل الفروع</em>
            </MenuItem>
            <MenuItem value="branch1">فرع 1</MenuItem>
            <MenuItem value="branch2">فرع 2</MenuItem>
          </Select>
        </FormControl>

        {/* الأنشطة */}
        <FormControl size="small" sx={{ width: "25%" }}>
          <Select
            value={activity}
            displayEmpty
            onChange={(e) => setActivity(e.target.value)}
            sx={{ borderRadius: "12px" }}
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


      {/* 📦 Content */}
      <div className="flex flex-wrap ">

        <div className="w-1/2 border bg-white rounded-2xl overflow-hidden shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1530549387789-4c1017266635"
            alt="swimming"
            className="w-full h-56 object-cover"
          />

          <div className="p-4">
            <span className="text-xs text-green-600">30 مايو 2025</span>

            <h2 className="font-bold text-lg mt-2 mb-2">
              افتتاح أكاديمية السباحة — التسجيل متاح الآن
            </h2>

            <p className="text-sm text-gray-500 mb-4">
              فرصة لتعليم مهارات السباحة للأطفال والكبار مع مدربين محترفين
            </p>

            <div className="flex gap-3">
              <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] text-white px-4 py-2 rounded-xl text-sm">
                قراءة المزيد
              </button>

              <button className="border px-4 py-2 rounded-xl text-sm">
                حجز
              </button>
            </div>
          </div>
        </div>
   <div className="w-1/2 ps-5  ">
 {news.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center  w-full border p-4 rounded-xl my-2"
            >
              <div>
                <p className="text-sm font-semibold">{item.title}</p>
                <span className="text-xs text-gray-400">
                  {item.date}
                </span>
              </div>

              <button className="bg-gradient-to-r from-[#08AC85DB] to-[#00786F] border p-3 text-white rounded-2xl text-xs flex items-center gap-1">
                قراءة المزيد <FiArrowUpRight />
              </button>
            </div>
          ))}   </div>

   
        </div>
      
        </div>

  );
};

export default Search_News;