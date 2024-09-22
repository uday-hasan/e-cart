import React from "react";
import SectionTitle from "../SectionTitle";
import AllProducts from "../products/AllProducts";
import { Button } from "../ui/button";
import Link from "next/link";

const Latest = () => {
  return (
    <div className="mt-9 px-8">
      <SectionTitle title="Explore Latest Products" />
      <AllProducts from="Home" productPerPage={3} />
      <div className="w-full flex justify-center mt-5 ">
        <Button asChild>
          <Link href={"/products"}>Explore More...</Link>
        </Button>
      </div>
    </div>
  );
};

export default Latest;
