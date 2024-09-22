"use client";
import { Button } from "@/components/ui/button";
import React, { useCallback, useEffect, useState } from "react";
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
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useProductContext } from "@/context/ProductContext";

const DeleteButton = ({ productId }: { productId: string }) => {
  const { deleteProduct, loading, setLoading } = useProductContext();
  const [open, setOpen] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const { success, message } = await deleteProduct(id);

      if (success) {
        toast.success(message, {
          autoClose: 7000,
        });
      } else {
        toast.error(message, {
          autoClose: 7000,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      handleDeleteClose();
    }
  };
  const handleDeleteOpen = async () => {
    setOpen(true);
    const params = new URLSearchParams(searchParams);
    params.set("delete", productId);
    replace(`${pathname}?${params.toString()}`);
  };
  const handleDeleteClose = async () => {
    setOpen(false);
    const params = new URLSearchParams(searchParams);
    params.delete("delete");
    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <AlertDialog open={open}>
      <Button asChild variant={"default"}>
        <AlertDialogTrigger onClick={handleDeleteOpen}>
          Delete
        </AlertDialogTrigger>
      </Button>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure to delete this product?
          </AlertDialogTitle>
          <AlertDialogDescription>
            After delete, you can add this product fron begin, but can't
            retrive.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading} onClick={handleDeleteClose}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(productId)}
            disabled={loading}
          >
            {loading ? "Deleting" : "Confirm"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteButton;
