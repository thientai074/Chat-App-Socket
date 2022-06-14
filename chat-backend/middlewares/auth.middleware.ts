const jwt = require("jsonwebtoken");
import { Request, Response, NextFunction } from "express";
import { env } from "../utils/myVariables";
import { DecodeType } from "../types/types";

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.json({
      success: false,
      message: "Access Token not found",
    });
  }

  try {
    const jwtAccessToken = env.JWT_ACCESS_KEY;
    jwt.verify(token, jwtAccessToken, async (err: any, decoded: DecodeType) => {
      if (err) {
        return res.json("Internal Server Error");
      } else {
        res.locals.jwt = decoded;
        next();
      }
    });
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid Token",
    });
  }
};
