import express, { urlencoded } from "express";
import userRoute from "./routes/userRoute.js";
import connectDB from "./config/connectDB.js";
import errorHandler from "./middlewares/errorHandler.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import cloudinary from "cloudinary";
config({ path: "./config/config.env" });
const app = express();
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3001",
    credentials: true,
  })
);

const PORT = process.env.PORT || 4000;
//connecting to mongodb
connectDB();

//middlewares
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
//Routes
app.use("/netflixBckEnd/v1", userRoute);
app.use('/',(req,res)=>res.send(`Server is running at <a href=${process.env.FRONTEND_URL}>here </a>`))
//error handler
app.use(errorHandler);
//server running

const server = app.listen(PORT, () => {
  console.log("The Backend server is running at port", PORT);
});

process.on("unhandledRejection", (error) => {
  console.log(`Logged error${error}`);
  server.close(() => {
    console.log("Closing server due to unhandled Rejection");
    process.exit(1);
  });
});
