import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import mongoose from 'mongoose';

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

console.log(process.env.MONGO);

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

app.listen(PORT, () => {
  console.log(`Server Running on port ${PORT}`);
});
