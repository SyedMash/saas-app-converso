import { UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import NavItems from "./NavItems";
import { auth } from "@clerk/nextjs/server";

const Navbar = async () => {
  const { userId } = await auth();

  return (
    <header>
      <nav className="custom-width h-20 flex items-center justify-between">
        <Link href={"/"}>
          <Image src={"/images/logo.svg"} alt="logo" height={40} width={40} />
        </Link>

        <div className="flex items-center gap-12">
          <div className="flex items-center gap-4">
            <NavItems />
          </div>
          <div className="">
            {userId ? (
              <div className="flex-center">
                <UserButton />
              </div>
            ) : (
              <Link href={"/sign-in"}>
                <button className="border-2 border-black py-1 px-6 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-300">
                  Sign In
                </button>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
