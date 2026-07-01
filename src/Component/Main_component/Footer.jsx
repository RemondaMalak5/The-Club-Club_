import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaWhatsapp,
  FaXTwitter,
} from "react-icons/fa6";
import { assets } from "../../assets/assets";
import Services from "./../../Pages/Services";
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Social_Media from "../Shared_Component/Social_Media";
const Footer = () => {
  const { id } = useParams();

  const { t } = useTranslation();
  const contact = [{ value: "16647" }, { value: "info@theclub.com.eg" }];
  const branches = [
    { value: t("branch_6_october") , link: `/about-branches/${id}` },
    { value: t("branch_shiraton") , link: `/about-branches/${id}` },
    { value: t("branch_capital") , link: `/about-branches/${id}` },
  ];
  const quick_links = [
    { value: t("home") },
    { value: t("about"), link: "/about" },
    { value: t("branches"), link: "/branches" },
    { value: t("news"), link: "/news" },
    { value: t("champions"), link: "/champions" },
    { value: t("services"), link: "/services" },
    { value: t("academy"), link: "/academy" },
    { value: t("contact"), link: "/contact" },
  ];
  const services_club = [
    { value: t("book_courts"), link: "/" },
    { value: t("membership"), link: "/services" },
    { value: t("trips"), link: "/" },
    { value: t("tournaments"), link: "/" },
    { value: t("events"), link: "/" },
    { value: t("academies"), link: "/academy" },
  ];
  const Services_member = [
    { value: t("login"), link: "/login" },
    { value: t("register"), link: "/register" },
    { value: t("manage_membership"), link: "/" },
    { value: t("book_activities"), link: "/" },
  ];
  const bottom = [
    { value: t("privacy_policy") },
    { value: t("terms_and_conditions") },
    { value: t("site_map") },
  ];
  return (
    <footer className="bg-gradient-to-r from-[#1aa085] to-[#0f7c6c] text-white mt-10">
      <div className="xl:ps-20 px-5 py-10 flex flex-wrap  justify-between">
        <div className="xl:w-[20%] w-full ">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <img
              src={assets.theClub_Logo}
              alt={t("club_name")}
              className="w-20 h-20"
              loading="lazy"
            />
            <h2 className="font-bold text-lg">{t("club_name")}</h2>
          </div>

          <p className="text-sm leading-6 text-gray-200">
            {t("club_description")}
          </p>
          <p className="py-5 font-bold"> {t("follow_us")} </p>
          {/* Social */}
          <Social_Media />
        </div>

        <div className="xl:w-[80%] w-full flex flex-wrap justify-center xl:ps-10 ">
          <div className="xl:w-1/5 md:w-1/2 w-full ">
            <h3 className="font-bold text-[20px] mb-4">{t("contact")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {contact.map((item, index) => (
                <li key={index}>{item.value}</li>
              ))}
            </ul>
          </div>

          {/* Branches */}
          <div className="xl:w-1/5 md:w-1/2 w-full  ">
            <h3 className="font-bold text-[20px] mb-4">{t("branches")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {branches.map((item) => (
                <li
                  key={item.id}
                  className="hover:text-white text-[#FFFFFFCC] cursor-pointer transition"
                >
                  <Link
                    to={item.link}
                    className="flex items-center gap-1"
                  >
                    <span>
                      <MdOutlineKeyboardArrowLeft />
                    </span>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="xl:w-1/5 md:w-1/2 w-full  ">
            <h3 className="font-bold text-[20px] mb-4">{t("quick_links")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {quick_links.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                  <Link to={item.link} className="flex items-center gap-1">
                    <span>
                      {" "}
                      <MdOutlineKeyboardArrowLeft />
                    </span>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="xl:w-1/5 md:w-1/2 w-full  ">
            <h3 className="font-bold text-[20px] mb-4">{t("club_services")}</h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {services_club.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                  <Link to={item.link} className="flex items-center gap-1">
                    <span>
                      {" "}
                      <MdOutlineKeyboardArrowLeft />
                    </span>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="xl:w-1/5 md:w-1/2 w-full  ">
            <h3 className="font-bold text-[20px] mb-4">
              {t("member_services")}
            </h3>
            <ul className="space-y-2 text-sm text-gray-200">
              {Services_member.map((item, index) => (
                <li
                  key={index}
                  className="hover:text-white cursor-pointer transition flex items-center gap-1 text-[#FFFFFFCC]"
                >
                  <Link to={item.link} className="flex items-center gap-1">
                    <span>
                      {" "}
                      <MdOutlineKeyboardArrowLeft />
                    </span>
                    {item.value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#0c5f54] flex flex-wrap justify-between py-5 px-12 text-[12px] text-[#FFFFFFB2]  fonr-regular">
        <span className="flex justify-start">
          {bottom.map(
            (item, index) =>
              item.value && (
                <p key={index} className="mx-2 flex items-center gap-3">
                  {item.value}
                  {index !== bottom.length - 1 && <span>|</span>}
                </p>
              ),
          )}
        </span>
        <span className="flex justify-end">{t("site_copyright")}</span>
      </div>
    </footer>
  );
};

export default Footer;
