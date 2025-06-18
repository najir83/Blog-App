import dotenv, { populate } from "dotenv";
import fs from "fs";
import express from "express";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import Blog from "../models/blog.model.js";
import { authRequire } from "../authService/authRequired.middlewire.js";
import Comment from "../models/comment.model.js";
import Like from "../models/like.model.js";

dotenv.config();
const upload = multer({ dest: "./public/uploads/" });
const BlogRouter = express.Router();

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUDE_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRATE,
});


BlogRouter.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    if (!id) {
      return res.status(400).json({ message: "Invalid blog id" });
    }

    const blog = await Blog.findById(id).populate(
      "created_by",
      "name _id profilePicture"
    );
    return res.status(200).json({ blog: blog });
  } catch (e) {
    return res.status(404).json({ message: "Blog not found", e });
  }
});

BlogRouter.post("/upload", upload.single("image"), async (req, res) => {
  try {
    const { title, content } = req.body;
    const responce = await cloudinary.uploader.upload(req.file.path, {
      folder: "blogImages",
    });
    fs.unlinkSync(req.file.path);
    // console.log(responce.secure_url);
    const blog = await Blog.create({
      title,
      content,
      image: responce.secure_url,
      created_by: req.user._id,
    });

    return res
      .status(200)
      .json({ message: "Upload successful", blog_id: blog._id });
  } catch (e) {
    return res
      .status(500)
      .json({ message: "Internal server error.. please try after some time" });
  }
});

BlogRouter.post("/comments", authRequire, async (req, res) => {
  // console.log(res.body);
  try {
    const { data, blog_id, created_by } = req.body;
    // console.log(data, blog_id, created_by);
    if (!data || !blog_id || !created_by) {
      return res.status(404).json({ message: "All fields are required" });
    }
   const comment= await Comment.create({
      data,
      blog_id,
      created_by,
    });
    console.log(comment);
    const populatedComment = await Comment.findById(comment._id).populate('created_by',"name profilePicture");


    return res.status(200).json({ message: "Comment added successfully",comment: populatedComment });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
BlogRouter.get("/comments/:id", async (req, res) => {
  const blog_id = req.params?.id;
  // console.log(res.body);
  try {
    const comments = await Comment.find({ blog_id }).populate("created_by","name profilePicture");
    if (!comments) {
      return res.status(404).json({ message: "Invalid blog id" });
    }

    return res.status(200).json({ comments: comments });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
BlogRouter.post("/like", async (req, res) => {
  try {
    const { blog_id, likes_by } = req.body;
    // console.log(blog_id, likes_by);
    const blog = await Blog.findById(blog_id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    console.log(blog);

    blog.likes = blog.likes + 1;
    blog.save();

    await Like.create({
      blog_id,
      likes_by,
    });

    return res.status(200).json({ message: "Like added" });
  } catch (e) {
    return res.status(500).json({ message: "Internal Server Error" });
  }
});
BlogRouter.get("/like/:id", async (req, res) => {
  const blog_id = req.params?.id;
  try {
    // console.log(blog_id);
    const likes = await Like.find({ blog_id }).populate('likes_by',"name _id profilePicture");
    // console.log(likes);

    return res.status(200).json({ likes: likes });
  } catch (e) {
    console.log(e);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default BlogRouter;
