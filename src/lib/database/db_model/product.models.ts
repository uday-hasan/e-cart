import { ProductCategory } from "@/constants";
import { model, models, ObjectId, Schema, Types } from "mongoose";

export interface ProductInterface extends Document {
  _id: Schema.Types.ObjectId;
  productName: string;
  productImage: string;
  productDescription: string;
  productCategory: string;
  productCompany: string;
  productQuantity: number;
  minOrder: number;
  productPrice: number;
  author: Schema.Types.ObjectId;
}

const schema = new Schema<ProductInterface>({
  productName: {
    type: String,
    required: true,
  },
  productImage: {
    type: String,
    required: true,
  },
  productDescription: {
    type: String,
    required: true,
  },
  productCategory: {
    type: String,
    required: true,
    enum: ProductCategory,
    default: ProductCategory[0],
  },
  productCompany: {
    type: String,
    required: true,
  },
  productQuantity: {
    type: Number,
    required: true,
    min: 1,
  },
  minOrder: {
    type: Number,
    required: true,
    min: 1,
  },
  productPrice: {
    type: Number,
    required: true,
    min: 1,
  },
  author: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

export const Products = models.Product || model("Product", schema);
