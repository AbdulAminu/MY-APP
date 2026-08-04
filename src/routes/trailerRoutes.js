import express from "express";
import { checkToken } from "../middleWare/authMiddleWare.js";
import { isAdmin } from "../middleWare/isAdmin.js";
import { addTrailer, deleteTrailer, getAllTrailers, getTrailer, updateTrailer } from "../controllers/trailerControllers.js";

const router = express.Router();

router.post("/add-trailer",checkToken, isAdmin, addTrailer);
router.get("/alltrailers",getAllTrailers);
router.get("/fetch-trailer/:id", getTrailer);
router.put("/trailer-update/:id",checkToken, isAdmin, updateTrailer);
router.delete("/delete-trailers/:id", checkToken, isAdmin,deleteTrailer);

export default router;
