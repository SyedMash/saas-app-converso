"use client";

import { navOptions } from "@/constants";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavItems = () => {
  const pathname = usePathname();

  return (
    <>
      {navOptions.map((item, idx: number) => (
        <Link
          href={item.path}
          key={idx}
          className={clsx([
            pathname === item.path && "text-orange-500 font-semibold",
          ])}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default NavItems;
