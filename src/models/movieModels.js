import mongoose from "mongoose";

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    genre: {
      type: String,
      required: true,
    },

    year: Number,

    duration: String,

    rating: Number,

    poster: {
      type: String,
      required: true,
    },

    trailer: String,

    movieUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const movieModels = mongoose.model("Movie", movieSchema);
export default movieModels;
