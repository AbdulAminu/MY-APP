import mongoose from "mongoose";

const wallpaperSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const wallpaperModels = mongoose.model("wallpaper", wallpaperSchema);
export default wallpaperModels;
