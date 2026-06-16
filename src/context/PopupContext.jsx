import { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState({
    icon:"",
    open: false,
    title: "",
    message: "",
    confirmText: "تأكيد",
    cancelText: "إلغاء",
    onConfirm: null,
  });

  const showPopup = ({
    icon,
    title,
    message,
    confirmText = "تأكيد",
    cancelText = "إلغاء",
    onConfirm,
  }) => {
    setPopup({
     icon,
      open: true,
      title,
      message,
      confirmText,
      cancelText,
      onConfirm,
    });
  };

  const closePopup = () => {
    setPopup((prev) => ({
      ...prev,
      open: false,
    }));
  };

  return (
    <PopupContext.Provider
      value={{
        popup,
        showPopup,
        closePopup,
      }}
    >
      {children}
    </PopupContext.Provider>
  );
};

export const usePopup = () => useContext(PopupContext);