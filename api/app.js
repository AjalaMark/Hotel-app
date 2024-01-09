import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRouter from "./routes/auth.js";
import hotelRouter from "./routes/hotels.js";
import roomRouter from "./routes/rooms.js";
import userRouter from "./routes/users.js";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("connected to mongoDb");
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("disconnected", () => {
  console.log("mongoDb disconnected");
});

app.use(cookieParser());
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/hotels", hotelRouter);
app.use("/rooms", roomRouter);

app.use((err, req, res, next) => {
  const errorMessage = err.message || "there is some error";
  const errorStatus = err.status || 500;
  return res.status(errorStatus).json({
    success: false,
    message: errorMessage,
    status: errorStatus,
    stack: err.stack,
  });
});

app.listen(7000, () => {
  connect();
  console.log("app is listening on port 7000");
});

app.get("/", (req, res) => {
  res.send("this is the inital page");
});
