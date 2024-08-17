"use client";

import Image from "next/image";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const routesWithHeaderNav = [routes.home];

  return (
    <div className="h-[75px] flex justify-between px-4 sm:px-6 lg:px-20 items-center text-white">
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
        <span className="hidden sm:block lg:text-xl text-lg font-bold text-primary-dark">
          YUKIMITO: Pet Hotel and Boarding Services
        </span>
      </div>
      {routesWithHeaderNav.includes(pathname) && (
        <div className="flex items-center gap-2 sm:gap-3 lg:gap-5 text-sm sm:text-base lg:text-lg font-semibold">
          {/* Add any navigation links or icons here */}
          <div
            className="cursor-pointer text-primary-dark"
            onClick={() => {
              router.replace(routes.services);
            }}
          >
            Our Services
          </div>
          <div className="h-[40px] flex items-center px-4 py-2 border-2 border-primary-dark text-primary-dark rounded-full bg-white">
            <div>
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.replace(routes.register);
                }}
              >
                Sign Up{" "}
              </span>
              |{" "}
              <span
                className="cursor-pointer"
                onClick={() => {
                  router.replace(routes.login);
                }}
              >
                Sign In
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
