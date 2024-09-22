import Footer from "@/components/footer/Footer";
import Navbar from "@/components/Header/Navbar";
import React from "react";

const Main = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Main;
