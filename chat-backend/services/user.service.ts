import bcrypt from "bcryptjs";
import { User } from "../models/user.model";

class UserService {
  // create new User

  async create(
    username: string,
    email: string,
    password: string,
    avatar: string
  ) {
    try {
      const exitedUser = await User.findOne({ email: email });
      if (exitedUser) {
        return {
          success: false,
          message: "This email already exists",
        };
      }
      const salt = await bcrypt.genSalt(10);
      const hashed = await bcrypt.hash(password, salt);

      const newUser = await new User({
        username,
        email,
        password: hashed,
        avatar,
      });

      const user = await newUser.save();
      return {
        success: true,
        data: user,
        message: "Created user successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while creating user",
      };
    }
  }

  //  Get All Users
  async getUsers() {
    try {
      const users = await User.find().sort({ username: 1 });
      return {
        success: true,
        data: users,
        message: "Getted all users successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while searching users",
      };
    }
  }

  //   Get one user
  async findUser(userId: string) {
    try {
      const user = await User.findById(userId);
      return {
        success: true,
        data: user,
        message: "Getted user successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while searching this user",
      };
    }
  }

  //   Delete User
  async delete(userId: string) {
    try {
      const deletedUser = await User.findByIdAndDelete(userId);
      return {
        success: true,
        data: deletedUser,
        message: "Deleted user successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while deleting this user",
      };
    }
  }

  //   Update User
  async update(userId: string, body: any) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        {
          $set: body,
        },
        { new: true }
      );
      return {
        success: true,
        data: updatedUser,
        message: "Updated user successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error while updating this user",
      };
    }
  }

  async notFriend() {
    try {
      const notFriends = await User.aggregate([
        {
          $project: {
            _id: 1,
            username: 1,
            avatar: 1,
            isAdmin: 1,
            userStringId: { $toString: "$_id" },
          },
        },
        {
          $lookup: {
            from: "messages",
            localField: "userStringId",
            foreignField: "sender",
            as: "unfriend",
          },
        },
        // { $unwind: "$unfriend" },
        // {$match: {
        //   username: {$eq: "hanhhanh"}
        // }},

        // {
        //   $project: {
        //     _id: 1,
        //     username: 1,
        //     avatar: 1,
        //     isAdmin: 1,
        //     userStringId: 1,
        //     senderStringId: { $toString: "$unfriend.sender" },
        //     receiverStringId: { $toString: "$unfriend.receiver" },
        //   },
        // },
        // {
        //   $match: {
        //     receiverStringId: { $ne: res.locals.jwt.id },
        //   },
        // },
        // {
        //   $match: {
        //     senderStringId: { $ne: res.locals.jwt.id },
        //   },
        // },
        // {

        //     userStringId: { $ne: "receiverObjId" },

        // },
        // {
        //   $match: {
        //     userStringId: { $ne: "unfriend.receiver" },
        //   },
        // },
        // {
        //   $match: {
        //     _id: { $ne: "unfriend.receiver" },
        //   },
        // },
        // { $unwind: "$unfriend" },
        // {
        //   $project: {
        //     _id: 1,
        //     username: 1,
        //     avatar: 1,
        //     isAdmin: 1,
        //     unfriend: 1,
        //     userStringId: 1,
        //     conversationObjId: { $toObjectId: "$unfriend.conversationId" },
        //   },
        // },
        // {
        //   $lookup: {
        //     from: "conversations",
        //     localField: "conversationObjId",
        //     foreignField: "_id",
        //     as: "joiner",
        //   },
        // },
        // { $unwind: "$joiner" },
        // {$match: {
        //   username: "hanhhanh"
        // }}
        // {
        //   $match: {
        //     _id: { $nin: "joiner.members" },
        //   },
        // },
        // { $unwind: "$joiner.members" },
        // { $match: { "joiner.members": { $ne: res.locals.jwt.id } } },
        // {
        //   $project: {
        //     _id: 1,
        //     username: 1,
        //     avatar: 1,
        //     isAdmin: 1,
        //     unfriend: 1,
        //     userStringId: 1,
        //     joinerObjId: { $toObjectId: "$joiner.members" },
        //   },
        // },
        // {
        //   $match: {
        //     _id: { $ne: "joinerObjId" },
        //   },
        // },
      ]);
      return {
        data: notFriends,
        success: true,
        message: "Getted not friends successfully",
      };
    } catch (error) {
      return {
        success: false,
        message: "Error when getting not friends",
      };
    }
  }
}

export default new UserService();
