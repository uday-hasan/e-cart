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
import { UserButton, useUser } from "@clerk/nextjs";
import { Button } from "../ui/button";
import Link from "next/link";
import { adminNavigationItems } from "@/constants";

const Dashboard = () => {
  const { user } = useUser();
  const isAdmin = user?.publicMetadata?.isAdmin;

  return (
    <DropdownMenu>
      <Button asChild variant={"outline"}>
        <DropdownMenuTrigger>Dashboard</DropdownMenuTrigger>
      </Button>
      <DropdownMenuContent>
        <DropdownMenuLabel>
          {isAdmin ? "ADMIN PANEL" : "WELCOME"}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {adminNavigationItems.map((item) => (
          <Link href={item.href} className="cursor-pointer">
            <DropdownMenuItem className="cursor-pointer">
              {item.title}
            </DropdownMenuItem>
          </Link>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Dashboard;
