import { connectToDB } from "@/lib/database/connectToDB";
import { Products } from "@/lib/database/db_model/product.models";
import { auth } from "@clerk/nextjs/server";
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
    const limit = req.get("limit");
    const skip = req.get("skip");
    const sortValue = Number(req.get("sort"));
    const sortQuery: { [key: string]: 1 | -1 } | { $natural: 1 } =
      req.has("sort") && (sortValue === 1 || sortValue === -1)
        ? { productPrice: sortValue as 1 | -1, createdAt: -1 }
        : { createdAt: -1 };
    // : { $natural: 1 };
    const productCategory = req.has("category") && req.getAll("category");
    const { sessionClaims } = auth();
    const isAdmin = sessionClaims && sessionClaims.isAdmin;

    const query = isAdmin ? { author: sessionClaims.userId } : {};
    const query2 = productCategory ? { productCategory } : {};
    // const res = productCategory
    //   ? await Products.find({ productCategory })
    //       .limit(Number(limit))
    //       .skip(Math.abs(Number(skip)) || 0)
    //       .sort(sortQuery)
    //   : await Products.find({})
    //       .limit(Number(limit))
    //       .skip(Number(skip) || 0)
    //       .sort(sortQuery);

    const res = await Products.find({ ...query, ...query2 })
      .limit(Number(limit))
      .skip(Number(skip) || 0)
      .sort(sortQuery);
    // const count = productCategory
    //   ? await Products.find({ productCategory }).countDocuments()
    //   : await Products.countDocuments();
    const count = await Products.find({ ...query, ...query2 }).countDocuments();
    return NextResponse.json({ products: res, count });
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ products: null });
  }
};
