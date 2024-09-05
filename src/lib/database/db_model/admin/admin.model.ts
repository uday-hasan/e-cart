import { model, models, ObjectId, Schema } from "mongoose";

export interface UUser {
  name: string;
  email: string;
  isAdmin?: boolean;
  clerkId: string;
  createdAt?: Date;
  updatedAt?: Date;
  _id: ObjectId;
}

const adminSchema = new Schema(
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

export const User = models.User || model("User", adminSchema);
