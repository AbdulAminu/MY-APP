import express from "express";
import {
  addMovies,
  getAllMovies,
  getMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movieControllers.js";

const router = express.Router();

router.post("/movies", addMovies);
router.get("/movies", getAllMovies);
router.get("/movies/:id", getMovie);
router.put("/movies/:id", updateMovie);
router.delete("/movies/:id", deleteMovie);

export default router;
