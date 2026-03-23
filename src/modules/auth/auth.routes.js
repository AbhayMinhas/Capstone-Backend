import { validate } from "../../middleware/validation.middleware.js";
import {
  loginSchema,
  registerSchema,
} from "../../validators/auth.validator.js";
import { login, register } from "./auth.controller.js";
import express from "express";
const authRouter = express.Router();

authRouter.post("/register", validate(registerSchema), register);

authRouter.post("/login", validate(loginSchema), login);

export default authRouter;
