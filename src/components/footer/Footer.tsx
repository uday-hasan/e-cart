import React from "react";
import FooterModal from "./FooterModal";

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <footer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8  place-items-center py-7  bg-primary/30    ">
      <div className="flex flex-col gap-4 items-start">
        <h1>
          <span className=" text-xl">E Cart</span>
        </h1>
        <FooterModal title="Privacy Policy" />
        <FooterModal title="Order Policy" />
        <FooterModal title="Refund Policy" />
      </div>
      <div>
        <h1>
          All rights reserved by{" "}
          <span className="italic font-bold">E Cart</span> {year}
        </h1>
      </div>
      <div className="space-y-3">
        <h1>
          <span className=" text-xl">Contact Information</span>
        </h1>
        <p className="font-semibold text-sm">Email: ecart@test.com</p>
        <p className="font-semibold text-sm">Mobile: +123 456789</p>
        <p className="font-semibold text-sm">Address: Park Street</p>
        <p className="font-semibold text-sm">APK: Coming Soon</p>
      </div>
    </footer>
  );
};

export default Footer;
