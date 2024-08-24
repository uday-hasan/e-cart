import { navigationItems } from "@/constants";
import React from "react";
import NavItem from "./NavItem";
import Image from "next/image";
import Link from "next/link";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";

const Navbar = () => {
  return (
    <header className="border-2 flex justify-around py-4 px-8 items-center static top-0">
      {/*  Site Name with Link to home page*/}
      <section>
        <Button asChild variant={"outline"}>
          <Link href={"/"} className="text-base">
            <h1>
              Make your <span className="section_title ">DRONE</span>
            </h1>
          </Link>
        </Button>
      </section>
      <nav className="gap-4 hidden sm:flex">
        {navigationItems.map((item) => (
          <NavItem key={item.href} item={item} />
        ))}
      </nav>
      <div className="hidden sm:block">
        <SignedIn>
          <Button>DashBoard</Button>
        </SignedIn>
        <SignedOut>
          <SignInButton></SignInButton>
        </SignedOut>
      </div>
      {/* Mobile Nav */}
      <section className="block sm:hidden">
        <MobileNav />
      </section>
    </header>
  );
};

export default Navbar;
