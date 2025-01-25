"use client";

import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes/routes";
import { useSidebar } from "../config/sidebar-context";
import Image from "next/image";
import { useState } from "react";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { isExpanded, toggleSidebar } = useSidebar(); 

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const isActiveRoute = (route: string) => pathname === route;

  const getIconSrc = (baseSrc: string, isActive: boolean) =>
    isActive ? baseSrc.replace(".svg", "-active.svg") : baseSrc;

  const navItems = [
    { label: "Create Booking", route: routes.userCreateBooking, icon: "/svg/booking-tab-icon.svg" },
    { label: "Personal Details", route: routes.userPersonalDetails, icon: "/svg/personal-details.svg" },
    { label: "My Pets", route: routes.userPets, icon: "/svg/inventory-tab-icon.svg" },
    { label: "Bookings", route: routes.userBookingHistory, icon: "/svg/pending-vaccine-tab-icon.svg" },
  ];

  return (
    <><aside
      className={`z-30 fixed top-[64px] bottom-0 left-0 flex flex-col justify-between ${isExpanded ? "w-[290px] lg:w-[300px]" : "w-[80px]"} bg-white shadow-lg transition-all duration-300`}
      style={{ padding: 0, margin: 0 }}
    >
      {/* Navigation Items */}
      <div className="flex flex-col mt-10 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.route}
            className={`flex items-center ${isExpanded ? "pl-6" : "justify-center"} h-[50px] text-primary-dark hover:bg-gray-100 ${isActiveRoute(item.route) ? "bg-[#FFF9F2]" : ""}`}
            onClick={() => navigateTo(item.route)}
          >
            <Image
              src={getIconSrc(item.icon, isActiveRoute(item.route))}
              alt={`${item.label}-icon`}
              width={20}
              height={20} />
            {isExpanded && <span className="ml-4">{item.label}</span>}
          </button>
        ))}
      </div>
    </aside>
    <div className={`flex flex-col px-8 transition-all duration-300 ${isExpanded ? "ml- 0" : "ml-0"}`} style={{ paddingLeft: 20, marginLeft: 0 }}>
    </div></>
  );
};

export default Sidebar;
