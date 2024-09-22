import { Products } from "@/lib/database/db_model/product.models";
import { Orders } from "@/lib/database/db_model/user/order.models";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.userId) {
      return NextResponse.json({
        success: false,
        message: "Something went wrong",
      });
    }
    const params = req.nextUrl.searchParams;
    const userId = sessionClaims.userId;

    // For cart
    if (params.has("option") && params.get("option") === "cart") {
      const data = await Orders.find({
        customer: userId,
        paymentStatus: "Unpaid",
      })
        .populate({ path: "product", model: Products })
        .exec();
      return NextResponse.json({ success: true, data });
    }
    // For order-status
    if (params.has("option") && params.get("option") === "order-status") {
      const limit = Number(params.get("limit"));
      const skip = Number(params.get("skip"));
      const data = await Orders.find({
        customer: userId,
        paymentStatus: "Paid",
      })
        .limit(limit)
        .skip(skip)
        .populate({ path: "product", model: Products })
        .exec();
      const count = await Orders.find({
        customer: userId,
        paymentStatus: "Paid",
      }).countDocuments();
      return NextResponse.json({ success: true, data, count });
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Something went wrong",
    });
  }
};
