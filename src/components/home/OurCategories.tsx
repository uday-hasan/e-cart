import { ProductCategory } from "@/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SectionTitle from "../SectionTitle";

const OurCategories = () => {
  return (
    <section className="relative ">
      {/* Section Title */}
      <SectionTitle title="Explore Our Categories" />
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6 overflow-hidden">
        {Object.keys(ProductCategory).map((item) => {
          const { path, title } =
            ProductCategory[item as keyof typeof ProductCategory];
          return (
            <div
              key={path}
              className="space-y-2 transition-all duration-500 hover:cursor-pointer hover:scale-150"
            >
              <Link href={`/products?category=${item}`} className="space-y-2">
                <div className="h-[15em]  ">
                  <Image
                    src={path}
                    alt={title}
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h1 className="text-2xl font-bold">{title}</h1>
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OurCategories;
