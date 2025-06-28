import React from "react";
import useStore from "../store";
const SeeBlogSkeleton = () => {
  const { theme } = useStore();

  const isDarkMode =
    theme === "dark" ||
    theme === "night" ||
    theme === "halloween" ||
    theme === "sunset";

  return (
    <div className=" w-full min-h-[85vh] max-h-full ">
      <div className=" animate-pulse container px-5  pb-10 lg:pb:15 lg:px-30 shadow-xl rounded-2xl mx-auto w-full">
        <div className=" flex flex-col  justify-center items-center p-5 gap-5 ">
          <div
            className={`w-150 h-70 lg:w-200 lg:h-100 rounded-xl ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } h-60 w-full rounded-2xl mb-4`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-600" : "bg-gray-200"
            } h-4 rounded w-1/5 mb-3 mx-3 mr-60 md:mr-262`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-600" : "bg-gray-300"
            } h-5 rounded w-3/4 mb-4 mx-3 mr-21 md:mr-100`}
          />

          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-2 w-2/3 mr-25 md:mr-120`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-2 w-2/3 mr-25 md:mr-120`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-2 w-2/3 mr-25 md:mr-120`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-2 w-2/3 mr-25 md:mr-120`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-3 w-full p-5 mt-5 lg:mr-20`}
          />
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-200"
            } h-3 w-1/6 mr-65 md:mr-280`}
          />
        </div>
      </div>
    </div>
  );
};

export default SeeBlogSkeleton;
