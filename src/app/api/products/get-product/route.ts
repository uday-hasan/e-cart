import { connectToDB } from "@/lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await connectToDB();
    const req = request.nextUrl.searchParams;
    const hasProductId = req.has("product-id");
    if (hasProductId) {
      const productId = req.get("product-id");
      const products = await Products.findOne({ _id: String(productId) });
      return NextResponse.json({ products });
    }

    const res = await Products.find({});
    return NextResponse.json({ products: res });
  } catch (error) {
    console.log({ error });
    return NextResponse.json({ products: null });
  }
};
