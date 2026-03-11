import { createBrowserRouter } from "react-router-dom";
import Main_layout from "../Layout/Main_layout";
import Home from "../Pages/Home";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main_layout/>,
    children: [
      { index: true, element: <Home/> },
  
    ]
  }
]);