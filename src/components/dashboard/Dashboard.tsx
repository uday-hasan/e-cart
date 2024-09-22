"use client";
import React, { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { adminNavigationItems } from "@/constants";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Separator } from "../ui/separator";

const Dashboard = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin;
  const things = adminNavigationItems.filter((item) =>
    isAdmin ? item.isAdmin : !item.isAdmin
  );

  return (
    <Popover>
      <Button asChild variant={"outline"}>
        <PopoverTrigger>Dashboard</PopoverTrigger>
      </Button>
      <PopoverContent className="bg-primary text-primary-foreground">
        <h1 className="text-xl font-semibold my-2">
          {isAdmin ? "Admin Panel" : "Welcome"}
        </h1>
        <Separator />
        <div className="flex flex-col py-2 gap-3">
          <UserButton showName />
          <Separator />
          {things.map((item) => (
            <React.Fragment key={item.href}>
              <Link href={item.href} className="cursor-pointer">
                {/* <DropdownMenuItem className="cursor-pointer"> */}
                {item.title}
                {/* </DropdownMenuItem> */}
              </Link>
              <Separator />
            </React.Fragment>
          ))}
        </div>
        {/* <DropdownMenuSeparator /> */}
        <Button variant={"outline"} className="mt-5 hover:scale-100">
          <SignOutButton />
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default Dashboard;
