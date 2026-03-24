import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getProfile, updateProfile } from "./user.controller.js";
import { validate } from "../../middleware/validation.middleware.js";
import { updateProfileSchema } from "../../validators/user.validator.js";

const userRouter = express.Router();

userRouter.get("/profile", protect, getProfile);

userRouter.patch(
  "/profile",
  protect,
  validate(updateProfileSchema),
  updateProfile,
);
export default userRouter;
