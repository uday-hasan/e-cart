"use client";
import { ProductCategory } from "@/constants";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import { productFormSchema } from "@/lib/zod-schema/productFormSchema";
import { get } from "http";
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
  sort: number;
  setSort: Dispatch<SetStateAction<number>>;
};

const defaultContextValue = {
  loading: false,
  setLoading: () => {},
  createProduct: () => Promise.resolve(undefined),
  updateProduct: () => Promise.resolve(undefined),
  deleteProduct: () => Promise.resolve(undefined),
  productsCount: 0,
  productPerPage: 0,
  categories: [],
  setCategories: () => {},
  sort: 0,
  setSort: () => {},
};

const ContextProvider = createContext<ContextProviderType>(defaultContextValue);

export const useProductContext = () => useContext(ContextProvider);

const ProductContext = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductInterface[] | []>([]);
  const [loading, setLoading] = useState(false);
  const [productsCount, setProductsCount] = useState(0);
  const [sort, setSort] = useState(0);
  const productPerPage = 6;
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
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const value = {
    loading,
    setLoading,
    createProduct,
    updateProduct,
    deleteProduct,
    productsCount,
    productPerPage,
    categories,
    setCategories,
    sort,
    setSort,
  };
  return (
    <ContextProvider.Provider value={value}>
      {children}
    </ContextProvider.Provider>
  );
};

export default ProductContext;
