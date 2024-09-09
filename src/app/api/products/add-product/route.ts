import { connectToDB } from "@/lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { auth } from "@clerk/nextjs/server";
import { Types } from "mongoose";
import { NextResponse } from "next/server";
export const POST = async (req: Request, res: Response) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.isAdmin) {
      return NextResponse.json({
        message: "Unauthorized or user not found",
        success: false,
        sessionClaims,
      });
    }
    await connectToDB();
    const body = await req.json();
    const data = {
      ...body,
      author: new Types.ObjectId(sessionClaims.userId as string),
    };

    console.log(data);
    const add = await Products.create(data);
    console.log(add);
    return NextResponse.json({
      data: add,
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    console.log({ errorRouteAddProduct: error });
    return NextResponse.json({ error });
  }
};
