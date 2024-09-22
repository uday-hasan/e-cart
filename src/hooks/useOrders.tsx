"use client";
import { OrderInterface } from "@/lib/database/db_model/user/order.models";
import { count } from "console";
import React, { useEffect, useState } from "react";

const useOrders = ({
  url = "",
  role = "user",
}: {
  url?: string;
  role?: "user" | "admin";
}) => {
  const [orders, setOrders] = useState<OrderInterface[] | []>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const [skip, setSkip] = useState<number>(0);
  const [countDoc, setCountDoc] = useState<number>(0);
  const [loadMore, setLoadMore] = useState<boolean>(false);

  useEffect(() => {
    (async () => {
      skip > 0 ? setLoadMore(true) : setLoading(true);
      try {
        const link =
          role === "admin"
            ? `/api/admin/order/get-order?limit=${limit}&skip=${skip}`
            : `/api/user/order/get-order?${url}&limit=${limit}&skip=${skip}`;
        const response = await fetch(link);
        const { success, data, count } = await response.json();
        if (success) {
          // setOrders(data);
          setOrders((prev) => {
            if (!skip) {
              return data;
            } else {
              return [...prev, ...data];
            }
          });
          setCountDoc(count);
        }
      } catch (error) {
      } finally {
        setLoading(false);
        setLoadMore(false);
      }
    })();
  }, [url, role, skip, limit]);
  const sum = orders.reduce((acc, cur) => {
    return acc + cur.amount;
  }, 0);
  return {
    orders,
    setOrders,
    loading,
    setLoading,
    sum,
    skip,
    setSkip,
    countDoc,
    loadMore,
    setLoadMore,
    limit,
    setLimit,
  };
};

export default useOrders;
