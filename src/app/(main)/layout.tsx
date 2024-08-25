import Navbar from "@/components/Header/Navbar";
import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default Main;
