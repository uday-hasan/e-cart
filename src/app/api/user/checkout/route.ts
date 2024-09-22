import { Orders } from "@/lib/database/db_model/user/order.models";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe: Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const POST = async (request: NextRequest) => {
  try {
    const { sessionClaims } = auth();
    if (!sessionClaims || !sessionClaims.userId) {
      return NextResponse.json({
        message: "Something went wrong",
        success: false,
        clientSecret: null,
      });
    }
    const orders = await Orders.find({ customer: sessionClaims.userId });
    if (!orders.length) {
      return NextResponse.json({
        message: "Nothing found in cart",
        success: false,
        clientSecret: null,
      });
    }

    const price = orders.reduce((acc, cur) => {
      return acc + cur.amount;
    }, 0);
    const paymentIntent = await stripe.paymentIntents.create({
      amount: price * 100,
      currency: "eur",
      // payment_method_types: ["card"],
    });
    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);

    return NextResponse.json(
      { message: "Failed to create payment intent", clientSecret: null },
      { status: 500 }
    );
  }
};
