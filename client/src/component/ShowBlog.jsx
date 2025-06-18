import { React, useEffect, useState } from "react";
import useStore from "../store";
import AxiosInstance from "../config/AxiosInstance";
import { Bounce, toast } from "react-toastify";
import { useParams } from "react-router-dom";

const ShowBlog = () => {
  const { user } = useStore();
  const { showblogId } = useParams();
  const [blog, setblog] = useState(null);
  const [comments, setComments] = useState(null);
  const [submitingComment, setSubmittingComment] = useState(0);
  const [showComment, setShowComment] = useState(0);
  const [addComment, setAddComment] = useState("");
  const [likes, setLikes] = useState(0);
  const [whoLikes, setWhoLikes] = useState(null);
  const [alreadyLikes, setAlreadyLikes] = useState(0);
  const [isLiking, setIsLiking] = useState(0);

  useEffect(() => {
    const getBLog = async () => {
      // console.log("call");

      try {
        const res = await AxiosInstance.get(`/blog/${showblogId}`);
        // console.log(res.data);
        setblog(res.data);
        const resComment = await AxiosInstance.get(
          `/blog/comments/${showblogId}`
        );
        // console.log(resComment.data.comments);
        setComments(resComment.data.comments.reverse());
        const LikesRes = await AxiosInstance.get(`/blog/like/${showblogId}`);
        // console.log(LikesRes.data.likes);

        setLikes(LikesRes.data.likes.length);
        // console.log(LikesRes.data.likes)
        LikesRes.data.likes.forEach(({ likes_by }) => {
          // console.log(_id);
          // console.log(likes_by._id,user?._id)
          if (likes_by._id === user?._id) {
            setAlreadyLikes(1);
          }
        });
      } catch (e) {
        console.log(e);
      }
    };

    getBLog();
    // console.log(showblogId);
  }, []);
  // console.log(blog?.blog);
  // console.log(user);
  const getLocalTime = (s) => {
    const options = {
      timeZone: "Asia/Kolkata",
      day: "2-digit",
      month: "short", // 'short' gives 'Jan', 'Feb', etc.
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit", // optional
      hour12: true, // use 12-hour format with AM/PM (optional)
    };

    const formattedData = new Date(s)
      .toLocaleString("en-GB", options)
      .replace(/, /g, " • ") // replace comma separator with dash for consistency
      .replace(/ /g, " "); // optional: convert spaces to dashes

    return formattedData;
  };

  const timeAgo = (date) => {
    const now = new Date();
    const seconds = Math.floor((now - new Date(date)) / 1000);

    const intervals = [
      { label: "year", seconds: 31536000 },
      { label: "month", seconds: 2592000 },
      { label: "day", seconds: 86400 },
      { label: "hour", seconds: 3600 },
      { label: "minute", seconds: 60 },
      { label: "second", seconds: 1 },
    ];

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds);
      if (count >= 1) {
        return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
      }
    }

    return "just now";
  };

  const handleAddCommentChange = (e) => {
    // console.log(e.target.value);
    setAddComment(e.target.value);
  };
  // console.log(isLiking)
  const handleSendComment = async () => {
    setSubmittingComment(1);
    if (!addComment) {
      toast.warn("Add some comment", {
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

      setSubmittingComment(0);
      return;
    }
    try {
      const res = await AxiosInstance.post(
        "/blog/comments",
        {
          data: addComment,
          blog_id: showblogId,
          created_by: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setComments((prev) => [res.data.comment, ...prev]);
      setAddComment("");
      toast.success("Comment added", {
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

      // comments.unshift(res.data.comment);
      // console.log(res.data.comment);
    } catch (e) {
      toast.error(e.response.data?.message, {
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
      // console.log(e);
    } finally {
      setSubmittingComment(0);
    }
  };
  // console.log(alreadyLikes);
  const handleLikeChange = async () => {
    // console.log(whoLikes);
    if (!user) {
      toast.warn("Please Login", {
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
    if (alreadyLikes) {
      return;
    }

    try {
      setIsLiking(1);
      const res = await AxiosInstance.post(
        "/blog/like",
        {
          blog_id: showblogId,
          likes_by: user?._id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLikes(likes + 1);
      setAlreadyLikes(1);

      toast.success("Like added", {
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

      // comments.unshift(res.data.comment);
      // console.log(res.data.comment);
    } catch (e) {
      toast.error("Unable to process like", {
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
      // console.log(e);
    } finally {
      setIsLiking(0);
    }
  };

  // console.log(alreadyLikes);
  return (
    <div className=" w-full min-h-[85vh] max-h-full ">
      <div className="container px-5  pb-10 lg:pb:15 lg:px-30 shadow-xl rounded-2xl mx-auto w-full">
        <div className=" flex flex-col  justify-center p-5 gap-5 ">
          {/* top  */}

          <div className="w-full flex justify-center">
            <img
              className=" shadow-md w-150 h-70 lg:w-200 lg:h-100 rounded-xl  shadow-white"
              src={`${blog?.blog.image}`}
              alt="blogImage"
            />
          </div>
          <p className="pl-1 text-sm font-bold opacity-45">
            {blog?.blog.createdAt ? getLocalTime(blog?.blog.createdAt) : ""}
          </p>
        </div>
        <div>
          {" "}
          <h1 className="text-2xl p-5 pl-2">
            <span className=" capitalize  font-semibold">
              {blog?.blog.title}
            </span>{" "}
          </h1>
        </div>
        <div
          className="blog-content prose blog-content max-w-none"
          dangerouslySetInnerHTML={{ __html: blog?.blog.content }}
        >
          {/* content */}
        </div>
        <div>
          <div className="flex justify-between  items-center shadow shadow-gray-200 w-full pb-3 lg:pb-5 pt-2 lg:pt-4 rounded-2xl px-2">
            <div className="flex items-center gap-3 ">
              <img
                className="w-12 lg:w-15 lg:h-15 rounded-full h-12"
                src={
                  !blog?.blog.created_by.profilePicture
                    ? "/defaultPic.jpg"
                    : blog.blog.created_by.profilePicture
                }
                alt=""
              />
              <h3>{blog?.blog.created_by.name}</h3>
            </div>
            <div></div>
            <div className="flex p-2 gap-5 lg:text-xl items-center text-md opacity-77  ">
              <button
                disabled={isLiking}
                onClick={handleLikeChange}
                className="flex gap-2 items-center cursor-pointer"
              >
                <i
                  className={` fa-${alreadyLikes ? "solid" : "regular"} ${
                    alreadyLikes ? "text-pink-600" : ""
                  }  fa-heart`}
                ></i>
                {/* <i
                  className={`fa-${
                    alreadyLikes ? "solid" : "regular"
                  } fa-thumbs-up`}
                ></i> */}
                {likes}
              </button>
              <p
                className="flex gap-2 items-center cursor-pointer"
                onClick={() => {
                  setShowComment((prev) => !prev);
                }}
              >
                <i className="fa-solid fa-comment "></i> {comments?.length || 0}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setShowComment((prev) => !prev);
          }}
          className="px-2 py-3 hover:font-bold border-b-1 cursor-pointer border-gray-500"
        >
          Comments ( {comments?.length || 0} )
        </button>
        <div hidden={!showComment} className="w-full p-1 flex flex-col">
          <div hidden={!user} className="flex py-2 gap-2 lg:gap-4 relative">
            {/* write comment  */}
            <img
              className="w-12 h-12 lg:w-15 lg:h-15"
              src={`${user?.profilePicture || "/defaultPic.jpg"}`}
              alt="commenting"
            />
            <input
              className="lg:text-lg pl-2 focus:ring-2 focus:ring-blue-300 w-full outline-0 rounded-2xl  bg-gray-200  pr-10 lg:pr-12 "
              type="text"
              onChange={handleAddCommentChange}
              value={addComment}
            />
            <button
              disabled={submitingComment}
              onClick={handleSendComment}
              className="fa-solid absolute cursor-pointer right-2 top-5 lg:right-4 lg:top-6 lg:text-3xl text-2xl fa-circle-up"
            ></button>
          </div>
          {comments?.map((e, i) => {
            // console.log(e);

            return (
              <div key={i} className=" p-3 pb-2 rounded-2xl">
                <div className="flex px-2 items-center space-x-4">
                  <img
                    className="w-12 h-12 lg:w-15 lg:h-15 rounded-2xl"
                    src={e.created_by.profilePicture || `/defaultPic.jpg`}
                    alt="userProfile"
                  />
                  <h3 className="font-bold">{e.created_by.name}</h3>
                </div>
                <div className="w-full pl-16 pt-0">
                  <p>{e.data}</p>
                  <p className="text-sm opacity-45">{timeAgo(e.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ShowBlog;
