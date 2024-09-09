"use client";
import { ProductCategory } from "@/constants";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import { productFormSchema } from "@/lib/zod-schema/productFormSchema";
import { get } from "http";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { z } from "zod";

type ContextProviderType = {
  products: ProductInterface[] | [];
  setProducts: Dispatch<SetStateAction<ProductInterface[] | []>>;
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  createProduct: (data: productFormSchema) => Promise<any | undefined>;
  deleteProduct: (productId: string) => Promise<any | undefined>;
  updateProduct: (
    productId: string,
    data: productFormSchema
  ) => Promise<any | undefined>;
  productsCount: number;
  productPerPage: number;
  categories: string[] | [];
  setCategories: Dispatch<SetStateAction<string[] | []>>;
};

const defaultContextValue = {
  products: [],
  setProducts: () => {},
  loading: false,
  setLoading: () => {},
  createProduct: () => Promise.resolve(undefined),
  updateProduct: () => Promise.resolve(undefined),
  deleteProduct: () => Promise.resolve(undefined),
  productsCount: 0,
  productPerPage: 0,
  categories: [],
  setCategories: () => {},
};

const ContextProvider = createContext<ContextProviderType>(defaultContextValue);

export const useProductContext = () => useContext(ContextProvider);

const ProductContext = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const productPerPage = 3;
  const router = useRouter();
  const [pageNumber, setPageNumber] = useState(
    Number(searchParams.get("page")) || 1
  );
  const [categories, setCategories] = useState<string[]>([]);

  // Create product logic
  const createProduct = async (values: productFormSchema) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/products/add-product`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      return data;
    } catch (error) {
      console.error({ productAddError: error });
    } finally {
      setLoading(false);
    }
  };

  // Update product login
  const updateProduct = async (
    productId: string,
    values: productFormSchema
  ) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products/update-product?product-id=${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ values }),
        }
      );
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // delete product logic
  const deleteProduct = async (productId: string) => {
    setLoading(true);
    try {
      const res = await fetch(
        `/api/products/delete-product?productId=${productId}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );

      const data = await res.json();
      setProducts(products.filter((p) => String(p._id) !== productId));
      return data;
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  // Page number change login
  useEffect(() => {
    const page = Number(searchParams.get("page"));
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
          `/api/products/get-product?limit=${productPerPage}&skip=${calcSkip}${categoryQuery}`
        );
        const { products: dt, count } = await res.json();
        setProducts(dt);
        setProductsCount(Number(count));
      } catch (error) {
      } finally {
        setLoading(false);
      }
    })();
  }, [pageNumber, categories]);

  const value = {
    products,
    setProducts,
    loading,
    setLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    productsCount,
    productPerPage,
    categories,
    setCategories,
  };
  return (
    <ContextProvider.Provider value={value}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ProductContext;
