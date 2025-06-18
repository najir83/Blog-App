import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import useStore from "../store";
import AxiosInstance from "../config/AxiosInstance";
const Nav = () => {
  const { user, setLogin, setSpin } = useStore();
  const [showLog, setshowLog] = useState(0);
  const uparrow = "fa-solid fa-angle-up";
  const downarrow = "fa-solid fa-angle-down";
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
    `hover:font-bold ${isActive ? " text-red-700 font-bold" : ""}`;

  return (
    <div className="sticky top-0 w-full h-[8vh] flex justify-between px-4 lg:px-73 items-center bg-[#077A7D]">
      <Link to="/" className="font-bold text-xl">
        <span className="text-2xl text-[#7AE2CF]">&lt;</span> Blogify{" "}
        <span className="text-2xl text-[#7AE2CF]">/&gt;</span>
      </Link>

      <ul className=" select-none flex space-x-3 lg:space-x-6 items-center">
        <NavLink to="/" className={navLinkClass}>
          Home
        </NavLink>

        {!user && (
          <>
            <NavLink to="/signup" className={navLinkClass}>
              SignUp
            </NavLink>
            <NavLink to="/login" className={navLinkClass}>
              Login
            </NavLink>
          </>
        )}

        {user && (
         <NavLink to="/addblog" className={navLinkClass}>
              NewBlog
            </NavLink>
          
        )}

        <li className="flex flex-col items-center justify-center relative">
          <div className="flex items-center space-x-2">
            <img
              className="w-10 h-10 rounded-full"
              src="/defaultPic.jpg"
              alt="default"
            />
            <i
              onClick={() => setshowLog((prev) => !prev)}
              className={`cursor-pointer text-lg ${
                showLog ? uparrow : downarrow
              }`}
            ></i>
          </div>
        </li>
        <div
          hidden={!showLog}
          className="select-none transition-all duration-300 ease-in-out   w-35 lg:w-45 p-5 lg:p-10   pt-2 absolute right-15 top-17 lg:right-90 rounded-md  flex flex-col gap-3 items-center bg-[#7AE2CF] z-20"
        >
          <div className="border-b-1 w-full text-center p-2 ">
            {user && <p className="hover:font-bold">{user.name}</p>}
          </div>
          <NavLink to="/setting" className={navLinkClass}>
            Settings
          </NavLink>
          {user && (
            <button
              onClick={handleLogout}
              className="hover:font-bold p-3 py-2 bg-amber-700 rounded-2xl cursor-pointer hover:bg-amber-800 text-white"
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
