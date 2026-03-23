import express from "express";
import authRouter from "../modules/auth/auth.routes.js";

const router = express.Router();

//mount module routes
router.use("/auth",authRouter);


router.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

// root route
router.get("/", (req, res) => {
  res.json({ success: true, message: "API running" });
});

export default router;