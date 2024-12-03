"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "../ui/button";
import Link from "next/link";
import { useProductContext } from "@/context/ProductContext";
import { useSearchParams } from "next/navigation";
import useProducts from "@/hooks/useProducts";
const PaginationPage = () => {
  const { productsCount, productPerPage } = useProductContext();
  const totalPages = Math.ceil((productsCount || 0) / (productPerPage || 1));
  const searchParams = useSearchParams();
  const cur = Number(searchParams.get("page")) || 1;

  return (
    <>
      {productsCount > productPerPage && (
        <Pagination>
          <PaginationContent>
            {[...Array(totalPages)].map((_, item) => (
              <PaginationItem key={item}>
                <Button
                  variant={"outline"}
                  asChild
                  className={`${
                    Number(Number(item) + 1) === cur
                      ? "bg-primary text-primary-foreground scale-105"
                      : ""
                  }`}
                >
                  <Link href={`/products?page=${Number(Number(item) + 1)}`}>
                    {Number(Number(item) + 1)}
                  </Link>
                </Button>
              </PaginationItem>
            ))}
          </PaginationContent>
        </Pagination>
      )}
    </>
  );
};

export default PaginationPage;
