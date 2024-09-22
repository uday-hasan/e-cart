"use client";
import React from "react";
import {
  Carousel as CR,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "@/components/ui/card";
const Carousel = () => {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  );
  return (
    <CR
      plugins={[plugin.current]}
      className="w-full max-w-xs"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent className="border-4 w-full mx-auto">
        {Array.from({ length: 3 }).map((_, index) => (
          <CarouselItem
            key={index}
            className="border-4 border-yellow-400 w-full"
          >
            <div className="p-1 w-[200px] h-[200px]">
              <Image
                src={`/assets/slider/slide${index + 1}.jpg`}
                alt={"Slide Image" + index + 1}
                fill
                className="object-contain w-full h-full"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </CR>
  );
};

export default Carousel;
