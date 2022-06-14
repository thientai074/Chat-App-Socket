import express from "express";
const router = express.Router();
import MessageController from "../controlllers/message.controller";
import { verifyToken } from "../middlewares/auth.middleware";

router.post("/message", verifyToken, MessageController.createMessage);

router.get(
  "/message/:conversationId",
  verifyToken,
  MessageController.getMessages
);

// Change to read message
router.put(
  "/message/read/:conversationId",
//  verifyToken,
  
  MessageController.markReadMessage
);

// Get unread messages
router.get(
  "/message/unread/:conversationId",
  verifyToken,
  MessageController.getUnreadMessage
);

export default router;
