"use client";
import React, { useEffect } from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ProductCategory } from "@/constants";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";

const CategorySidebar = () => {
  const { setCategories, categories } = useProductContext();
  const params = useSearchParams();
  const categoryList = params.has("category") && params.getAll("category");
  useEffect(() => {
    if (categoryList && categoryList.length > 0) {
      setCategories((prev) => {
        const updatedCategories = categoryList.filter(
          //@ts-ignore
          (item) => !prev.includes(item)
        );
        return [...prev, ...updatedCategories];
      });
    }
  }, []);
  const handleCheckedChanged = (checked: boolean, item: string) => {
    setCategories((prev) => {
      if (checked) {
        return [...prev, item];
      } else {
        return prev.filter((cat) => cat !== item);
      }
    });
  };
  return (
    <div>
      {Object.keys(ProductCategory).map((value) => {
        const item = value as string;
        return (
          <div
            id={item}
            key={item}
            className=" flex gap-2 px-8 py-4 items-center "
          >
            <Checkbox
              checked={categoryList && categoryList.includes(item as string)}
              onCheckedChange={(checked: boolean) =>
                handleCheckedChanged(checked, item)
              }
              className="border-2 border-primary-foreground cursor-pointer"
              id={item}
            />
            <Label
              htmlFor={item}
              className="font-extralight text-base cursor-pointer"
            >
              {ProductCategory[item as keyof typeof ProductCategory].title}
            </Label>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default CategorySidebar;
