"use client";
import AllProducts from "@/components/products/AllProducts";
import CategorySidebar from "@/components/products/CategorySidebar";
import Sort from "@/components/products/Sort";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ProductCategory } from "@/constants";
import { useProductContext } from "@/context/ProductContext";
import useProducts from "@/hooks/useProducts";
import React from "react";

const Products = () => {
  const { categories, productsCount } = useProductContext();
  return (
    <section className="flex  w-full mt-4">
      <div className="flex-[1]  fixed z-50 h-screen min-w-[200px]   hidden md:flex">
        <CategorySidebar />
      </div>
      <div className="flex-[3] flex flex-col  md:pl-56  relative min-h-screen">
        <div className="flex justify-between items-center p-4">
          <div>
            <h1 className="">
              Showing:{" "}
              {categories.length
                ? categories.map((item, index) => (
                    <span key={index}>
                      {
                        ProductCategory[item as keyof typeof ProductCategory]
                          .title
                      }
                      {index !== categories.length - 1 ? "," : "."}{" "}
                    </span>
                  ))
                : "All Products"}
            </h1>
            <h1>Total Products: {productsCount}</h1>
          </div>
          <div className="block md:hidden">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant={"outline"} className="hover:scale-100">
                  Category
                </Button>
              </PopoverTrigger>
              <PopoverContent>
                <CategorySidebar />
              </PopoverContent>
            </Popover>
          </div>
          <div className=" flex justify-end">
            <Sort />
          </div>
        </div>
        <AllProducts from="Products" productPerPage={6} />
      </div>
    </section>
  );
};

export default Products;
