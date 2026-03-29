import express from "express";
import { protect } from "../../middleware/auth.middleware.js";
import { getNearbyUsers } from "./location.controller.js";

const locationRouter = express.Router();

locationRouter.get("/nearby",protect,getNearbyUsers);

export default locationRouter;