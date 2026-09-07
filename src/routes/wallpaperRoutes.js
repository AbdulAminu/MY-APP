import express from "express";
import { checkToken } from "../middleWare/authMiddleWare.js";
import { isAdmin } from "../middleWare/isAdmin.js";
import {addWallpaper, deleteWallpaper, getAllWallpapers, updateWallpaper, getWallpaper } from "../controllers/wallpaperControllers.js";

const router = express.Router();

router.post("/add-wallpaper",checkToken, isAdmin, addWallpaper);
router.get("/allwallpapers",getAllWallpapers);
router.get("/fetch-wallpaper/:id", getWallpaper);
router.put("/wallpaper-update/:id",checkToken, isAdmin, updateWallpaper);
router.delete("/delete-wallpaper/:id", checkToken, isAdmin,deleteWallpaper);

export default router;
