import { ProductInterface } from "./../product.models";
import Product from "@/components/products/Product";
import { DeliveryStatus } from "@/constants";
import { model, models } from "mongoose";
import { Document } from "mongoose";
import { Schema } from "mongoose";

export interface OrderInterface extends Document {
  product: Schema.Types.ObjectId | ProductInterface;
  paymentId?: string;
  amount: number;
  paymentStatus: string;
  deliveryStatus: string;
  quantity: number;
  customer: Schema.Types.ObjectId;
}

const orderSchema = new Schema<OrderInterface>(
  {
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Product",
    },
    paymentId: String,
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    paymentStatus: {
      type: String,
      required: true,
      enum: ["Unpaid", "Paid"],
      default: "Unpaid",
    },
    deliveryStatus: {
      type: String,
      required: true,
      enum: Object.keys(DeliveryStatus),
      default: Object.keys(DeliveryStatus)[0],
    },
    quantity: {
      type: Number,
      required: true,
    },
    customer: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Orders = models.Order || model("Order", orderSchema);
