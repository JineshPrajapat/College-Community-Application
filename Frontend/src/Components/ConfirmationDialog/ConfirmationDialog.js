import React from "react";

const ConfirmationDialog = ({ message,buttonContent, onConfirm }) => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 z-50 flex items-center justify-center" onClick={() => onConfirm(false)}>
      <div className="bg-white rounded-lg p-6 shadow-lg w-80 md:w-[450px]">
        <h3 className="text-sm md:text-[16px] lg:text-lg font-sans font-semibold mb-4">{message}</h3>
        <div className="flex space-x-4 font-sans">
          <button className="bg-green-500 text-sm text-black  px-3 py-2 rounded hover:bg-green-400 transition duration-300" onClick={() => onConfirm(true)}>{`${buttonContent ? buttonContent : "Yes"}`}</button>
          <button className=" border-1 border-slate-700 text-sm text-slate-700 px-3 py-2 rounded hover:text-white hover:bg-slate-700 transition duration-300" onClick={() => onConfirm(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationDialog;
