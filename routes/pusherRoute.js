import express from "express";
import {
  messagesController,
} from "../controllers/pusherController.js";

//router object
const router = express.Router();

//Send Messages to pusher API || POST
router.post("/messages/:chatId", messagesController);

export default router;
