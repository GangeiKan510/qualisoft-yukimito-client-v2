"use client";
import { usePathname, useRouter } from "next/navigation";
import { routes } from "../utils/routes/routes";
import { useState } from "react";
import { useSidebar } from "../config/sidebar-context";
import useSignOut from "../helpers/use-sign-out";
import { getAuth } from "firebase/auth";
import Image from "next/image";

const ROW_BOOKINGS = "bookings";
const ROW_INVENTORY = "inventory";

const Sidebar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isExpanded, toggleSidebar } = useSidebar();

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pendingRoute, setPendingRoute] = useState<string | null>(null);
  const [signOut] = useSignOut(getAuth());

  const goTo = (route: string) => {
    if (
      pathname === routes.adminBookings ||
      pathname === routes.adminInventory
    ) {
      setPendingRoute(route);
      setShowConfirmation(true);
    } else {
      navigateTo(route);
    }
  };

  const navigateTo = (route: string) => {
    router.push(route);
  };

  const getActiveClass = (route: string) => {
    const regexPattern = new RegExp(`^\\/?${route}`);
    const isMatching = regexPattern.test(pathname);

    return isMatching
      ? route !== routes.adminBookings || routes.adminInventory
        ? "active bg-[#FFF9F2] text-secondary"
        : "active text-secondary"
      : "text-text-primary";
  };

  const buttonBaseClasses = "flex items-center w-full h-[49.5px] lg:h-[64.8px]";
  const itemContainerBaseClasses = isExpanded ? "ml-[25px]" : "ml-[20px]";
  const textBaseClasses = "ml-[14.4px] lg:ml-[16px] break-words";

  return isExpanded ? (
    <aside
      className={`z-30 fixed top-0 bottom-0 left-0 flex flex-col justify-between w-[290px] lg:w-[300px] bg-white shadow-lg pt-10`}
    >
      {/* Tabs */}
      <div className="flex flex-col tracking-wider mt-10">
        {ROW_BOOKINGS && (
          <button
            className={`${buttonBaseClasses} ${getActiveClass(
              routes.adminBookings,
            )}`}
            onClick={() => goTo(routes.adminBookings)}
          >
            <div className={`flex items-center ${itemContainerBaseClasses}`}>
              {isExpanded && (
                <span
                  className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
                >
                  <Image
                    width={20}
                    height={20}
                    src="/svg/booking-tab-icon.svg"
                    alt="booking-tab-icon-img"
                  />
                  Bookings
                </span>
              )}
            </div>
          </button>
        )}
        {ROW_BOOKINGS && (
          <button
            className={`${buttonBaseClasses} ${getActiveClass(
              routes.adminInventory,
            )}`}
            onClick={() => goTo(routes.adminInventory)}
          >
            <div className={`flex items-center ${itemContainerBaseClasses}`}>
              {isExpanded && (
                <span
                  className={`flex ${textBaseClasses} text-[20px] font-bold gap-2 items-center justify-center`}
                >
                  <Image
                    width={20}
                    height={20}
                    src="/svg/booking-tab-icon.svg"
                    alt="booking-tab-icon-img"
                  />
                  Inventory
                </span>
              )}
            </div>
          </button>
        )}
      </div>
    </aside>
  ) : null;
};

export default Sidebar;
