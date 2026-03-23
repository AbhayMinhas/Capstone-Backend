import { loginUser, registerUser } from "./auth.service.js";

export const register = async (req, res, next) => {
  try {
    const userData = await registerUser(req.body);
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const userData = await loginUser(req.body);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: userData,
    });
  } catch (error) {
    next(error);
  }
};

//Controller Responsibilty
// receive request
// call service
// send response
// forward errors

//Controller not do
// hash password
// access DB
// write business logic
// validate input (already done by Joi)
//these service layer do
