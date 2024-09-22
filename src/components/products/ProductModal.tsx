"use client";
import React, { useState } from "react";

import { Button } from "../ui/button";
import { SignIn, useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { ProductInterface } from "@/lib/database/db_model/product.models";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { CldImage } from "next-cloudinary";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
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
} from "../ui/alert-dialog";

const ProductModal = ({ item }: { item: ProductInterface }) => {
  const { user } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const handleClick = () => {
    if (!user) {
      toast.error("Please login first to purchase", { autoClose: 5000 });
      router.push("/signin");
      return;
    } else {
      setOpen(true);
    }
  };
  const handleClose = () => {
    setOpen(false);
  };
  const {
    productCategory,
    productCompany,
    productDescription,
    productImage,
    productName,
    productPrice,
    productQuantity,
    minOrder,
    _id,
  } = item;
  const [orderQuantity, setOrderQuantity] = useState<number>(minOrder);
  const [newPrice, setNewPrice] = useState(productPrice * minOrder);
  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    try {
      const data = {
        product: _id,
        amount: newPrice,
        quantity: orderQuantity,
        customer: user?.publicMetadata?.userId,
      };
      const response = await fetch(`/api/user/order/create`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const { success, message, order } = await response.json();
      if (success) {
        toast.success(message, { autoClose: 5000 });
        handleClose();
      } else {
        toast.error(message, {
          autoClose: 5000,
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <AlertDialog open={open}>
        <AlertDialogTrigger asChild>
          <Button variant="outline" onClick={handleClick}>
            Purchase
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{productName} Details</AlertDialogTitle>
            <AlertDialogDescription>
              <div className="space-y-2 text-base font-semibold">
                <h1>Minimum order: {minOrder}</h1>
                <h1>Price(unit): ${productPrice}</h1>
                <div className="space-y-2">
                  <Label htmlFor="orderQuantity" className="font-semibold">
                    Order Quantity
                  </Label>
                  <Input
                    defaultValue={minOrder || 1}
                    type="number"
                    onChange={(e) => {
                      setOrderQuantity(Number(e.target.value));
                      Number(e.target.value) > minOrder
                        ? setNewPrice(Number(e.target.value) * productPrice)
                        : setNewPrice(minOrder * productPrice);
                    }}
                    value={orderQuantity}
                    className="focus-visible:bg-primary/90"
                  />
                  {orderQuantity < minOrder && (
                    <p className="text-error text-sm font-light">
                      Minimum product price must be greater than {minOrder}
                    </p>
                  )}
                </div>
                <h1 className="font-bold">Total: ${newPrice}</h1>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleClose}>Cancel</AlertDialogCancel>
            <AlertDialogAction disabled={loading} onClick={() => addToCart()}>
              {loading ? "Waiting" : "Purchase"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ProductModal;
