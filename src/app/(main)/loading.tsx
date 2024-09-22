import { Loader } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <div className="w-screen h-screen flex justify-center items-center">
      <Loader className="animate-spin" size={60} />
    </div>
  );
};

export default Loading;
