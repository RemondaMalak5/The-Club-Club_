import { RouterProvider } from "react-router-dom";
import { router } from "./Router/routes";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

function App() {
  const { i18n } = useTranslation();

  useEffect(() => {
    document.documentElement.dir =
      i18n.language === "ar" ? "rtl" : "ltr";
  }, [i18n.language]);

  return <RouterProvider router={router} />;
}

export default App;