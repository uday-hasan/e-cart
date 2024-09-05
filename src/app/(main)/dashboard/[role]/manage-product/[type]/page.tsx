"use client";
import Description from "@/components/dashboard/admin/Description";
import AddProductForm from "@/components/forms/AddProductForm";
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
        console.log({ products });
      } catch (error) {
        console.log({ m: error });
      } finally {
        setLoading(false);
      }
    })();
  }, [search]);
  console.log(type);
  return (
    <>
      {type === "add" ? (
        <div className="w-full px-4 md:w-1/2 mx-auto py-4 md:px-2 min-h-screen ">
          <AddProductForm type={type} title={"Add new product"} />
        </div>
      ) : search ? (
        <div className="w-full px-4 md:w-1/2 mx-auto py-4 md:px-2 min-h-screen ">
          <AddProductForm
            type={type}
            title={"Update a product"}
            productId={search!}
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 break-words px-8">
          {loading ? (
            <>
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </>
          ) : !products.length ? (
            <h1>No products</h1>
          ) : (
            products.map((item) => (
              <Description product={item} key={String(item._id)} />
            ))
          )}
        </div>
      )}
    </>
  );
};

export default AddProductPage;
