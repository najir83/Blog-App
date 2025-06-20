import React, { useRef, useState, useMemo, useEffect } from "react";
import { toast, Bounce } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate, useParams } from "react-router-dom";
import AxiosInstance from "../config/AxiosInstance";
import useStore from "../store";
const UpdateBlog = () => {
  const { setSpin } = useStore();
  const { blogId } = useParams();
//   console.log(blogId);

  const apiKey = import.meta.env.VITE_TinyMCE_API_KEY;
  // console.log(apiKey);


  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [editorHeight, setEditorHeight] = useState(600);
  const navigate = useNavigate();
  const [imageRequired, setImageRequired] = useState(0);

  useEffect(() => {
    const getBLog = async () => {

      try {
      
        setTimeout(async() => {
            
            const res = await AxiosInstance.get(`/blog/${blogId}`);
            // console.log(res.data);
            setTitle(res.data.blog.title);
            setContent(res.data.blog.content);
          }, 2000);
        } catch (e) {
          console.log(e);
        }
       
    };

    getBLog();
    // console.log(showblogId);
  }, []);
  useEffect(() => {
    const updateHeight = () => {
      const isMobile = window.innerWidth <= 768;
      setEditorHeight(isMobile ? 400 : 600);
    };

    updateHeight(); // Initial check
    window.addEventListener("resize", updateHeight); // Update on resize

    return () => window.removeEventListener("resize", updateHeight);
  }, [content,setContent]); 
  const editor = useRef(null);




  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
    }
  };

  const handleSubmit = async () => {
    setSpin(1);
    if (!title || !content || (imageRequired && !image)) {
      toast.warn("Please fill all fields ", {
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
      setSpin(0);
      return;
    }

    // console.log(title, image, content);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("image", image);
    formData.append("blog_id", blogId);

    try {
      const res = await AxiosInstance.post("/blog/update", formData);
      toast.success("Blog updated .", {
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

      navigate(`/show/${blogId}`);
    } catch (err) {
      // console.error(err);
      toast.error(err.responce?.message || "Internal server error", {
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

  return (
    <div className="w-full p-2 mx-auto overflow-scroll min-h-[84vh]  ">
      <div className="container px-5  pb-10 lg:pb:15 lg:px-15 shadow-xl rounded-2xl mx-auto w-full">
        <div className="flex space-x-3 p-4">
          <h1 className="font-black text-2xl">Title:</h1>
          <input
            className="text-2xl ip font-bold p-1 pl-3 border-none outline-0 bg-gray-300 rounded-lg w-[60vw]"
            name="title"
            value={title}
            onChange={handleTitleChange}
            placeholder="Blog title"
          />
        </div>

        {imageRequired ? (
          <div className="p-4 flex space-x-2 ">
            <label htmlFor="img" className="font-bold text-lg">
              Select Image:
            </label>
            <input
              className="cursor-pointer"
              id="img"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </div>
        ) : (
          <button onClick={()=>setImageRequired(1)} className="bg-green-500 px-5 py-2 cursor-pointer hover:bg-green-700 rounded-2xl text-amber-50 btP font-bold ml-5 my-4">Change Image</button>
        )}

        <div className="">
          <h3 className="font-semibold p-2 text-xl">Content:</h3>
          <Editor
            ref={editor}
            apiKey={apiKey}
            value={content ||""}
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons link lists searchreplace table visualblocks wordcount",
              toolbar:
                "undo redo | blocks fontfamily fontsize forecolor backcolor | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
            //   selector: "textarea", // change this value according to your HTML
              height: editorHeight,
              content_css:'ip',
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:16px }",
            }}
            initialValue="Welcome to Blogify"
            onEditorChange={(newContent) => setContent(newContent)}
    
          />
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default UpdateBlog;
