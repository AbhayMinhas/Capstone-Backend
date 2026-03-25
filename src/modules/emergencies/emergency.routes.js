import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import {
  getEmergencyById,
  getMyEmergencies,
  resolveSOS,
  triggerSOS,
} from "./emergency.controller.js";

const emergencyRouter = express.Router();

emergencyRouter.post("/sos", protect, triggerSOS);

emergencyRouter.get("/history", protect, getMyEmergencies);
emergencyRouter.get("/:id", protect, getEmergencyById);
emergencyRouter.patch("/:id/resolve", protect, resolveSOS);

export default emergencyRouter;
