"use client";
import Description from "@/components/dashboard/admin/Description";
import ManageProductForm from "@/components/forms/ManageProductForm";
import AllProducts from "@/components/products/AllProducts";
import Product from "@/components/products/Product";
import ProductSkeleton from "@/components/skeleton-loader/ProductSkeleton";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const AddProductPage = ({
  params: { type },
}: {
  params: { type: "add" | "update" };
}) => {
  const searchParams = useSearchParams();
  const search = searchParams.get("product-id");
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    (async () => {
      try {
        const res = await fetch(`/api/products/get-product`);
        const { products: ff } = await res.json();
        setProducts(ff);
      } catch (error) {
        console.error({ m: error });
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);
  return (
    <>
      {type === "add" ? (
        <div className="w-full px-4 md:w-1/2 mx-auto py-4 md:px-2 min-h-screen ">
          <ManageProductForm type={type} title={"Add new product"} />
        </div>
      ) : (
        search && (
          <div className="w-full px-4 md:w-1/2 mx-auto py-4 md:px-2 min-h-screen ">
            <ManageProductForm
              type={type}
              title={"Update a product"}
              productId={search!}
            />
          </div>
        )
      )}
    </>
  );
};

export default AddProductPage;
