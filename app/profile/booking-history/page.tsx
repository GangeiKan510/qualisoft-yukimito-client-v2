"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/config/user-context";
import { Toaster } from "react-hot-toast";
import BookingHistoryTable from "@/app/components/tables/booking-history-table";
import SortDropdown from "@/app/components/dropdowns/sort-booking-dropdown";
import { sortBookings } from "@/app/components/utils/sort-booking";
import Image from "next/image";

const sortOptions = [
  "by Service",
  "Price Ascending",
  "Price Descending",
  "Latest",
  "Oldest",
];

function Page() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");

  useEffect(() => {
    if (user?.userInfo?.bookings) {
      setBookings(user.userInfo.bookings);
    }
  }, [user]);

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
    const sortedBookings = sortBookings(bookings, criteria);
    setBookings(sortedBookings);
  };

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="text-[24px] font-semibold text-primary-dark">
        Booking History
      </div>
      <div className="flex gap-3">
        <SortDropdown options={sortOptions} onSortChange={handleSortChange} />
        <div className="flex gap-1 text-primary-dark cursor-pointer">
          <Image
            width={24}
            height={24}
            src="/svg/filter-icon.svg"
            alt="preview-icon"
            className="max-w-full h-auto rounded-lg cursor-pointer"
          />
          Filter
        </div>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center text-gray">No bookings yet...</div>
      ) : (
        <BookingHistoryTable bookings={bookings} />
      )}

      <div className="w-[398px] lg:w-[950px] h-auto flex flex-col md:flex-row items-center bg-white rounded-[16px] hover:shadow-lg"></div>
    </div>
  );
}

export default Page;
