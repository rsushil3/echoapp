import express from "express";
import {
  authController,
  messagesController,
} from "../controllers/pusherController.js";

//router object
const router = express.Router();

//Pusher Auth || POST
router.post('/auth', authController);

//Send Messages to pusher API || POST
router.post("/messages/:chatId", messagesController);

export default router;
