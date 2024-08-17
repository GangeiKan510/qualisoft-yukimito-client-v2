"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";
import { auth } from "../helpers/config";
import { signOut } from "firebase/auth";
import Spinner from "./spinner";

function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const routesWithHeaderNav = [routes.home];
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const getToken = async () => {
      setLoadingUser(true);
      try {
        auth.onAuthStateChanged(async (user) => {
          if (user) {
            const idToken = await user.getIdToken(true);
            setJwtToken(idToken);
          } else {
            setJwtToken(null);
          }
          setLoadingUser(false);
        });
      } catch (error) {
        console.error(error);
        setJwtToken(null);
        setLoadingUser(false);
      }
    };

    getToken();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setJwtToken(null);
      router.replace(routes.home);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="h-[75px] flex justify-between px-4 sm:px-6 lg:px-20 items-center text-white relative">
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
          <div
            className="cursor-pointer text-primary-dark"
            onClick={() => {
              router.replace(routes.services);
            }}
          >
            Our Services
          </div>
          {loadingUser ? (
            <Spinner type="secondary" />
          ) : jwtToken ? (
            <div className="relative">
              <div
                className="flex gap-1 text-primary-dark underline underline-offset-4 font-semibold cursor-pointer"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              >
                {auth.currentUser?.email}
                <Image
                  width={16}
                  height={16}
                  src="/svg/dropdown-icon.svg"
                  alt="dropdown-icon"
                />
              </div>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <div
                    className="flex gap-1 justify-center px-4 py-2 text-primary-dark cursor-pointer hover:bg-gray-100 rounded-t-lg"
                    onClick={handleSignOut}
                  >
                    Sign Out
                    <Image
                      width={16}
                      height={16}
                      src="/svg/sign-out-icon.svg"
                      alt="signout-icon"
                    />
                  </div>
                </div>
              )}
            </div>
          ) : (
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
          )}
        </div>
      )}
    </div>
  );
}

export default Header;
