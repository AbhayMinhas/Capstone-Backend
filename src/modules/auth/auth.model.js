import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    lastName: {
      type: String,
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true, // ⚡ important for performance (index)
      lowercase: true,
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      select:false,
      validate(value) {
        if (
          !validator.isStrongPassword(value, {
            minLength: 6,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 0,
          })
        ) {
          throw new Error("Enter a Strong Password: " + value);
        }
      },
    },
    age: {
      type: Number,
      max: 150,
      min: 0,
    },
    gender: {
      type: String,
      enum: {
        values: ["male", "female", "other"],
        message: "{VALUE} is not a valid gender type",
      },
      lowercase: true,
      trim: true,
    },
    photoUrl: {
      type: String,
      default: "https://geographyandyou.com/images/user-profile.png",
      validate(value) {
        if (!validator.isURL(value)) {
          throw new Error("Invalid photo URL: " + value);
        }
      },
    },
    safetyProfile: {
      bloodGroup: {
        type: String,
        enum: {
          values: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          message: "{VALUE} is not a valid blood group type",
        },
        uppercase: true,
        trim: true,
      },
      allergies: { type: String, maxLength: 1000 },
      medicalNotes: { type: String, maxLength: 2000 },
      emergencyContacts: [
        {
          name: { type: String, trim: true, maxLength: 50, minLength: 2 },
          phone: {
            type: String,
            trim: true,
            maxLength: 20,
            validate(value) {
              if(!value)return true;
              if (
                !validator.isMobilePhone(value, undefined, { strictMode: true })
              ) {
                throw new Error("Invalid phone number");
              }
            },
          },
        },
      ],
    },
  },
  { timestamps: true },
);



userSchema.methods.validatePassword = async function (inputPassword) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(inputPassword, passwordHash);
  return isPasswordValid;
};

export default mongoose.model("User", userSchema);
