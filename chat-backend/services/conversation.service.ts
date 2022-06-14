import { Conversation } from "../models/conversation.model";
class ConversationService {
  async create(senderId: string, receiverId: string) {
    try {
      const newConversation = new Conversation({
        members: [senderId, receiverId],
      });
      const savedConversation = newConversation.save();
      return {
        success: true,
        data: savedConversation,
        message: "Created conversation successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating conversation",
      };
    }
  }

  async get(userId: string) {
    try {
      const conversation = await Conversation.aggregate([
        {
          $match: {
            members: { $in: [userId] },
          },
        },
        {
          $unwind: "$members",
        },
        {
          $match: {
            members: { $nin: [userId] },
          },
        },
        {
          $project: {
            userObjId: { $toObjectId: "$members" },
          },
        },
        {
          $lookup: {
            localField: "userObjId",
            from: "users",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        {
          $project: {
            conversationStringId: { $toString: "$_id" },
            userDetails: 1,
            _id: 1,
            members: 1,
            messages: 1,
            lastMessage: 1,
            unreadMessage: 1,
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "conversationStringId",
            foreignField: "conversationId",
            as: "messages",
          },
        },
        {
          $addFields: {
            copyMessage: "$messages",
          },
        },

        { $addFields: { lastMessage: { $last: "$copyMessage" } } },
        {
          $project: {
            userDetails: 1,
            _id: 1,
            members: 1,
            lastMessage: 1,
            unreadMessage: {
              $filter: {
                input: "$messages",
                as: "item",
                cond: { $eq: ["$$item.read", false] },
              },
            },
          },
        },
      ]);

      return {
        success: true,
        data: conversation,
        message: "Getted conversation successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while getting conversation",
      };
    }
  }
}

export default new ConversationService();
