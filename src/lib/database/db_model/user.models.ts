import { model, models, Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: {
      required: true,
      type: String,
    },
    email: {
      required: true,
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    clerkId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const User = models.User || model("User", userSchema);
