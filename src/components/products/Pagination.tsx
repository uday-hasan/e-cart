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
const PaginationPage = () => {
  const { productsCount, productPerPage } = useProductContext();
  const totalPages = Math.ceil((productsCount || 0) / (productPerPage || 1));
  return (
    <>
      {productsCount > productPerPage && (
        <Pagination>
          <PaginationContent>
            {[...Array(totalPages)].map((_, item) => (
              <PaginationItem key={item}>
                <Button variant={"outline"} asChild>
                  <Link href={`/products?page=${item + 1}`}>{item + 1}</Link>
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
