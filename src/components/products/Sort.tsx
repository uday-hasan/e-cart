import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { SortItems } from "@/constants";
const Sort = () => {
  return (
    <Select>
      <SelectTrigger className="flex justify-end w-32">
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(SortItems).map((item) => (
          <SelectItem value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Sort;
