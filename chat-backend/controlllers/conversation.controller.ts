import { Request, Response } from "express";
import ConversationService from "../services/conversation.service";

class ConversationController {
  async createConversation(req: Request, res: Response) {
    try {
      const senderId = res.locals.jwt.id;
      const { receiverId } = req.body;
      const conversation = await ConversationService.create(
        senderId,
        receiverId
      );
      res.json(conversation);
    } catch {
      return res.json({
        success: false,
        message: "Creating conversation faied",
      });
    }
  }

  async getConversation(req: Request, res: Response) {
    try {
      const userId = req.params.userId;
      const conversations = await ConversationService.get(userId);
      res.json(conversations);
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting conversation faied",
      });
    }
  }
}

export default new ConversationController();
