import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    location: {
      latitude: Number,
      longitude: Number,
    },

    message: {
      type: String,
      default: "Emergency SOS triggered",
    },

    status: {
      type: String,
      enum: ["active", "resolved"],
      default: "active",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Emergency", emergencySchema);
