import React from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

const AlertShow = ({
  type,
  message,
}: {
  type: "Success" | "Error";
  message: string;
}) => {
  return (
    <Alert variant={type === "Error" ? "default" : "destructive"}>
      <AlertTitle>{type}</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  );
};

export default AlertShow;
