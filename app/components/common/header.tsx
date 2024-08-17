"use client";

import Image from "next/image";
import React from "react";
import { useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";

function Header() {
  const router = useRouter();

  return (
    <div className="h-[75px] flex justify-between px-4 lg:px-20 items-center text-white">
      <div
        className="flex gap-2 items-center cursor-pointer"
        onClick={() => {
          router.replace(routes.home);
        }}
      >
        <Image
          width={40}
          height={40}
          src="/svg/logo-theme.svg"
          alt="logo-img"
        />
        <span className="hidden lg:block text-primary-dark text-xl font-bold">
          YUKIMITO: Pet Hotel and Boarding Services
        </span>
      </div>
      <div className="flex items-center gap-4 lg:gap-5 text-[14px] lg:text-[16px] font-semibold">
        {/* Add any navigation links or icons here */}
        <div
          className="cursor-pointer text-primary-dark"
          onClick={() => {
            router.replace(routes.services);
          }}
        >
          Our Services
        </div>
        <div
          className="h-[40px] flex items-center p-5 border-[2px] border-primary-dark text-primary-dark rounded-full cursor-pointer bg-white"
          onClick={() => {
            router.replace(routes.login);
          }}
        >
          <div>Sign Up | Sign In</div>
        </div>
      </div>
    </div>
  );
}

export default Header;
