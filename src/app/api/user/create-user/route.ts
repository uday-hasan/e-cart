import { User } from "@/lib/database/db_model/user.models";
import { NextResponse } from "next/server";

export const POST = async (req: Request, res: Response) => {
  try {
    const { name, email, clerkId } = await req.json();
    const newUser = { name, email, clerkId };
    User.create(newUser);
    return NextResponse.json({});
  } catch (error) {}
};
