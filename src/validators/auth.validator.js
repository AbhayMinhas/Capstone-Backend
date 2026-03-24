import Joi from "joi";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
export const registerSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).required(),
  lastName: Joi.string()
    .trim()
    .min(2)
    .max(50)
    .optional()
    .allow(null, "")
    .empty("")
    .default(null),
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().min(6).pattern(passwordRegex).required().messages({
    "string.pattern.base":
      "Password must contain uppercase, lowercase, and a number",
    "string.min": "Password must be at least 6 characters long",
    "any.required": "Password is required",
  }),
  age: Joi.number().min(0).max(150).optional(),
  gender: Joi.string()
    .trim()
    .lowercase()
    .valid("male", "female", "other")
    .optional()
    .allow(null),
}).unknown(false);

export const loginSchema = Joi.object({
  email: Joi.string().email().lowercase().trim().required(),
  password: Joi.string().required(),
}).unknown(false);
