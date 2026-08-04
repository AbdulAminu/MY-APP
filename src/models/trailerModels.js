import mongoose from "mongoose";

const trailerSchema = new mongoose.Schema(
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

    trailerUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const trailerModels = mongoose.model("trailer", trailerSchema);
export default trailerModels;
