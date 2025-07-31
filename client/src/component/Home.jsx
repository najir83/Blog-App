import React, { useState, useEffect, useMemo } from "react";
import AxiosInstance from "../config/AxiosInstance";
import useStore from "../store";
import SkeletonCard from "./SkeletonCard";
import { useNavigate } from "react-router-dom";
import { toast, Bounce } from "react-toastify";
import Select from "react-select";

const options = [
  { value: "time", label: "Sort by -Time" },
  { value: "likes", label: "Sort by -Likes" },
];

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [sortBy, setSortBy] = useState("time");
  const [Mp, setMp] = useState(new Map());
  const [likingMap, setLikingMap] = useState(new Map());
  const { user } = useStore();
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
    const fetchBlogs = async () => {
      try {
        const res = await AxiosInstance.get("/");
        setBlogs(res.data.blogs || []);
      } catch (err) {
        toast.error(err.response?.message || "Internal server error", {
          position: "top-right",
          autoClose: 2500,
          theme: "light",
          transition: Bounce,
        });
      }
    };
    fetchBlogs();
  }, []);

  useEffect(() => {
    const fetchLikedBlogs = async () => {
      if (!user) return;
      try {
        const res = await AxiosInstance.get(`/blog/bloglikes/${user._id}`);
        const likedMap = new Map();
        res.data.LikedBlog.forEach((e) => likedMap.set(e.blog_id, 0));
        setMp(likedMap);
      } catch (err) {
        console.error("Failed to fetch liked blogs", err);
      }
    };
    fetchLikedBlogs();
  }, [user]);

  const sortedBlogs = useMemo(() => {
    if (!blogs) return [];
    return [...blogs].sort((a, b) => {
      if (sortBy === "likes") return b.likes - a.likes;
      return new Date(b.createdAt) - new Date(a.createdAt);
    });
  }, [blogs, sortBy]);

  const handleBlogClick = (i) => {
    navigate(`/show/${sortedBlogs[i]._id}`);
  };

  const handleHeartClick = async (id) => {
    if (Mp.has(id) || likingMap.get(id)) return;

    if (!user) {
      toast.warn("Please Login", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
      return;
    }

    const newLikingMap = new Map(likingMap);
    newLikingMap.set(id, true);
    setLikingMap(newLikingMap);

    const newMp = new Map(Mp);
    newMp.set(id, 1);
    setMp(newMp);

    toast.success("Like added", {
      position: "top-right",
      autoClose: 2500,
      theme: "light",
      transition: Bounce,
    });

    try {
      await AxiosInstance.post("/blog/like", {
        blog_id: id,
        likes_by: user._id,
      });
    } catch (err) {
      toast.error("Unable to process like", {
        position: "top-right",
        autoClose: 2500,
        theme: "light",
        transition: Bounce,
      });
      newMp.delete(id);
      setMp(newMp);
    } finally {
      newLikingMap.delete(id);
      setLikingMap(newLikingMap);
    }
  };

  return (
    <div className="min-h-[84vh]">
      <div className="full">
        <Select
          options={options}
          value={options.find((o) => o.value === sortBy)}
          onChange={(option) => setSortBy(option.value)}
          placeholder="Sort by"
          className="w-60 ml-10 text-black lg:ml-88 pt-2 react-select-container"
          classNamePrefix="react-select"
        />
      </div>

      <div className="container px-5 gap-7 grid grid-cols-1 md:grid-cols-3 pb-10 lg:pb-15 lg:px-15 rounded-2xl mx-auto w-full">
        {!blogs
          ? Array.from({ length: 6 }, (_, i) => <SkeletonCard key={i} />)
          : sortedBlogs.map((e, i) => {
              const alreadyLiked = Mp.has(e._id);
              const isLiking = likingMap.get(e._id);

              return (
                <div
                  key={e._id}
                  className={`shadow-xl themeChangePlate rounded-2xl p-3 ${
                    i === 0 ? "pt-0" : "pt-3"
                  } pb-5 m-2`}
                >
                  <img
                    src={e.image || "/fallback.jpg"}
                    loading="lazy"
                    className="w-100 mx-auto rounded-2xl h-60 p-2 object-cover"
                    alt="Blog"
                  />
                  <p className="p-3 text-lg font-serif text-gray-500">
                    {getLocalTime(e.createdAt)}
                  </p>
                  <h1 className="text-left capitalize text-xl font-bold p-2">
                    {e.title}
                  </h1>
                  <div className="text-gray-800 themeChangePlate w-full px-2 py-3 blog-content line-clamp-3">
                    {e.description ||
                      e.content.replace(/<[^>]+>/g, "").slice(0, 200)}
                    ...
                  </div>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => handleBlogClick(i)}
                      className="p-2 btP hover:bg-blue-700 cursor-pointer px-3 my-3 flex bg-blue-500 text-white font-semibold rounded-2xl"
                    >
                      Read More
                      <img
                        className="w-6 h-6 ml-2"
                        src="/right-up.png"
                        alt="arrow"
                      />
                    </button>
                    <i
                      onClick={() => handleHeartClick(e._id)}
                      className={`fa-${
                        alreadyLiked ? "solid" : "regular"
                      } fa-heart ${alreadyLiked ? "text-pink-600" : ""} ${
                        isLiking ? "pointer-events-none" : ""
                      } cursor-pointer`}
                    >
                      {" "}
                      {e.likes + (alreadyLiked ? Mp.get(e._id) : 0)}
                    </i>
                  </div>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Home;
