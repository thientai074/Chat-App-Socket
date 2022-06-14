import express from "express";
const router = express.Router();
import { verifyToken } from "../middlewares/auth.middleware";
import userController from "../controlllers/user.controller";
import { Request, Response } from "express";
import { User } from "../models/user.model";

// Find User
router.get("/user/:id", verifyToken, userController.findUser);

// // Update User
router.put("/user/:id", verifyToken, userController.updateUser);

// // Delete User
router.delete("/user/:id", verifyToken, userController.removeUser);

// Get all Users
router.get("/user", verifyToken, userController.getAllUsers);

// Create User
router.post("/user", userController.createUser);

// Friend
router.get("/notFriend", verifyToken, userController.getNotFriends );

export default router;
