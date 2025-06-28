import React from "react";
import useStore from "../store";

const AddBlogSkeleton = () => {
  const { theme } = useStore();

  const isDarkMode =
    theme === "dark" ||
    theme === "night" ||
    theme === "halloween" ||
    theme === "sunset";

  return (
    <div className="w-full p-2 mx-auto overflow-scroll min-h-[84vh]">
      <div className="animate-pulse container px-5 pb-10 lg:px-15 shadow-xl rounded-2xl mx-auto w-full">
        {/* Title Input Skeleton */}
        <div className="flex space-x-3 p-4 items-center">
          <div className="h-8 w-20 rounded bg-gray-400" />
          <div
            className={`h-10 rounded-lg w-[60vw] ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </div>

        {/* Image Upload Skeleton */}
        <div className="p-4 flex space-x-2 items-center">
          <div className="h-6 w-32 bg-gray-400 rounded" />
          {/* <div
            className={`h-10 w-40 rounded ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          /> */}
        </div>

        {/* Editor Skeleton */}
        <div className="px-4 mt-4">
          <div
            className={`${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            } h-[400px] lg:h-[600px] w-full rounded-xl`}
          />
        </div>

        {/* Button Skeleton */}
        <div className="flex justify-end mt-6 px-4">
          <div
            className={`h-10 w-28 rounded ${
              isDarkMode ? "bg-gray-700" : "bg-gray-300"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default AddBlogSkeleton;
