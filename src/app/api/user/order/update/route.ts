import { DeliveryStatus } from "@/constants";
import { Products } from "@/lib/database/db_model/product.models";
import { Orders } from "@/lib/database/db_model/user/order.models";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const PUT = async (req: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.userId) {
      return NextResponse.json({
        message: "Unauthorized or user not found",
        success: false,
      });
    }
    const params = req.nextUrl.searchParams;
    const body = await req.json();
    // Update payment status

    if (
      params.has("update-payment-status") &&
      params.get("update-payment-status") === "true"
    ) {
      const { paymentId } = body;
      const updateOrders = await Orders.updateMany(
        {
          customer: sessionClaims.userId,
          paymentStatus: "Unpaid",
        },
        {
          $set: {
            paymentId,
            paymentStatus: "Paid",
            deliveryStatus: "Received" as keyof typeof DeliveryStatus,
          },
        }
      );
      if (updateOrders.acknowledged) {
        const getOrders = await Orders.find({ paymentStatus: "Paid" });
        const bulkOperations = getOrders.map((order) => ({
          updateOne: {
            filter: { _id: order.product },
            update: { $inc: { productQuantity: -order.quantity } },
          },
        }));

        const aa = await Products.bulkWrite(bulkOperations);
        return NextResponse.json({
          message: "Payment Received",
          success: true,
        });
      }
    }
  } catch (err0r) {
    console.error(err0r);
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
};

export const DELETE = async (request: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.userId) {
      return NextResponse.json({
        message: "Unauthorized",
        success: false,
      });
    }
    const userId = sessionClaims.userId;
    const role = !sessionClaims.isAdmin ? "user" : "admin";
    const req = request.nextUrl.searchParams;
    const orderId = req.get("orderId");
    const deleteOrder = await Orders.deleteOne({
      _id: orderId,
      customer: userId,
    });
    if (deleteOrder.acknowledged) {
      const path = `/dashboard/${role}/cart`;
      revalidatePath(path, "page");
      revalidatePath("/dashboard/[role]/cart");
      revalidatePath("/dashboard/user/cart", "page");
      return NextResponse.json({
        message: "Order deleted successfully",
        success: true,
      });
    }
  } catch (error) {
    return NextResponse.json({
      message: "Something went wrong",
      success: false,
    });
  }
};
