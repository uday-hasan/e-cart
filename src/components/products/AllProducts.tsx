"use client";
import React, { useState } from "react";
import { useProductContext } from "@/context/ProductContext";

import { Button } from "../ui/button";
import Link from "next/link";
import ProductSkeleton from "../skeleton-loader/ProductSkeleton";
import PaginationPage from "./Pagination";
import Product from "./Product";
import useProducts from "@/hooks/useProducts";
import { ProductInterface } from "@/lib/database/db_model/product.models";

const AllProducts = ({
  from,
  productPerPage,
}: {
  from: string;
  productPerPage: number;
}) => {
  const { products, productsCount, loading } = useProductContext();

  return (
    <div className="mt-4">
      {loading && (
        <div className="flex flex-wrap">
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
          <ProductSkeleton />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {products?.length > 0 &&
          products.map((item, index) => {
            return <Product from={from} item={item} key={String(item._id)} />;
          })}
      </div>
      {from === "Products" && <PaginationPage />}
    </div>
  );
};

export default AllProducts;
