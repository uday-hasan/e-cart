import { Products } from "@/lib/database/db_model/product.models";
import { connectToDB } from "./../../../../lib/database/connectToDB";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

export const DELETE = async (request: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.isAdmin) {
      return NextResponse.json({
        message: "Admin not found",
        success: false,
      });
    }
    await connectToDB();
    const search = request.nextUrl.searchParams;
    const productId = search.get("productId");
    const res = await Products.findOneAndDelete({ _id: productId });
    if (res) {
      revalidatePath("/dashboard/admin/manage-product/update");
      return NextResponse.json({
        message: "Product deleted successfully",
        success: true,
        data: res,
      });
    }
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
};
