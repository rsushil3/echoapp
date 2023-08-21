import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoute.js";
import pusherRoutes from "./routes/pusherRoute.js";
import cors from "cors";
import path from 'path';
import {fileURLToPath} from 'url';

//configure env
dotenv.config();

//databse config
connectDB();

// ESmodule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//rest object
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, './client/build')))

//routes
app.use("/api/auth", authRoutes);
app.use("/api/pusher", pusherRoutes);

//rest api
app.use("*", function(req, res){
  res.sendFile(path.join(__dirname, "./client/build/index.html"))
})

//PORT
const PORT = process.env.PORT || 8000;

//run listen
app.listen(PORT, () => {
  console.log(
    `Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`
  );
});
