import express from "express";
import { checkToken } from "../middleWare/authMiddleWare.js";
import { isAdmin } from "../middleWare/isAdmin.js";
import {
  addMovies,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieControllers.js";

const router = express.Router();

router.post("/add-movies",checkToken, isAdmin, addMovies);
router.get("/allmovies",getAllMovies);
router.get("/fetch-movie/:id", getMovie);
router.put("/movie-update/:id",checkToken, isAdmin, updateMovie);
router.delete("/delete-movies/:id", checkToken, isAdmin,deleteMovie);

export default router;
