import movieModels from "../models/movieModels.js";

export const addMovies = async (req, res) => {
  try {
    const movie = await movieModels.create(req.body);
    return res.status(201).json({
      message: "Movie added sucessfully",
      data: movie,
    });
  } catch (err) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllMovies = async (req, res) => {
  try {
    const movies = await movieModels.find();

    return res.status(200).json({
      message: "Movies fetched succesfully",
      count: movies.length,
      data: movies,
    });
  } catch (err) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const getMovie = async (req, res) => {
  try {
    const movie = await movieModels.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        message: "Movie requested cannot be found",
      });
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    const movie = await movieModels.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Movie to be deleted cannot be found",
      });
    }
    return res.status(200).json({
      message: "Movie deleted succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
export const updateMovie = async (req, res) => {
  try {
    const movie = await movieModels.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({
        message: "movie to be updated cannot be found",
      });
    }
    return res.status(200).json({
      message: "Movie Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      messgae: error.message,
    });
  }
};
