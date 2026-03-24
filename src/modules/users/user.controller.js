import { updateUserProfile } from "./user.service.js";

export const getProfile = async (req, res, next) => {
  try {
    res.status(200).json({
      success: true,
      message: "User profile fetched successfully",
      data: req.user,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProfile = async (req, res, next) => {
  try {
    const updatedUser = await updateUserProfile(req.user, req.body);
    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    next(error);
  }
};
