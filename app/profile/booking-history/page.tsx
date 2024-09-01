"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/config/user-context";
import { Toaster } from "react-hot-toast";
import BookingHistoryTable from "@/app/components/tables/booking-history-table";
import SortDropdown from "@/app/components/dropdowns/sort-booking-dropdown";
import FilterDropdown from "@/app/components/dropdowns/filter-booking-dropdown"; // Import the new FilterDropdown component
import { sortBookings } from "@/app/components/utils/sort-booking";
import Image from "next/image";

const sortOptions = [
  "by Service",
  "Price Ascending",
  "Price Descending",
  "Latest",
  "Oldest",
];

const filterOptions = ["Pending", "Accepted", "Rejected"];

function Page() {
  const { user } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [filterCriteria, setFilterCriteria] = useState<string>("");

  useEffect(() => {
    if (user?.userInfo?.bookings) {
      setBookings(user.userInfo.bookings);
      setFilteredBookings(user.userInfo.bookings);
    }
  }, [user]);

  const handleSortChange = (criteria: string) => {
    setSortCriteria(criteria);
    const sortedBookings = sortBookings(filteredBookings, criteria);
    setFilteredBookings(sortedBookings);
  };

  const handleFilterChange = (criteria: string) => {
    setFilterCriteria(criteria);
    if (criteria) {
      const filtered = bookings.filter(
        (booking) => booking.status === criteria.toLowerCase(),
      );
      setFilteredBookings(filtered);
    } else {
      setFilteredBookings(bookings);
    }
  };

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="text-[24px] font-semibold text-primary-dark">
        Booking History
      </div>
      <div className="flex gap-3">
        <SortDropdown options={sortOptions} onSortChange={handleSortChange} />
        <FilterDropdown
          options={filterOptions}
          onFilterChange={handleFilterChange}
        />
      </div>

      {filteredBookings.length === 0 ? (
        <div className="text-center text-gray">No bookings found...</div>
      ) : (
        <BookingHistoryTable bookings={filteredBookings} />
      )}

      <div className="w-[398px] lg:w-[950px] h-auto flex flex-col md:flex-row items-center bg-white rounded-[16px] hover:shadow-lg"></div>
    </div>
  );
}

export default Page;
