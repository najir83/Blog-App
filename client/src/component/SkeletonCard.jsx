import React from "react";
import useStore from "../store"; // adjust path as needed

const SkeletonCard = () => {
  const { theme } = useStore();

  const isDarkMode =
    theme === "dark" ||
    theme === "night" ||
    theme === "halloween" ||
    theme === "sunset";

  return (
    <div className="animate-pulse shadow-xl themeChangePlate rounded-2xl p-3 pt-3 pb-5 m-2">
      {/* Image Placeholder */}
      <div
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-gray-300"
        } h-60 w-full rounded-2xl mb-4`}
      />

      {/* Time Placeholder */}
      <div
        className={`${
          isDarkMode ? "bg-gray-600" : "bg-gray-200"
        } h-4 rounded w-1/2 mb-3 mx-3`}
      />

      {/* Title Placeholder */}
      <div
        className={`${
          isDarkMode ? "bg-gray-600" : "bg-gray-300"
        } h-5 rounded w-3/4 mb-4 mx-3`}
      />

      {/* Content Lines */}
      <div
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        } h-4 rounded w-full mb-1 mx-3`}
      />
      <div
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        } h-4 rounded w-5/6 mb-1 mx-3`}
      />
      <div
        className={`${
          isDarkMode ? "bg-gray-700" : "bg-gray-200"
        } h-4 rounded w-2/3 mb-4 mx-3`}
      />

      {/* Button + Heart */}
      <div className="flex justify-between items-center px-3">
        <div
          className={`${
            isDarkMode ? "bg-gray-600" : "bg-gray-300"
          } h-8 w-20 rounded-xl`}
        />
        <div
          className={`${
            isDarkMode ? "bg-gray-700" : "bg-gray-300"
          } h-6 w-6 rounded-full`}
        />
      </div>
    </div>
  );
};

export default SkeletonCard;
