import { connectToDB } from "@/lib/database/connectToDB";
import { User } from "@/lib/database/db_model/user.models";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }
    await connectToDB();
    const { name, email } = await req.json();
    const userData = { name, email, clerkId: userId };
    const newUser = await User.create(userData);
    return NextResponse.json({
      message: "User created",
      success: true,
      user: newUser,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
};
