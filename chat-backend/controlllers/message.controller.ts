import MessageService from "../services/message.service";
import { Request, Response } from "express";
import { resolveSoa } from "dns";

class MessageController {
  async createMessage(req: Request, res: Response) {
    try {
      const { conversationId, sender, text, receiver } = req.body;
      const message = await MessageService.create(
        conversationId,
        sender,
        text,
        receiver
      );
      res.json(message);
    } catch (error) {
      return res.json({
        success: false,
        message: "Creating message faied",
      });
    }
  }

  async getMessages(req: Request, res: Response) {
    try {
      const conversationId = req.params.conversationId;
      const messages = await MessageService.get(conversationId);
      res.json(messages);
    } catch (error) {
      return res.json({
        success: false,
        message: "Getting message faied",
      });
    }
  }

  async markReadMessage(req: Request, res: Response) {
    try {
      const conversationId = req.params.conversationId;
      const readMessages = await MessageService.readMessage(conversationId);
      res.json(readMessages);
    } catch (error) {
      console.log(error);
    }
  }

  async getUnreadMessage(req: Request, res: Response) {
    try {
      const conversationId = req.params.conversationId;
      const unreadMessage = await MessageService.unreadMessage(conversationId);
      res.json(unreadMessage);
    } catch (error) {
      console.log(error);
    }
  }
}

export default new MessageController();
