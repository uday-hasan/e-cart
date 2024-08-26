"use server";

import { connectToDB } from "../connectToDB";
import { User } from "../db_model/user.models";

export const createUser = async ({
  email,
  name,
  clerkId,
}: {
  email: string;
  name: string;
  clerkId: string;
}) => {
  try {
    await connectToDB();
    const userData = { name, email, clerkId };
    const newUser = await User.create(userData);
    return {
      message: "User created",
      success: true,
      user: newUser,
    };
  } catch (error) {
    console.log({ error });
  }
};
