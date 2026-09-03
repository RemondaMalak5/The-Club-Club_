import { createBrowserRouter } from "react-router-dom";
import Main_layout from "../Layout/Main_layout";
import Home from "../Pages/Home";
import Branches from "../Pages/Branches";
import News from "../Pages/News";
import AboutUs from "../Pages/AboutUs";
import Champions from "../Pages/Champions";
import Services from "../Pages/Services";
import Academy from "../Pages/Academy";
import Contact_us from "../Pages/Contact_us";
import Register from "../Component/Registiration/Register";
import Member_Register from "../Component/Registiration/Member/Member_Register";
import Confirm_data from "../Component/Registiration/Member/Confirm_data";
import Send_Otp from "../Component/Registiration/Member/Send_Otp";
import Register_Geust from "../Component/Registiration/New_Member/Register_Geust";
import Otp_Geust from "../Component/Registiration/New_Member/Otp_Geust";
import  Account_setup  from "../Component/Registiration/New_Member/Account_setup";
import Account_setup_member from "../Component/Registiration/Member/Account_setup_member";
import Login from "../Component/Login/Login";
import Profile from "../Pages/Profile";
import Header_academy_details from "../Component/Academy_Component/Academy_details/Header_academy_details";
import Header_services_details from "../Component/Services_Component/Services_Details/Header_services_details";
import Champin_header from "../Component/Championship_component/champinship_details/Champin_header";
import News_details from "../Component/News_component/News_Details/News_details";
import About_branches from "../Pages/About_branches";
import Cheak_Mail from "../Component/Forget_pass/Cheak_Mail";
import Cheak_Otp from "../Component/Forget_pass/Cheak_Otp";
import Reset_pass from "../Component/Forget_pass/Reset_pass";
import Profile_Guest from "../Pages/Profile_Guest";
import Loyalty_point from "../Component/Home_component/Loyalty_point";
import Loyalty_details from "../Component/Lotalty_component/Loyalty_details";
import Profile_trainer from "../Pages/Profile_trainer";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "branches", element: <Branches /> },
      { path: "news", element: <News /> },
      { path: "about", element: <AboutUs /> },
      { path: "champions", element: <Champions /> },
      { path: "services", element: <Services /> },
      { path: "services/:id", element: <Header_services_details /> },
      {path: "academy", element: <Academy/>},
      {path: "contact", element: <Contact_us/>} ,
      {path: "register", element: <Register/>},
      {path: "member-register", element: <Member_Register/>},
      {path: "confirm-data", element: <Confirm_data/>},
      {path: "send-otp", element: <Send_Otp/>},
      {path: "new-guest", element: <Register_Geust/>},
      {path: "otp-guest", element: <Otp_Geust/>},
      {path: "account-setup", element: <Account_setup/>} ,
      {path:"account-setup-member", element: <Account_setup_member/>} ,
      {path:"login", element: <Login/>},
      {path:"profile", element: <Profile/>},
      {path:"academy/:id", element: <Header_academy_details/>} ,
      {path:"champions/:id", element: <Champin_header/>} ,
      {path:"news/:id", element: <News_details/>} ,
      {path:"about-branches/:id", element: <About_branches/>},
      {path:"forget-pass" , element:<Cheak_Mail/>},
      {path:"forget-otp", element:<Cheak_Otp/>},
      {path:"reset-pass", element:<Reset_pass/>},
      {path: "profile-guest" , element: <Profile_Guest/>},
      {path:"loyalty" , element:<Loyalty_point/>},
      {path:"loyalty-details/:id" , element:<Loyalty_details/>} ,
      {  path:"/profile-trainer/:id", element: <Profile_trainer/>}
    ]
  }
]);


