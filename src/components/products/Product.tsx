import { ProductInterface } from "@/lib/database/db_model/product.models";
import React, { useState } from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { CldImage } from "next-cloudinary";
import { ProductCategory } from "@/constants";
import { Button } from "../ui/button";
import Link from "next/link";
import DeleteButton from "../dashboard/admin/DeleteButton";

const Product = ({ item }: { item: ProductInterface }) => {
  const {
    productName,
    productCategory,
    productCompany,
    productDescription,
    productImage,
    productPrice,
    productQuantity,
    minOrder,
    _id,
  } = item;
  const [open, setOpen] = useState(false);

  return (
    <Collapsible
      onOpenChange={(value) => setOpen(value)}
      className="flex flex-col p-4 gap-3  shadow-primary shadow-sm rounded-sm"
    >
      <div>
        <CldImage
          src={productImage}
          alt={productName}
          //   fill
          className="object-cover"
          width={300}
          height={300}
          crop={"fill"}
        />
      </div>
      <h1 className="font-bold text-lg">Name: {productName}</h1>
      <h1 className="font-semibold text-base">
        Product Category:
        {ProductCategory[productCategory as keyof typeof ProductCategory]}
      </h1>
      <h1 className="font-semibold text-base">
        Product Price: ${productPrice}
      </h1>
      <h1 className="font-semibold text-base">
        Product Quantity: {productQuantity}
      </h1>
      <h1 className="font-semibold text-base">Minimum Order: {minOrder}</h1>
      <h1 className="font-semibold text-base">Brand: {productCompany}</h1>

      <p>
        {productDescription.length >= 15
          ? !open && (
              <span>
                {productDescription.slice(0, 15)} &nbsp;
                <CollapsibleTrigger className="underline">
                  Read more.
                </CollapsibleTrigger>
              </span>
            )
          : productDescription}
      </p>

      {open && (
        <CollapsibleContent>
          <p>
            {productDescription}&nbsp;{" "}
            <span
              className="underline cursor-pointer"
              onClick={() => {
                setOpen(false);
              }}
            >
              Show Less
            </span>
          </p>
        </CollapsibleContent>
      )}
      <div className="space-x-4">
        <Button variant={"outline"} asChild>
          <Link
            href={`/dashboard/admin/manage-product/update?product-id=${_id}`}
          >
            Update
          </Link>
        </Button>
        <DeleteButton productId={String(_id)} />
      </div>
    </Collapsible>
  );
};

export default Product;
