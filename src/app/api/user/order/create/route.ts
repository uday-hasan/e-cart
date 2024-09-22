import { connectToDB } from "@/lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { Orders } from "@/lib/database/db_model/user/order.models";
import { useAuth, useUser } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.userId) {
      return NextResponse.json({
        success: false,
        message: "Unauthorized",
      });
    }
    if (sessionClaims.isAdmin) {
      return NextResponse.json({
        success: false,
        message: "Admin can't create order right now",
      });
    }
    await connectToDB();
    const body = await req.json();
    const { product } = body;
    const isExist = await Orders.findOne({
      product,
      customer: sessionClaims.userId,
      paymentStatus: "Unpaid",
    });
    if (isExist) {
      return NextResponse.json({
        success: false,
        message: "Items already added to cart",
      });
    }
    const findProduct = await Products.findOne({ _id: body.product });
    if (!findProduct) {
      return NextResponse.json({
        message: "Product not found",
        order: null,
        success: false,
      });
    }
    if (findProduct.minOrder > body.quantity) {
      return NextResponse.json({
        message: "Minimum quantity is " + findProduct.minOrder,
        order: null,
        success: false,
      });
    }

    const newOrder = new Orders(body);
    const finalOrder = await newOrder.save();
    revalidatePath("/dashboard/user/cart");
    return NextResponse.json({
      message: "Order created successfully",
      order: finalOrder,
      success: true,
    });
  } catch (error: any) {
    console.error({ error });
    return NextResponse.json({
      error: error.message || "Something went wrong",
    });
  }
};
