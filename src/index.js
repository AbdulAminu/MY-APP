import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./config/DBconnect.js";
const app = express();
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
await dbConnect();

app.use("/api/users", userRoutes);

if(process.env.NODE_ENV !=="production"){
app.listen(3000, () => {
  console.log("App is running at prot 3000");
});
}