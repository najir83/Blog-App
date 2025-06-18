import React, { useState, useEffect, useMemo } from "react";
import AxiosInstance from "../config/AxiosInstance";
import useStore from "../store";
import Loading from "./Loading";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isLoading, setIsLoading] = useState(0);
  const [sortBy, setSortBy] = useState("likes");
  const { setShowBLog, showblogId } = useStore();
  const navigate = useNavigate();

  const getLocalTime = (s) => {
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    return new Date(s)
      .toLocaleString("en-GB", options)
      .replace(/, /g, " • ")
      .replace(/ /g, " ");
  };

  useEffect(() => {
    const getBlogs = async () => {
      setIsLoading(1);
      try {
        const res = await AxiosInstance.get("/");
        setBlogs(res.data.blogs);
      } catch (err) {
        toast.error(err.response?.message || "Internal server error", {
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
        setIsLoading(0);
      }
    };
    getBlogs();
  }, []);

  const sortedBlogs = useMemo(() => {
    if (!blogs) return [];
    return [...blogs].sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      if (sortBy === "time")
        return new Date(b.createdAt) - new Date(a.createdAt);

      return 0;
    });
  }, [blogs, sortBy]);

  const handleBlogClick = (i) => {
    navigate(`/show/${sortedBlogs[i]._id}`);
  };

  return isLoading ? (
    <Loading />
  ) : (
    <div className="min-h-[84vh]">
      <div className="container px-5 gap-7 grid grid-cols-1 md:grid-cols-3 pb-10 lg:pb:15 lg:px-15 rounded-2xl mx-auto w-full">
        <select
          className="w-24 lg:h-13 fixed top-17 lg:top-23 left-1 md:left-70 mt-1 p-3 rounded-2xl shadow-lg cursor-pointer hover:font-semibold z-10 bg-gradient-to-bl"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option disabled>sort by</option>
          <option value="likes">Likes</option>
          <option value="time">Time</option>
        </select>

        {sortedBlogs?.map((e, i) => (
          <div
            key={i}
            className={`shadow-xl rounded-2xl p-3 ${
              i === 0 ? "pt-10" : "pt-3"
            } pb-5 m-2`}
          >
            <img
              src={e.image}
              className="w-100 mx-auto rounded-2xl h-60 p-2"
              alt="Blog Image"
            />
            <p className="p-3 text-lg font-serif text-gray-500">
              {getLocalTime(e.createdAt)}
            </p>
            <h1 className="text-left capitalize text-xl font-bold p-2">
              {e.title}
            </h1>
            <div
              className="text-gray-800 w-full px-2 py-3 blog-content line-clamp-3"
              dangerouslySetInnerHTML={{ __html: e.content }}
            ></div>
            <div className="flex justify-between items-center">
              <button
                onClick={() => handleBlogClick(i)}
                className="p-2 hover:bg-blue-700 cursor-pointer px-3 my-3 flex bg-blue-500 text-white font-semibold rounded-2xl"
              >
                Read More{" "}
                <img
                  className="w-6 h-6 text-white"
                  src="/right-up.png"
                  alt="arrow"
                />
              </button>
              <i
                onClick={() => handleBlogClick(i)}
                className="fa-regular cursor-pointer fa-heart"
              >
                {" "}
                {e.likes}
              </i>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
