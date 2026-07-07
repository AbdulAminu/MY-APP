import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

let isConnected = false;

export const dbConnect = async () => {
  if (isConnected) {
    console.log("Database is already connected");
    return;
  }
  try {
    const db = await mongoose.connect(process.env.MONGODB_URI);
    isConnected = db.connections[0].readyState;
    console.log("Database connected succesfully");
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message);
      throw new Error(err.message);
    }
  }
};
