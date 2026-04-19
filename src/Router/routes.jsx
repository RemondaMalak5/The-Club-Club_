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
      {path: "academy", element: <Academy/>},
      {path: "contact", element: <Contact_us/>} ,
      {path: "register", element: <Register/>},
      {path: "member-register", element: <Member_Register/>},
      {path: "confirm-data", element: <Confirm_data/>},
      {path: "send-otp", element: <Send_Otp/>}
    ]
  }
]);


