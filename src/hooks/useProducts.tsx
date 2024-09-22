import { ProductInterface } from "@/lib/database/db_model/product.models";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const useProducts = ({ productPerPage = 6 }: { productPerPage?: number }) => {
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  const [loading, setLoading] = useState(true);
  const [productsCount, setProductsCount] = useState(0);
  const [sort, setSort] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [categories, setCategories] = useState<string[]>([]);

  // Page number change login
  useEffect(() => {
    const page = Number(searchParams.get("page")) || 1;
    setPageNumber(page);
  }, [searchParams]);

  // Pagination and category changing logic
  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const setParams = new URLSearchParams(searchParams.toString());
        const getCategory = searchParams.getAll("category");
        getCategory.length &&
          getCategory.forEach((item) => {
            categories &&
              !categories.includes(item) &&
              setParams.delete("category", item);
          });

        categories &&
          categories.length &&
          categories.forEach((item) => {
            if (!getCategory.includes(item)) {
              setParams.append("category", item);
            }
          });
        router.push(pathname + "?" + setParams.toString());

        const calcSkip = pageNumber * productPerPage - productPerPage || 0;
        const many = setParams;
        many.delete("page");
        const categoryQuery = many.has("category") ? `&${many.toString()}` : "";
        const res = await fetch(
          `/api/products/get-product?limit=${productPerPage}&skip=${calcSkip}${categoryQuery}&sort=${sort}`
        );
        const { products: dt, count } = await res.json();
        setProducts(dt);
        setProductsCount(Number(count));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [
    pageNumber,
    categories,
    sort,
    productPerPage,
    pathname,
    router,
    searchParams,
  ]);

  return {
    products,
    setProducts,
    loading,
    setLoading,
    productsCount,
    setProductsCount,
    sort,
    setSort,
    productPerPage,
    categories,
    setCategories,
  };
};

export default useProducts;
