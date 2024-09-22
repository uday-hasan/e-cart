import { connectToDB } from "@/lib/database/connectToDB";
import { Orders } from "@/lib/database/db_model/user/order.models";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  const { sessionClaims } = auth();
  if (!sessionClaims || !sessionClaims.isAdmin) {
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
  try {
    await connectToDB();
    const { status, orderId } = await req.json();
    const action = await Orders.updateOne(
      { _id: orderId },
      { deliveryStatus: status }
    );
    if (action.acknowledged) {
      return NextResponse.json({
        message: "Order status updated successfully",
        success: true,
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
