import express from "express";
import {
  signUpValidation,
  loginValidation,
} from "../validator/userValidator.js";
import { userModel } from "../models/userModels.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/tokenGen.js";

export const Home = (req, res) => {
  res.send("Hey yo i am the first page");
};

export const signUp = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    if (!username || !email || !password) {
      return res.status(400).json({
       message: "Please fill in all required fields to continue. ⚠️"
      });
    }
    const { error } = signUpValidation.validate({
      username,
      email,
      password,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: `An account with ${email} already exists. Please log in or use a different email address. 🚫`
      });
    }
    const newUser = await userModel.create({
      username,
      email,
      password,
    });

    const token = await generateToken(newUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(201).json({
      message: `Hello ${newUser.username}, your account has been created succesfully 🎉🚀`,
      data: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "server error ❌",
    });
  }
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { error } = loginValidation.validate({
      email,
      password,
    });
    if (error) {
      return res.status(400).json({
        message: error.details[0].message,
      });
    }
    const existingUser = await userModel.findOne({ email });
    if (!existingUser) {
      return res.status(404).json({
       message: `No account was found with the email ${email}. Please check the email or create a new account. 📧`
      });
    }
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
         message: "Incorrect password. Please try again. 🔒"
      });
    }
    const token = await generateToken(existingUser._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7,
    });
    return res.status(200).json({
      message: `Welcome back, ${existingUser.username}! Login successful 🎉🚀`,
      data: {
        id: existingUser._id,
        username: existingUser.username,
        email: existingUser.email,
      },
    });
  } catch (err) {
    console.error(err);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find().select("-password");
    if (!users) {
      return res.status(404).json({
        message: "No Users Found",
      });
    } else {
      return res.status(200).json({
        message: "Users retrieved succesfully",
        data: users,
      });
    }
  } catch (err) {
    if (err instanceof Error) {
      console.error(err);
      throw new Error(err.message);
    }
  }
};
export const getSingleUser = async (req, res) => {
  try {
    return res.status(200).json({
      message: "User retrieved successfully ✅",
      data: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      message: "Server error ❌",
    });
  }
};

export const deleteAcct = async (req, res)=>{
  try{
   await userModel.findByIdAndDelete(req.user._id)
   res.clearCookie("token")

   return res.status(200).json({
   message: `Goodbye, ${req.user.username}! Your account has been deleted successfully. 👋🗑️`
   })
  }catch(err){
    console.error(err)
    return res.status(500).json({
      message:"server error"
    })
  }
}

export const AccountLogout = async(req, res)=>{
  try{
    return res.status(200).json({
      message:`Goodbye ${req.user.username}, Account Logout Successful 👋`
    })
  }catch(err){
    console.error(err);
    return res.status(500).json({
      message:"Account Logout Failed 😞"
    })
  }
}