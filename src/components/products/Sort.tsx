"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortItems } from "@/constants";
import { useProductContext } from "@/context/ProductContext";
const Sort = () => {
  const { setSort } = useProductContext();
  return (
    <Select
      onValueChange={(item) =>
        setSort(SortItems[item as keyof typeof SortItems])
      }
    >
      <SelectTrigger className="flex justify-end w-32">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(SortItems).map((item, idx) => (
          <SelectItem value={item} key={idx}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
