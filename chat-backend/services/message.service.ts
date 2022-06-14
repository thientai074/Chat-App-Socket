import { Message } from "../models/message.model";
class MessageService {
  async create(
    conversationId: string,
    sender: string,
    text: string,
    receiver: string
  ) {
    try {
      const newMessage = new Message({
        conversationId,
        sender,
        text,
        receiver,
      });
      const savedMessage = await newMessage.save();
      return {
        success: true,
        data: savedMessage,
        message: "Created message successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating message",
      };
    }
  }

  async get(conversationId: string) {
    try {
      const messages = await Message.aggregate([
        {
          $match: {
            conversationId: conversationId,
          },
        },
        {
          $project: {
            _id: 1,
            read: 1,
            text: 1,
            conversationId: 1,
            sender: 1,
            createdAt: 1,
            senderObjId: { $toObjectId: "$sender" },
          },
        },
        {
          $lookup: {
            localField: "senderObjId",
            from: "users",
            foreignField: "_id",
            as: "receiverDetails",
          },
        },
      ]);

      const lastMessage = await Message.find();
      return {
        success: true,
        data: messages,
        lastMessage,
        message: "Getted message successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while getting message",
      };
    }
  }

  async readMessage(conversationId: string) {
    try {
      const messages = await Message.find({
        conversationId: conversationId,
      }).updateMany({ read: true });
      return messages;
    } catch (error) {
      console.log(error);
      return {
        message: "Can not read this"
      }
    }
  }

  async unreadMessage(conversationId: string) {
    try {
      const messages = await Message.find({
        conversationId: conversationId,
        read: false,
      });
      return messages;
    } catch (error) {
      console.log(error);
    }
  }
}
export default new MessageService();
