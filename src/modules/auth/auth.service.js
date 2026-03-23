import { generateToken } from "../../utils/jwt.js";
import User from "./auth.model.js";
import bcrypt from "bcryptjs";

export const registerUser = async (data) => {
  const { email, password } = data;

  const existingUser = await User.findOne({ email }).select("_id");

  if (existingUser) {
    throw {
      statusCode: 400,
      message: "Email already exists",
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const user = await User.create({
      ...data,
      password: hashedPassword,
    });
    //  Internally does:
    // new User(data)
    // user.save()

    const token = generateToken(user._id);

    const safeuser = user.toObject();
    delete safeuser.password;

    return {
      user: safeuser,
      token,
    };
  } catch (error) {
    if (error.code === 11000) {
      throw {
        statusCode: 400,
        message: "Email already exists",
      };
    }
    throw error;
  }
};

export const loginUser = async (data)=>{
  const {email,password}=data;
  const user = await User.findOne({email}).select("+password");

  if(!user){
    throw{
      statusCode: 400,
      message: "Invalid credentials",
    };
  }

  const isPasswordValid = await user.validatePassword(password);

  if(!isPasswordValid){
    throw {
      statusCode:400,
      message:"Invalid credentials",
    };
  }

  const token = generateToken(user._id);

  const safeUser=user.toObject();
  delete safeUser.password;

  return {
    user:safeUser,
    token,
  };
};

//service handle
// business logic
// DB operations
// data transformation
// security (hashing, token)

//service not do
// handle req/res
// send response
// know about Express
