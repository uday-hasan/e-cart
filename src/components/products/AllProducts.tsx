"use client";
import React from "react";
import { useProductContext } from "@/context/ProductContext";

import { Button } from "../ui/button";
import Link from "next/link";
import ProductSkeleton from "../skeleton-loader/ProductSkeleton";
import PaginationPage from "./Pagination";
import Product from "./Product";

const AllProducts = () => {
  const { products, productsCount, loading } = useProductContext();
  if (loading) {
    return (
      <>
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
        <ProductSkeleton />
      </>
    );
  }
  return (
    <div className="">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products?.length > 0 &&
          products.map((item) => (
            <Product item={item} key={String(item._id)} />
          ))}
      </div>
      <PaginationPage />
    </div>
  );
};

export default AllProducts;
