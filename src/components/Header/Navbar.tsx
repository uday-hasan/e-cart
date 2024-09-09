"use client";
import { navigationItems } from "@/constants";
import React, { useRef } from "react";
import NavItem from "./NavItem";
import Image from "next/image";
import Link from "next/link";
import {
  ClerkLoaded,
  ClerkLoading,
  SignedIn,
  SignedOut,
  SignInButton,
  SignOutButton,
} from "@clerk/nextjs";
import { Button } from "../ui/button";
import MobileNav from "./MobileNav";
import { Loader } from "lucide-react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Dashboard from "../dashboard/Dashboard";

const Navbar = () => {
  const timeline = gsap.timeline();
  useGSAP(() => {
    timeline.fromTo(
      "#nav-sec-title",
      { x: -100, opacity: 0 },
      { x: 0, opacity: 1, duration: 1 }
    );
    timeline.fromTo(
      ".nav-item-sta",
      {
        y: 20,
        duration: 1,
        ease: "power3.in",
        opacity: 0,
        stagger: {
          amount: 0.5,
          grid: [2, 1],
          axis: "y",
        },
      },
      {
        y: 10,
        duration: 1,
        opacity: 1,
        stagger: {
          amount: 0.5,
          grid: [2, 1],
          axis: "y",
        },
      }
    );
  }, []);
  return (
    <header
      id="navigation_bar"
      className="  border-2 flex justify-around  px-8 py-4 items-center sm:items-start sticky top-0 z-[1000]"
    >
      {/*  Site Name with Link to home page*/}
      <section id="nav-sec-title" className="opacity-0">
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
      <div className="hidden sm:block ">
        <ClerkLoading>
          <Loader className="animate-spin text-primary" />
        </ClerkLoading>

        <ClerkLoaded>
          <SignedIn>
            <Dashboard />
          </SignedIn>

          <SignedOut>
            <div className="flex gap-4 ">
              <Button variant={"outline"}>
                <SignInButton></SignInButton>
              </Button>

              <Button>
                <SignOutButton />
              </Button>
            </div>
          </SignedOut>
        </ClerkLoaded>
      </div>
      {/* Mobile Nav */}
      <section className="block sm:hidden">
        <MobileNav />
      </section>
    </header>
  );
};

export default Navbar;
