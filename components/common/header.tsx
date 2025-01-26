"use client";

import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes/routes";
import { auth } from "../helpers/config";
import { signOut } from "firebase/auth";
import Spinner from "./spinner";
import ConfirmationModal from "./confirmation-modal";
import { useSidebar } from "../config/sidebar-context";
import { useUser } from "../config/user-context";

function Header() {
  const { user } = useUser();
  const pathname = usePathname();
  const { isExpanded } = useSidebar();
  const router = useRouter();
  const { toggleSidebar } = useSidebar();
  const routesWithHeaderNav = [
    routes.home,
    routes.userBookingHistory,
    routes.userPersonalDetails,
    routes.userPets,
    routes.userCreateBooking,
    routes.admin,
    routes.adminBookings,
    routes.adminCustomers,
    routes.adminInventory,
    routes.adminPendingVaccines,
    routes.adminUsers,
    routes.adminVaccineInventory,
  ];
  const [jwtToken, setJwtToken] = useState<string | null>(null);
  const [loadingUser, setLoadingUser] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [signOutMessage, setSignOutMessage] = useState<any>("Confirm");
  const dropdownRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSignOut = async () => {
    try {
      setSignOutMessage(<Spinner />);
      await signOut(auth);
      setJwtToken(null);
      router.replace(routes.home);
      setModalOpen(false);
      setSignOutMessage("Confirm");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const isAdminRoute = pathname.startsWith("/admin");

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setMobileMenuOpen(false);
  };

  return (
    <div className="h-[75px] fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 sm:px-6 lg:px-10 bg-white border-b border-gray-300 border-opacity-50">
      {/* Logo and Hamburger Menu */}
      <div className="flex items-center gap-4">
        <Image
          onClick={() => router.replace(routes.home)}
          width={40}
          height={40}
          src="/svg/logo-theme.svg"
          alt="logo-img"
          className="cursor-pointer"
        />
        <span
          className="hidden md:block lg:text-xl text-lg font-bold text-primary-dark cursor-pointer"
          onClick={() => router.replace(routes.home)}
        >
          YUKIMITO
        </span>

        {/* Hamburger Menu */}
        <div className="lg:hidden">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="focus:outline-none"
          >
            <Image
              src="/svg/hamburger-menu.svg"
              alt="Hamburger Menu"
              width={24}
              height={24}
            />
          </button>
          {mobileMenuOpen && (
            <div className="absolute top-[75px] left-0 w-full bg-white z-40 p-4 shadow-md">
              <nav className="flex flex-col gap-4 text-primary-dark font-semibold">
                <span onClick={() => scrollToSection("contact")}>
                  Contact Us
                </span>
                <span onClick={() => scrollToSection("about")}>About Us</span>
                <span onClick={() => scrollToSection("rates")}>
                  Rates & Services
                </span>
                <span onClick={() => scrollToSection("requirements")}>
                  Pre-Boarding Requirements
                </span>
                <span onClick={() => scrollToSection("photos")}>Photos</span>
                <span onClick={() => scrollToSection("reviews")}>Reviews</span>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Tablet & Larger Screens Navbar */}
      <nav className="hidden lg:flex items-center gap-6 text-primary-dark">
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("contact")}
        >
          Contact Us
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("about")}
        >
          About Us
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("rates")}
        >
          Rates & Services
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("requirements")}
        >
          Pre-Boarding Requirements
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("photos")}
        >
          Photos
        </span>
        <span
          className="cursor-pointer hover:underline"
          onClick={() => scrollToSection("reviews")}
        >
          Reviews
        </span>
      </nav>

      {/* Sign In / Sign Up */}
      <div className="flex items-center gap-4">
        {loadingUser ? (
          <Spinner type="secondary" />
        ) : jwtToken ? (
          <div className="relative" ref={dropdownRef}>
            <div
              className="flex gap-1 text-primary-dark underline font-semibold cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="flex items-center justify-center w-[30px] h-[30px] bg-primary-dark text-white rounded-full">
                {auth.currentUser?.email?.charAt(0).toUpperCase()}
              </div>
              <Image
                width={16}
                height={16}
                src="/svg/dropdown-icon.svg"
                alt="dropdown-icon"
              />
            </div>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-[150px] bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                <div
                  className="px-4 py-2 text-primary-dark cursor-pointer hover:bg-gray-100"
                  onClick={() => router.replace(routes.userPersonalDetails)}
                >
                  Dashboard
                </div>
                {user?.userInfo.role !== 1 && (
                  <div
                    className="px-4 py-2 text-primary-dark cursor-pointer hover:bg-gray-100"
                    onClick={() => router.replace(routes.admin)}
                  >
                    Admin
                  </div>
                )}
                <div
                  className="px-4 py-2 text-primary cursor-pointer hover:bg-gray-100 border-t border-gray-300"
                  onClick={() => setModalOpen(true)}
                >
                  Sign Out
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              className="text-primary-dark hover:underline"
              onClick={() => router.replace(routes.register)}
            >
              Sign Up
            </button>
            <span>|</span>
            <button
              className="text-primary-dark hover:underline"
              onClick={() => router.replace(routes.login)}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      <ConfirmationModal
        type="danger"
        isOpen={modalOpen}
        title="Confirm Sign Out"
        message="Are you sure you want to sign out?"
        confirmMessage={signOutMessage}
        onConfirm={handleSignOut}
        onCancel={() => setModalOpen(false)}
      />
    </div>
  );
}

export default Header;
