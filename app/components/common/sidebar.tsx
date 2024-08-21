"use client";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";
import { useState } from "react";
import { useSidebar } from "../config/sidebar-context";
import useSignOut from "../helpers/use-sign-out";
import { getAuth } from "firebase/auth";
import Image from "next/image";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isExpanded } = useSidebar();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [signOut] = useSignOut(getAuth());

  const goTo = (route: string) => {
    // Navigate to the selected route
    navigateTo(route);
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const getActiveClass = (route: string) => {
    return pathname === route
      ? "active bg-[#FFF9F2] text-secondary"
      : "text-text-primary";
  };

  const getIconSrc = (baseSrc: string, route: string) => {
    return pathname === route
      ? baseSrc.replace(".svg", "-active.svg")
      : baseSrc;
  };

  const buttonBaseClasses = "flex items-center w-full h-[49.5px] lg:h-[64.8px]";
  const itemContainerBaseClasses = isExpanded ? "ml-[25px]" : "ml-[20px]";
  const textBaseClasses = "ml-[14.4px] lg:ml-[16px] break-words";

  return isExpanded ? (
    <aside
      className={`z-30 fixed top-0 bottom-0 left-0 flex flex-col justify-between w-[290px] lg:w-[300px] bg-white shadow-lg pt-[35px] text-primary-dark`}
    >
      {/* Tabs */}
      <div className="flex flex-col tracking-wider mt-10">
        <button
          className={`${buttonBaseClasses} ${getActiveClass(
            routes.adminBookings,
          )}`}
          onClick={() => goTo(routes.adminBookings)}
        >
          <div className={`flex items-center ${itemContainerBaseClasses}`}>
            <span
              className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
            >
              <Image
                width={20}
                height={20}
                src={getIconSrc(
                  "/svg/booking-tab-icon.svg",
                  routes.adminBookings,
                )}
                alt="booking-tab-icon-img"
              />
              Bookings
            </span>
          </div>
        </button>
        <button
          className={`${buttonBaseClasses} ${getActiveClass(
            routes.adminInventory,
          )}`}
          onClick={() => goTo(routes.adminInventory)}
        >
          <div className={`flex items-center ${itemContainerBaseClasses}`}>
            <span
              className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
            >
              <Image
                width={20}
                height={20}
                src={getIconSrc(
                  "/svg/inventory-tab-icon.svg",
                  routes.adminInventory,
                )}
                alt="inventory-tab-icon-img"
              />
              Inventory
            </span>
          </div>
        </button>
        <button
          className={`${buttonBaseClasses} ${getActiveClass(
            routes.adminPendingVaccines,
          )}`}
          onClick={() => goTo(routes.adminPendingVaccines)}
        >
          <div className={`flex items-center ${itemContainerBaseClasses}`}>
            <span
              className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
            >
              <Image
                width={20}
                height={20}
                src={getIconSrc(
                  "/svg/pending-vaccine-tab-icon.svg",
                  routes.adminPendingVaccines,
                )}
                alt="vaccine-tab-icon-img"
              />
              Pending Vaccines
            </span>
          </div>
        </button>
        <button
          className={`${buttonBaseClasses} ${getActiveClass(
            routes.adminUsers,
          )}`}
          onClick={() => goTo(routes.adminUsers)}
        >
          <div className={`flex items-center ${itemContainerBaseClasses}`}>
            <span
              className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
            >
              <Image
                width={20}
                height={20}
                src={getIconSrc(
                  "/svg/manage-accounts-tab.svg",
                  routes.adminUsers,
                )}
                alt="admin-users-tab-icon-img"
              />
              Admin Users
            </span>
          </div>
        </button>
      </div>
    </aside>
  ) : null;
};

export default Sidebar;
