"use client";

import { usePathname, useRouter } from "next/navigation";
import { routes } from "@/utils/routes/routes";
import { useUser } from "../config/user-context";
import { useSidebar } from "../config/sidebar-context";
import Image from "next/image";

const Sidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const pathname = usePathname();
  const { isExpanded } = useSidebar();

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const isActiveRoute = (route: string) => pathname === route;

  const getIconSrc = (baseSrc: string, isActive: boolean) =>
    isActive ? baseSrc.replace(".svg", "-active.svg") : baseSrc;

  const navItems = [
    { label: "Bookings", route: routes.adminBookings, icon: "/svg/booking-tab-icon.svg" },
    { label: "Product Inventory", route: routes.adminInventory, icon: "/svg/inventory-tab-icon.svg" },
    { label: "Vaccine Inventory", route: routes.adminVaccineInventory, icon: "/svg/pending-vaccine-tab-icon.svg" },
    { label: "Pets", route: routes.adminPendingVaccines, icon: "/svg/vaccine-inventory.svg" },
  ];
  

  const adminItems = [
    { label: "Users", route: routes.adminCustomers, icon: "/svg/manage-customers-tab.svg" },
    { label: "Admin Users", route: routes.adminUsers, icon: "/svg/manage-accounts-tab.svg" },
  ];

  return (
    <aside
      className={`z-30 fixed top-[64px] bottom-0 left-0 flex flex-col justify-between ${
        isExpanded ? "w-[290px] lg:w-[300px]" : "w-[80px]"
      } bg-white shadow-lg transition-all duration-300`}
    >

      {/* Navigation Items */}
      <div className="flex flex-col mt-10 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.route}
            className={`flex items-center ${
              isExpanded ? "pl-6" : "justify-center"
            } h-[50px] text-primary-dark hover:bg-gray-100 ${
              isActiveRoute(item.route) ? "bg-[#FFF9F2]" : ""
            }`}
            onClick={() => navigateTo(item.route)}
          >
            <Image
              src={getIconSrc(item.icon, isActiveRoute(item.route))}
              alt={`${item.label}-icon`}
              width={20}
              height={20}
            />
            {isExpanded && <span className="ml-4">{item.label}</span>}
          </button>
        ))}

        {/* Admin Items */}
        {user?.userInfo.role === 3 &&
          adminItems.map((item) => (
            <button
              key={item.route}
              className={`flex items-center ${
                isExpanded ? "pl-6" : "justify-center"
              } h-[50px] text-primary-dark hover:bg-gray-100 ${
                isActiveRoute(item.route) ? "bg-[#FFF9F2]" : ""
              }`}
              onClick={() => navigateTo(item.route)}
            >
              <Image
                src={getIconSrc(item.icon, isActiveRoute(item.route))}
                alt={`${item.label}-icon`}
                width={20}
                height={20}
              />
              {isExpanded && <span className="ml-4">{item.label}</span>}
            </button>
          ))}
      </div>
    </aside>
  );
};

export default Sidebar;
