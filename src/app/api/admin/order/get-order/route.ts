import { connectToDB } from "../../../../../lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { Orders } from "@/lib/database/db_model/user/order.models";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.isAdmin) {
      return NextResponse.json({ message: "Unauthorized", success: false });
    }
    await connectToDB();
    const getOrders = await Orders.find({})
      .populate({
        path: "product",
        model: Products,
        match: { author: sessionClaims.userId },
      })
      .exec();
    const filteredProducts = getOrders.filter(
      (order) => order.product !== null
    );
    return NextResponse.json({
      success: true,
      data: filteredProducts,
      count: filteredProducts.length,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: null,
      error: JSON.stringify(error),
    });
  }
};
