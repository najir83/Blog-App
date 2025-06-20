import React, { useEffect, useState, useRef } from "react";
import image from "/defaultPic.jpg";
import useStore from "../store";
import { toast, Bounce } from "react-toastify";
import AxiosInstance from "../config/AxiosInstance";
const Settings = () => {
  const { user, setSpin, updateProfilePicture } = useStore();
  //   console.log(user)
  const downarrow = "fa-solid fa-angle-down";
  const [showThemes, setShowThemes] = useState(0);
  const fileInputRef = useRef();

  const handleImageClick = () => {
     if (!user) {
      toast.warn("Please login", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      toast.warn("Select a valid picture", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }
    if (!user) {
      toast.warn("Please login", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const formData = new FormData();
    formData.append("profile_pic", file);

    try {
      setSpin(1);
      const res = await AxiosInstance.post("/user/update-profile", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Profile updated successfully", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // console.log(res.data.newUrl);
      updateProfilePicture(res.data.newUrl);
      // Optionally: Update user profile pic in store or reload
    } catch (err) {
      toast.error("Unable to process updation", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // console.error("Upload failed", err);
    } finally {
      setSpin(0);
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  const getLocalTime = (s) => {
    // console.log(user?.createdAt)
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
    };

    return new Date(s)
      .toLocaleString("en-GB", options)
      .replace(/, /g, " • ")
      .replace(/ /g, " ");
  };
  return (
    <div className="min-h-[84vh] ">
      <div className="w-[95vw] lg:w-[25vw] min-h-[70vh] mx-auto  flex justify-center  h-full">
        <div className=" w-200 flex flex-col rounded-2xl justify-around  shadow-xl ">
          <div className=" p-3 flex  justify-between">
            <div className="w-full flex flex-col items-center">
              <img
                src={user?.profilePicture ? user?.profilePicture : image}
                className="cursor-pointer lg:w-40 lg:h-40 w-30 h-30 p-3 rounded-full shadow-lg"
                alt="user"
                onClick={handleImageClick}
              />
              <p className="p-2 text-sm md:text-lg">
                Click the picture to update it
              </p>
              {/* Hidden File Input */}
              <input
                type="file"
                ref={fileInputRef}
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleFileChange}
              />
            </div>
          </div>
          <div className="w-full  py-5 px-10 pt-10 ">
            <h3 className="p-3 opacity-56">
              {" "}
              <i className="fa-regular fa-registered"></i> Registered :{" "}
              {getLocalTime(user?.createdAt)}
            </h3>
            <div className="p-3 flex gap-4 text-sm lg:text-lg font-bold     md:text-xl  items-center">
              <i className="fa-regular fa-user"></i> Name
              <input
                disabled
                className="input p-1 rounded-xl  lg:p-6 text-sm lg:text-lg font-semibold pl-5"
                value={user?.name}
              ></input>
            </div>
            <div className="p-3 flex text-sm gap-4 lg:text-lg font-bold     md:text-xl  items-center">
              <i className="fa-regular fa-envelope"></i> Email
              <input
                disabled
                className="input text-sm p-1 lg:p-6 rounded-xl lg:text-lg font-semibold pl-5"
                value={user?.email}
              ></input>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
