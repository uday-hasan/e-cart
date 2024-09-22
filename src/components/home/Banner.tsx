"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { TextPlugin } from "gsap/all";
import Image from "next/image";
import React from "react";
gsap.registerPlugin(TextPlugin);

const Banner = () => {
  const timeline = gsap.timeline();
  gsap.defaults({ ease: "none" });
  useGSAP(() => {
    timeline.to("#banner-text-1", {
      delay: 1,
      opacity: 1,
      top: 0,
      duration: 1,
    });
    gsap.to("#bannerText", {
      delay: 2,
      duration: 3,
      text: {
        value: ", and make yourself pleased.",
        newClass: "font-bold italic text-primary-foreground",
      },
    });
    gsap.to("#banner-image", {
      delay: 3,
      x: "0px",
      duration: 2,
      right: "0px",
    });
  }, []);
  return (
    <section className="flex justify-evenly p-10  overflow-x-hidden min-h-screen items-center">
      <div className="flex flex-col  flex-1  items-end justify-center pr-10">
        <h1 className="text-3xl font-bold">
          <span id="banner-text-1" className="opacity-0 relative top-20">
            Buy your products from us
          </span>{" "}
          <span id="bannerText"></span>
        </h1>
      </div>
      <div id="banner-image" className="flex-1 relative -right-[800px]">
        <Image
          src={"/assets/images/home/p.jpg"}
          alt="Home Banner"
          width={600}
          height={600}
          className=" w-full"
        />
      </div>
    </section>
  );
};

export default Banner;
