import trailerModels from "../models/trailerModels.js";

export const addTrailer = async (req, res) => {
    const {
  title,
  genre,
  year,
  duration,
  rating,
  description,
}= req.body
  try {
    if(!title || !genre || !year || !duration|| !rating || !description){
        return res.status(400).json({
            message:"Please fill in all required fields to continue. ⚠️"
        })
    }
    const movie = await trailerModels.create(req.body);
    return res.status(201).json({
      message: "Trailer added sucessfully",
      data: movie,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllTrailers = async (req, res) => {
  try {
    const movies = await trailerModels.find();

    return res.status(200).json({
      message: "Trailers fetched succesfully",
      count: movies.length,
      data: movies,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const getTrailer = async (req, res) => {
  try {
    const movie = await trailerModels.findById(req.params.id);
    if (!movie) {
      return res.status(404).json({
        message: "Trailer requested cannot be found",
      });
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteTrailer = async (req, res) => {
  try {
    const movie = await trailerModels.findByIdAndDelete(req.params.id);

    if (!movie) {
      return res.status(404).json({
        message: "Trailer to be deleted cannot be found",
      });
    }
    return res.status(200).json({
      message: "Trailer deleted succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const updateTrailer = async (req, res) => {
  try {
    const movie = await trailerModels.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!movie) {
      return res.status(404).json({
        message: "Trailer to be updated cannot be found",
      });
    }
    return res.status(200).json({
      message: "Trailer Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      messgae: err.message,
    });
  }
};
