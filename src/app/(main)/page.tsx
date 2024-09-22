import Carousel from "@/components/carousel/Carousel";
import Banner from "@/components/home/Banner";
import Latest from "@/components/home/Latest";
import OurCategories from "@/components/home/OurCategories";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col gap-10">
      <Banner />
      <OurCategories />
      <Latest />
    </main>
  );
}
