import express from "express";
import {
  authController,
  messagesController,
} from "../controllers/pusherController.js";

//router object
const pusherRouter = express.Router();

//Pusher Auth || POST
pusherRouter.post('/auth', authController);

//Send Messages to pusher API || POST
pusherRouter.post("/messages/:chatId", messagesController);

export default pusherRouter;
