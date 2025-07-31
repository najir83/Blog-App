import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import useStore from "../store";
import AxiosInstance from "../config/AxiosInstance";
import ThemeIcon from "./ThemeIcom";
import { toast, Bounce } from "react-toastify";

const Nav = () => {
  const {
    user,
    setLogin,
    theme,
    showThemes,
    setShowThemes,
    setTheme,
    setSpin,
    showLog,
    setshowLog,
  } = useStore();

  const uparrow = "fa-solid fa-angle-up";
  const downarrow = "fa-solid fa-angle-down";
  const bars = "fa-solid fa-ellipsis-vertical";
  const cross = "fa-solid fa-xmark";
  // <i class="fa-solid fa-ellipsis-vertical"></i>

  // console.log(user);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const themes = [
    "light",
    "cupcake",
    "valentine",
    "winter",
    "garden",
    "lofi",
    "dark",
    "night",
    "halloween",
    "sunset",
  ];
  const isDark =
    theme === "dark" ||
    theme === "halloween" ||
    theme === "night" ||
    theme === "sunset";

  // console.log(user)
  {
    /* <i class="fa-solid fa-angle-up"></i> */
  }
  const handleLogout = async () => {
    // alert("Logged out");
    setSpin(1);

    try {
      const res = await AxiosInstance.post("/user/logout");
      setLogin(0);
      toast.success("Logout Successful", {
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
    } catch (e) {
      toast.error("Logout unsuccessful", {
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
    } finally {
      setSpin(0);
    }
  };

  const navLinkClass = ({ isActive }) =>
    `hover:font-bold p-2  rounded-xl  ${
      isActive
        ? `${isDark ? "bg-gray-700" : "bg-gray-200"} text-red-700 font-bold`
        : ""
    }`;

  return (
    <div className="top-0  w-full h-[8vh] flex justify-between px-4 lg:px-73 items-center bg-[#077A7D] ip2">
      <Link to="/" className="font-bold text-xl">
        <span className="text-2xl text-[#7AE2CF]">&lt;</span> Blogify{" "}
        <span className="text-2xl text-[#7AE2CF]">/&gt;</span>
      </Link>

      <ul className="  select-none flex space-x-3 lg:space-x-6 items-center">
        {!isMobile && (
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>
        )}

        {!user && !isMobile && (
          <>
            <NavLink to="/signup" className={navLinkClass}>
              SignUp
            </NavLink>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </>
        )}

        {user && !isMobile && (
          <NavLink to="/addblog" className={navLinkClass}>
            New Blog
          </NavLink>
        )}
        <div
          onClick={() => {
            if (!showThemes) {
              if (showLog) setshowLog(0);
            }
            setShowThemes(!showThemes);
          }}
          className={`md:text-lg ${
            isDark ? "hover:bg-gray-700" : "hover:bg-gray-200"
          } lg:h-10 h-10 rounded-2xl hover:font-semibold ${
            showThemes ? (isDark ? "bg-gray-700" : "bg-gray-200") : ""
          } p-3 flex gap-2 items-center  cursor-pointer `}
        >
          <ThemeIcon /> <i className={showThemes ? uparrow : downarrow}></i>
        </div>
        <div
          hidden={!showThemes}
          className=" p-3 themeChangePlate absolute w-70 right-0 top-20 lg:right-94 lg:top-25 select-none z-10  rounded-2xl shadow-lg bg-gray-300 "
        >
          <h4 className="font-semibold">Theme</h4>
          {themes.map((e, i) => (
            <h5
              key={i}
              onClick={() => setTheme(themes[i])}
              className="flex justify-between px-4 py-2 cursor-pointer hover:font-semibold"
            >
              {e} {theme == e && <i className="fa-solid fa-check"></i>}
            </h5>
          ))}
        </div>

        <li className="flex flex-col items-center justify-center ">
          <div className="flex items-center space-x-2">
            <img
              onClick={() => {
                if (!showLog) {
                  setShowThemes(0);
                }
                setshowLog((prev) => !prev);
              }}
              className="w-10 h-10 cursor-pointer rounded-full"
              src={user?.profilePicture || "/defaultPic.jpg"}
              alt="default"
            />
            {/* <i
              onClick={() => {
                if (!showLog) {
                  setShowThemes(0);
                }
                setshowLog((prev) => !prev);
              }}
              className={`cursor-pointer text-lg ${showLog ? cross : bars}`}
            ></i> */}
          </div>
        </li>
        <div
          onClick={() => {
            if (!showLog) {
              setShowThemes(0);
            }
            setshowLog((prev) => !prev);
          }}
          hidden={!showLog}
          className={`select-none   w-60 lg:w-60 p-5 lg:p-4   pt-2 absolute right-0 top-17 lg:right-75 lg:top-22  flex flex-col gap-3 lg:gap-4 items-center themeChangePlate rounded-b-2xl  bg-gray-300 z-[9999]`}
        >
          <div className="border-b-1 w-full text-center p-2 ">
            {user && <p className="hover:font-bold lg:text-xl">{user.name}</p>}
          </div>
          {isMobile && (
            <NavLink to="/" className={navLinkClass}>
              Home
            </NavLink>
          )}
          {!user && isMobile && (
            <>
              <NavLink to="/signup" className={navLinkClass}>
                SignUp
              </NavLink>
              <NavLink to="/login" className={navLinkClass}>
                Login
              </NavLink>
            </>
          )}

          {user && isMobile && (
            <NavLink to="/addblog" className={navLinkClass}>
              New Blog
            </NavLink>
          )}
          <NavLink to="/setting" className={navLinkClass}>
            Settings
          </NavLink>
          {user && (
            <button
              onClick={handleLogout}
              className="hover:font-bold p-3 lg:text-xl py-2 bg-amber-700 rounded-2xl cursor-pointer hover:bg-amber-800 text-white shadow-lg"
            >
              Logout
            </button>
          )}
        </div>
      </ul>
    </div>
  );
};

export default Nav;
