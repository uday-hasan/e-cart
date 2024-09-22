"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DeliveryStatus } from "@/constants";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "react-toastify";

const DeliveryOptionHandle = ({
  current,
  paymentStatus,
  orderId,
}: {
  current: keyof typeof DeliveryStatus;
  paymentStatus: "Paid" | "Unpaid";
  orderId: string;
}) => {
  const [state, setState] = useState<keyof typeof DeliveryStatus>(current);
  const [cur, setCur] = useState<keyof typeof DeliveryStatus>(current);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const changeSelectItem = (e: keyof typeof DeliveryStatus) => {
    setOpen(true);
    setCur(e);
  };

  const onSelectChange = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/admin/order/update-order`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          orderId,
          status: cur,
        }),
      });
      const { success, message } = await response.json();
      if (success) {
        setState(cur);
        toast.success(message, { autoClose: 5500 });
      } else {
        toast.error(message, { autoClose: 5500 });
      }
    } catch (error) {
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Select
      value={state}
      onValueChange={(e: keyof typeof DeliveryStatus) => changeSelectItem(e)}
    >
      <SelectTrigger className="w-[110px]">
        <SelectValue placeholder={current} />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(DeliveryStatus).map((item) => (
          <SelectItem key={item} value={item}>
            {DeliveryStatus[item as keyof typeof DeliveryStatus]}
          </SelectItem>
        ))}
      </SelectContent>
      <AlertDialog open={open}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="font-light text-base">
              {paymentStatus === "Paid" ? (
                cur === "Canceled" || cur === "Pending" ? (
                  <p>
                    "Payment is completed, are you sure to cancel the order?"
                  </p>
                ) : (
                  <p>
                    Are you sure to change delivery status from{" "}
                    <span className="underline">{state}</span> to{" "}
                    <span className="underline">{cur}</span>
                  </p>
                )
              ) : (
                <p>
                  Payment is not done yet. Are you sure to change order status
                  from <span className="underline">{state}</span> to{" "}
                  <span className="underline">{cur}</span>
                </p>
              )}
            </AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction onClick={onSelectChange}>
              {loading ? "Updating" : "Continue"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Select>
  );
};

export default DeliveryOptionHandle;
