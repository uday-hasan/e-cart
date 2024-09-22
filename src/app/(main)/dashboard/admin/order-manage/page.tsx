// import {
//   columns,
//   Payment,
// } from "@/components/dashboard/admin/manage-order-table/columns";
// import DataTable from "@/components/dashboard/admin/manage-order-table/ManageOrderTable";
import TableFormate from "@/components/cart/Table";
import { OrderInterface } from "@/lib/database/db_model/user/order.models";
import React from "react";

async function getData() {
  try {
    const res = await fetch(`/api/admin/order/get`);
    const { data } = await res.json();
    if (data) {
      return data;
    }
    return [];
  } catch (error) {}
}
const ManageOrder = async () => {
  const data = await getData();
  return (
    <div className="container mx-auto py-10">
      <TableFormate role="admin" />
    </div>
  );
};

export default ManageOrder;
