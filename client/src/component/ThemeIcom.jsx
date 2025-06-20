import React from "react";

const ThemeIcon = () => {
  return (
    <div className="w-6 h-6 p-1   flex items-center justify-center">
      <div className="grid grid-cols-2 grid-rows-2 gap-[2px]">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <div className="w-2 h-2 rounded-full bg-blue-500"></div>
        <div className="w-2 h-2 rounded-full bg-gray-500"></div>
        <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
      </div>
    </div>
  );
};

export default ThemeIcon;