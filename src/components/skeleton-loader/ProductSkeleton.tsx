import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const ProductSkeleton = () => {
  return (
    <div className="flex flex-col items-center mx-auto gap-3 border-2 shadow-sm w-72 p-6 shadow-primary mt-5">
      <Skeleton className="w-64 h-64 rounded-lg" />
      <Skeleton className="w-52 h-4" />
    </div>
  );
};

export default ProductSkeleton;
