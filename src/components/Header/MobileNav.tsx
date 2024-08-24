import React from "react";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { AlignJustify } from "lucide-react";
import { navigationItems } from "@/constants";
import NavItem from "./NavItem";
import { Separator } from "../ui/separator";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "../ui/button";

const MobileNav = () => {
  return (
    <Sheet>
      <SheetTrigger>
        <AlignJustify />
      </SheetTrigger>
      <SheetContent className="max-w-[200px] flex flex-col justify-between">
        <nav className="flex flex-col gap-4">
          {navigationItems.map((item) => (
            <div key={item.href} className="flex flex-col">
              <NavItem item={item} />
              <Separator className="border-primary" />
            </div>
          ))}
        </nav>
        <div>
          <SignedIn>
            <Button>Dashboard</Button>
          </SignedIn>
          <SignedOut>
            <SignInButton></SignInButton>
          </SignedOut>
          <Separator />
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileNav;
