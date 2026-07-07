import jwt from "jsonwebtoken";
import { userModel } from "../models/userModels.js";
import dotenv from "dotenv";
dotenv.config();

const secret = process.env.JWT_SECRET;

export const checkToken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(404).json({
        message: "No Access Token Found",
      });
    }

    const decoded = jwt.verify(token, secret);
    req.user = await userModel.findById(decoded.id).select("-password");
    if (!req.user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    next();
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Invalid or expired token ❌",
    });
  }
};
