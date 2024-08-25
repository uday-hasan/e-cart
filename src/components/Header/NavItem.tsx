"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItem = ({ item }: { item: { title: string; href: string } }) => {
  const pathName = usePathname();
  return (
    <Link
      href={item.href}
      className={`${
        pathName === item.href && "text-primary"
      } opacity-0 nav-item-sta`}
    >
      {item.title}
    </Link>
  );
};

export default NavItem;
