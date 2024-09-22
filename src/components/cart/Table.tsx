"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CldImage } from "next-cloudinary";
import { Skeleton } from "../ui/skeleton";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import Link from "next/link";
import useOrders from "@/hooks/useOrders";
import DeliveryOptionHandle from "../dashboard/admin/manage-order-table/DeliveryOptionHandle";
import { DeliveryStatus } from "@/constants";
import { ProductInterface } from "@/lib/database/db_model/product.models";

const TableFormate = ({
  role = "user",
  option,
}: {
  role: "user" | "admin";
  option?: string;
}) => {
  const { orders, setOrders, loading, sum, countDoc, setSkip, loadMore } =
    useOrders({
      url: `option=${option}`,
      role,
    });

  const deleteOrder = async (id: string) => {
    try {
      const response = await fetch(`/api/user/order/update?orderId=${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const { success, error } = await response.json();
      if (success) {
        toast.success("Removed", { autoClose: 5500 });
        setOrders(orders.filter((order) => order._id !== id));
      }
    } catch (error) {}
  };
  const caption = role === "admin" ? "All orders" : "Your added products";
  const handleLoad = () => {
    setSkip((prev) => Number(prev) + 5);
  };
  return (
    <Table className="min-h-[80vh]">
      <TableCaption className="font-semibold text-xl">
        {loading
          ? "Loading your data..."
          : orders.length
          ? caption
          : "No items here"}
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>S.N.</TableHead>
          <TableHead className="w-[100px]">Product Name</TableHead>
          <TableHead>Product Image</TableHead>
          {role === "admin" && <TableHead>Product Quantity</TableHead>}
          <TableHead>Order Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
          {role === "admin" && (
            <>
              <TableHead className="text-right">Payment Status</TableHead>
              <TableHead className="text-right">Delivery Status</TableHead>
            </>
          )}
          {option === "order-status" && <TableHead>Order Status</TableHead>}
          {role === "user" && (
            <TableHead>
              {option !== "order-status" ? "Action" : "Payment ID"}
            </TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {loading &&
          Array.from({ length: 5 }).map((_, idx) => (
            <TableRow key={idx} className="">
              <TableCell className="h-3">
                <Skeleton className="h-3 w-full" />
              </TableCell>
              <TableCell className="h-3">
                {" "}
                <Skeleton className="w-full h-3" />
              </TableCell>
              <TableCell className="h-3">
                {" "}
                <Skeleton className="w-full h-3" />
              </TableCell>
              <TableCell className="h-3">
                {" "}
                <Skeleton className="w-full h-3" />
              </TableCell>
            </TableRow>
          ))}
        {orders.map((item, idx) => (
          <TableRow key={String(item._id)} className="cursor-pointer">
            <TableCell className="font-medium">{idx + 1}</TableCell>
            <TableCell className="font-medium">
              {(item.product as ProductInterface).productName}
            </TableCell>
            <TableCell>
              <CldImage
                src={(item.product as ProductInterface).productImage}
                alt={(item.product as ProductInterface).productName}
                width={100}
                height={100}
                crop={"fill"}
              />
            </TableCell>
            {role === "admin" && (
              <TableCell>
                {(item.product as ProductInterface).productQuantity}
              </TableCell>
            )}
            <TableCell>{item.quantity}</TableCell>
            <TableCell className="text-right">${item.amount}</TableCell>
            {role === "admin" && (
              <>
                <TableCell className="text-right">
                  {item.paymentStatus}
                </TableCell>
                <TableCell className="text-right">
                  <DeliveryOptionHandle
                    current={item.deliveryStatus as keyof typeof DeliveryStatus}
                    paymentStatus={item.paymentStatus as "Paid" | "Unpaid"}
                    orderId={String(item._id)}
                  />
                </TableCell>
              </>
            )}
            {option === "order-status" && (
              <TableCell>{item.deliveryStatus}</TableCell>
            )}
            {role === "user" && (
              <TableCell>
                <div className="flex flex-col md:flex-row gap-2">
                  {option !== "order-status" ? (
                    <Button
                      size={"default"}
                      onClick={() => deleteOrder(String(item._id))}
                    >
                      Delete
                    </Button>
                  ) : (
                    <p>{item.paymentId}</p>
                  )}
                </div>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>

      {role === "user" && option === "cart" && (
        <TableFooter>
          <TableRow>
            <TableCell className="text-right font-bold" colSpan={5}>
              Total: ${sum}
            </TableCell>
            <TableCell>
              <Link href={"/checkout"}>
                <Button
                  variant={"outline"}
                  className="disabled:cursor-not-allowed"
                  disabled={loading || !orders.length}
                >
                  Checkout
                </Button>
              </Link>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
      {option === "order-status" && (
        <TableFooter className="bg-inherit  text-center">
          <TableRow className="">
            <TableCell colSpan={7}>
              <Button
                className="disabled:cursor-not-allowed"
                variant={"outline"}
                disabled={orders.length === countDoc || loadMore}
                onClick={handleLoad}
              >
                {loadMore ? "Loading..." : "Load More"}
              </Button>
            </TableCell>
          </TableRow>
        </TableFooter>
      )}
    </Table>
  );
};

export default TableFormate;
