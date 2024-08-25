"use server";

import { auth } from "@clerk/nextjs/server";
import { connectToDB } from "../connectToDB";
import { User } from "../db_model/user.models";

export const createUser = async ({
  email,
  name,
}: {
  email: string;
  name: string;
}) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return {
        message: "Unauthorized",
        success: false,
      };
    }
    await connectToDB();
    const userData = { name, email, clerkId: userId };
    const newUser = await User.create(userData);
    return {
      message: "User created",
      success: true,
      user: newUser,
    };
  } catch (error) {}
};
