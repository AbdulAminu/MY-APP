import wallpaperModels from "../models/wallpaperModels.js";

export const addWallpaper = async (req, res) => {
    const {
  category, image
}= req.body
  try {
    if(!category || image){
        return res.status(400).json({
            message:"Please fill in all required fields to continue. ⚠️"
        })
    }
    const movie = await wallpaperModels.create(req.body);
    return res.status(201).json({
      message: "Wallpaper added sucessfully",
      data: movie,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const getAllWallpapers = async (req, res) => {
  try {
    const wallpapers = await wallpaperModels.find();

    return res.status(200).json({
      message: "Wallpapers fetched succesfully",
      count: wallpapers.length,
      data: wallpapers,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const getWallpaper = async (req, res) => {
  try {
    const wallpapers = await wallpaperModels.findById(req.params.id);
    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper requested cannot be found",
      });
    }
    return res.status(200).json(movie);
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

export const deleteWallpaper = async (req, res) => {
  try {
    const wallpaper = await wallpaperModels.findByIdAndDelete(req.params.id);

    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper to be deleted cannot be found",
      });
    }
    return res.status(200).json({
      message: "Wallpaper deleted succesfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};
export const updateWallpaper = async (req, res) => {
  try {
    const wallpapers = await wallpaperModels.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!wallpaper) {
      return res.status(404).json({
        message: "Wallpaper to be updated cannot be found",
      });
    }
    return res.status(200).json({
      message: "Wallpaper Updated successfully",
    });
  } catch (err) {
    return res.status(500).json({
      messgae: err.message,
    });
  }
};
