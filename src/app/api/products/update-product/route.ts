import { connectToDB } from "@/lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (request: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    console.log(sessionClaims);
    if (!sessionClaims || !sessionClaims.isAdmin) {
      return NextResponse.json({
        message: "Unauthorized or admin not found",
        success: false,
      });
    }
    await connectToDB();
    const req = request.nextUrl.searchParams;
    const data = await request.json();
    const productId = req.get("product-id");
    const update = await Products.updateOne({ _id: productId }, data.values);
    if (update.acknowledged) {
      revalidatePath("/(main)/dashboard/admin/manage-product/update");
      return NextResponse.json({
        message: "Product updated successfully",
        success: true,
      });
    }
    return NextResponse.json({
      message: "Something went wrong, please try again later",
      success: false,
    });
  } catch (error) {
    return NextResponse.json({
      message: "Faild, please try again later",
      success: false,
    });
  }
};
