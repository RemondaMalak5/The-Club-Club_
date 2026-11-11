import React from 'react'
import { usePopup } from '../../context/PopupContext';
import { extractApiErrorMessage } from '../../utils/apiError';

const Shared_Popup = () => {
      const { popup, closePopup } = usePopup();
  if (!popup.open) return null;

  const safeTitle =
    typeof popup.title === "object" && popup.title !== null && !React.isValidElement(popup.title)
      ? extractApiErrorMessage(popup.title, "")
      : popup.title;

  const safeMessage =
    typeof popup.message === "object" && popup.message !== null && !React.isValidElement(popup.message)
      ? extractApiErrorMessage(popup.message, "")
      : popup.message;

  return (
      <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg flex flex-col justify-center items-center gap-3">
        <span className='p-5 bg-[#00786F] text-white rounded-full text-[18px] '>
            {popup.icon}
        </span>
        <h2 className="text-xl font-bold mb-3">
          {safeTitle}
        </h2>

        <p className="text-[#6A7282] mb-6">
          {safeMessage}
        </p>

       {(popup.confirmText || popup.cancelText) && (
  <div className="flex gap-3 w-full">
    {popup.confirmText && (
      <button
        onClick={() => {
          popup.onConfirm?.();
          closePopup();
        }}
        className="bg-[#00786F] text-white px-4 py-2 rounded-lg w-1/2"
      >
        {popup.confirmText}
      </button>
    )}

    {popup.cancelText && (
      <button
        onClick={closePopup}
        className="border px-4 py-2 rounded-lg w-1/2"
      >
        {popup.cancelText}
      </button>
    )}
  </div>
)}

      </div>
    </div>
  );
};

export default Shared_Popup