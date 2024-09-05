import AddProduct from "@/components/dashboard/admin/AddProduct";
import AllProduct from "@/components/dashboard/admin/AllProduct";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ManageProduct = () => {
  return (
    <div>
      {/* Add Product */}
      <div className="flex gap-6 p-4 ">
        <Link
          href={"/dashboard/admin/manage-product/add"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={"/assets/icons/add.svg"}
            alt="Add Icon"
            width={40}
            height={40}
            className="invert"
          />
          <h1 className="text-xl font-semibold">Add Product</h1>
        </Link>
        <Link
          href={"/dashboard/admin/manage-product/update"}
          className="flex flex-col items-center justify-center"
        >
          <Image
            src={"/assets/icons/update.svg"}
            alt="Update Icon"
            width={40}
            height={40}
            className="invert"
          />
          <h1 className="text-xl font-semibold">Update Product</h1>
        </Link>
      </div>
      {/* <AddProductForm /> */}
    </div>
  );
};

export default ManageProduct;
