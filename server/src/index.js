import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import UserRouter from "./router/userRouter.js";
import BlogRouter from "./router/blogRouter.js";
import checkAuthentication from "./authService/checkauth.middlewire.js";
import Blog from "./models/blog.model.js";

dotenv.config();
const URL = process.env.URL;
// console.log(URL);
connectDB(URL);
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("./public"));
app.use(cookieParser());
app.use(checkAuthentication("token"));
const allowedOrigins = [
  "http://localhost:3000",
  "https://your-production-domain.com",
  "https://another-allowed-domain.com",
  process.env.ORIGIN,
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find({}).populate(
      "created_by",
      "_id name profilePicture"
    );
    return res.status(200).json({ blogs: blogs });
  } catch (e) {
    return res.status(500).json({ message: "Internal server error" });
  }
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/blog", BlogRouter);
app.use("/user", UserRouter);

app.listen(port, () => {
  console.log(`Example app listening on http://localhost:${port}`);
});
