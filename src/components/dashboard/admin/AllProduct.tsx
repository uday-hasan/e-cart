"use client";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import React, { useEffect, useState } from "react";

const AllProduct = () => {
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  useEffect(() => {
    (async () => {
      const data = await fetch("/api/products/get-product");
      const { products } = await data.json();
      setProducts(products);
    })();
  }, []);
  return <div>{products.length}</div>;
};

export default AllProduct;
