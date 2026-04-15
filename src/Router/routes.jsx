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
      {path: "contact", element: <Contact_us/>}

    ]
  }
]);


