import express from "express";
import authRouter from "../modules/auth/auth.routes.js";
import userRouter from "../modules/users/user.routes.js";


const router = express.Router();

//mount module routes
router.use("/auth",authRouter);
router.use("/user",userRouter);

router.get("/health", (req, res) => {
  res.json({ success: true, message: "OK" });
});

// root route
router.get("/", (req, res) => {
  res.json({ success: true, message: "API running" });
});

export default router;