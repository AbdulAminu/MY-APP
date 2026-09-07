import wallpaperModels from "../models/wallpaperModels.js";
import cloudinary from "../config/cloudinary.js";

export const addWallpaper = async (req, res) => {
  const { category } = req.body;

  try {
    if (!category || !req.file) {
      return res.status(400).json({
        message: "Please provide a category and an image. ⚠️",
      });
    }

    const uploadToCloudinary = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "primal-workpaper",
            resource_type: "image",
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          }
        );

        stream.end(req.file.buffer);
      });
    };

    const result = await uploadToCloudinary();

    const wallpaper = await wallpaperModels.create({
      category,
      image: result.secure_url,
    });

    return res.status(201).json({
      message: "Wallpaper added successfully 🎉",
      data: wallpaper,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};
// GET ALL WALLPAPERS
export const getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await wallpaperModels.find();

    return res.status(200).json({
      message: "Wallpapers fetched successfully",
      count: wallpapers.length,
      data: wallpapers,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// GET ONE WALLPAPER
export const getWallpaper = async (req, res) => {
  try {
    const wallpaper = await wallpaperModels.findById(req.params.id);

    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper requested cannot be found",
      });
    }

    return res.status(200).json({
      message: "Wallpaper fetched successfully",
      data: wallpaper,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// DELETE WALLPAPER
export const deleteWallpaper = async (req, res) => {
  try {
    const wallpaper = await wallpaperModels.findByIdAndDelete(
      req.params.id
    );

    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper to be deleted cannot be found",
      });
    }

    return res.status(200).json({
      message: "Wallpaper deleted successfully 🗑️",
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};

// UPDATE WALLPAPER
export const updateWallpaper = async (req, res) => {
  try {
    const wallpaper = await wallpaperModels.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper to be updated cannot be found",
      });
    }

    return res.status(200).json({
      message: "Wallpaper updated successfully",
      data: wallpaper,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      message: err.message,
    });
  }
};