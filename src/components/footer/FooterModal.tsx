import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogTrigger,
} from "../ui/alert-dialog";

const FooterModal = ({ title }: { title: string }) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="underline">{title}</AlertDialogTrigger>
      <AlertDialogContent>
        <p className="text-sm font-bold">
          This is a demo project. But in production, we can add content about{" "}
          <span className="underline">{title}</span>
        </p>
        <AlertDialogFooter>
          <AlertDialogAction>Okay</AlertDialogAction>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FooterModal;
