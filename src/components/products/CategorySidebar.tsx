"use client";
import React from "react";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { ProductCategory } from "@/constants";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";

const CategorySidebar = () => {
  const { setCategories, categories } = useProductContext();

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
          <div key={item}>
            <Checkbox
              // checked={categories.includes(item)}
              onCheckedChange={(checked: boolean) =>
                handleCheckedChanged(checked, item)
              }
            />
            <Label htmlFor={item}>
              {ProductCategory[item as keyof typeof ProductCategory]}
            </Label>
          </div>
        );
      })}
      ;
    </div>
  );
};

export default CategorySidebar;
