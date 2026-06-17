import React from 'react'
import { usePopup } from '../../context/PopupContext';

const Shared_Popup = () => {
      const { popup, closePopup } = usePopup();
  if (!popup.open) return null;

  return (
      <div className="fixed inset-0 bg-black/40 z-[9999] flex items-center justify-center">
      <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-lg flex flex-col justify-center items-center gap-3">
        <span className='p-5 bg-[#00786F] text-white rounded-full text-[18px] '>
            {popup.icon}
        </span>
        <h2 className="text-xl font-bold mb-3">
          {popup.title}
        </h2>

        <p className="text-[#6A7282] mb-6">
          {popup.message}
        </p>

        <div className="flex  gap-3 w-full">
          <button
            onClick={() => {
              popup.onConfirm?.();
              closePopup();
            }}
            className="bg-[#00786F] text-white px-4 py-2 rounded-lg w-1/2"
          >
            {popup.confirmText}
          </button>
          
           <button
            onClick={closePopup}
            className="border px-4 py-2 rounded-lg w-1/2"
          >
            {popup.cancelText}
          </button>

        </div>

      </div>
    </div>
  );
};

export default Shared_Popup