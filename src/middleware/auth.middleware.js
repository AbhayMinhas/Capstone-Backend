import jwt from "jsonwebtoken";
import User from "../modules/auth/auth.model.js";

export const protect = async (req, res, next) => {
  try {
    let token;
    const authHeader = req.header("authorization");
    if (authHeader && authHeader.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
    }

    if (!token) {
      throw {
        statusCode: 401,
        message: "Not authorized, token missing",
      };
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded._id).select("-password");

    if (!user) {
      throw {
        statusCode: 401,
        message: "User not found",
      };
    }

    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next({
        statusCode: 401,
        message: "Invalid token",
      });
    }

    if (error.name === "TokenExpiredError") {
      return next({
        statusCode: 401,
        message: "Token expired",
      });
    }

    next(error);
  }
};
