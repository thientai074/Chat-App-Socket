import express from "express";
import { verifyToken } from "../middlewares/auth.middleware";
const router = express.Router();
import ConversationController from "../controlllers/conversation.controller";

router.post(
  "/conversation",
  verifyToken,
  ConversationController.createConversation
);

router.get(
  "/conversation/:userId",
  verifyToken,
  ConversationController.getConversation
);

export default router;
