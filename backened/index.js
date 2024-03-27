import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';
import userRouter from"./routes/user.routes.js"
import authRouter from "./routes/auth.router.js"
import postRouter from "./routes/post.router.js"
import commentRouter from "./routes/comment.router.js"

import cors from "cors";
dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

mongoose.connect(process.env.MONGO, {
  useNewUrlParser: true, 	
  useUnifiedTopology: true, // Corrected typo here
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
app.use("/api",userRouter)
app.use("/api",authRouter);
app.use("/api",postRouter);
app.use("/api",commentRouter);









app.use((err,req,res,next)=>{
     const statusCode=err.statusCode ||500;
     const message=err.message || "Internal Server Error";
     res.json({
      success:false,
      statusCode:statusCode,
      message:message,
     })
});