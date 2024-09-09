import AllProducts from "@/components/products/AllProducts";
import CategorySidebar from "@/components/products/CategorySidebar";
import Sort from "@/components/products/Sort";
import React from "react";

const Products = () => {
  return (
    <section className="flex sticky top-0">
      <div className="flex-[1] h-[200vh] sticky top-0 border-2 border-yellow-400">
        <CategorySidebar />
      </div>
      <div className="flex-[3] flex flex-col border-2 border-blue-500 relative">
        <div className="flex justify-between items-center">
          <h1 className="">Showing: All Products</h1>
          <div className=" flex justify-end">
            <Sort />
          </div>
        </div>
        <AllProducts />
      </div>
    </section>
  );
};

export default Products;
