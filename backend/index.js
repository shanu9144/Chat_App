 import express from "express";
 import dotenv from "dotenv";
import connectDb from "./config/database.js";
import userRoute from "./routes/userRoute.js";
import messageRoute from "./routes/messageRouter.js";
import cookieParser from "cookie-parser";
import cors from 'cors';

 dotenv.config({});


 const app = express();

 const PORT = process.env.PORT || 5000;

 //middleware
 app.use(express.urlencoded({extended: true}));
 app.use(express.json());
 app.use(cookieParser());
 const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,            //access-control-allow-credentials:true
  };
  app.use(cors(corsOptions));

 //Routes
 app.use("/api/v1/user", userRoute);
 app.use("/api/v1/message",messageRoute);

 app.listen(PORT , ()=>{
    connectDb();
    console.log(`Server listen on port ${PORT}`);
 })