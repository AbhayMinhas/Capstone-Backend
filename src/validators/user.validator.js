import Joi from "joi";

export const updateProfileSchema = Joi.object({
  firstName: Joi.string().trim().min(2).max(50).optional(),
  lastName: Joi.string().trim().min(2).max(50).optional().allow(null, ""),
  age: Joi.number().min(0).max(150).optional(),
  gender: Joi.string()
    .trim()
    .lowercase()
    .valid("male", "female", "other")
    .optional(),
  photoUrl: Joi.string().uri().optional(),
  safetyProfile: Joi.object({
    bloodGroup: Joi.string()
      .uppercase()
      .trim()
      .valid("A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-")
      .optional(),
    allergies: Joi.string().trim().max(1000).optional().allow("", null),
    medicalNotes: Joi.string().trim().max(2000).optional().allow("", null),
    emergencyContacts: Joi.array()
      .items(
        Joi.object({
          name: Joi.string().trim().min(2).max(100).required(),
          phone: Joi.string().required(),
        }),
      )
      .optional(),
  }).optional(),
}).unknown(false);
