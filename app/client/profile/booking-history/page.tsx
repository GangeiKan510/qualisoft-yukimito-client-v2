"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/components/config/user-context";
import { Toaster } from "react-hot-toast";
import BookingHistoryTable from "@/components/tables/booking-history-table";
import SortDropdown from "@/components/dropdowns/sort-booking-dropdown";
import FilterDropdown from "@/components/dropdowns/filter-booking-dropdown";
import { sortBookings } from "@/utils/sort-booking";
import Image from "next/image";
import EditBookingModal from "@/components/modals/edit-booking-modal-owner";
import { toast } from "react-hot-toast";
import { updateBookingDates } from "@/network/network/booking";

const sortOptions = [
  "by Service",
  "Price Ascending",
  "Price Descending",
  "Latest",
  "Oldest",
];

const filterOptions = ["Pending", "Accepted", "Rejected"];

function Page() {
  const { user, refetchMe } = useUser();
  const [bookings, setBookings] = useState<any[]>([]);
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [sortCriteria, setSortCriteria] = useState<string>("");
  const [filterCriteria, setFilterCriteria] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleEditClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    if (user?.userInfo?.bookings) {
      setBookings(user.userInfo.bookings as any);
      setFilteredBookings(user.userInfo.bookings as any);
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

  const handleSaveEdit = async (checkInDate: string, checkOutDate?: string) => {
    if (!selectedBooking) return;

    setLoading(true);
    try {
      await updateBookingDates(selectedBooking.id, {
        checkInDate,
        checkOutDate,
      });

      toast.success("Booking updated successfully.");
      setIsEditModalOpen(false);

      setBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                check_in_date: checkInDate,
                check_out_date: checkOutDate || booking.check_out_date,
              }
            : booking,
        ),
      );

      setFilteredBookings((prev) =>
        prev.map((booking) =>
          booking.id === selectedBooking.id
            ? {
                ...booking,
                check_in_date: checkInDate,
                check_out_date: checkOutDate || booking.check_out_date,
              }
            : booking,
        ),
      );
    } catch (error) {
      toast.error("Failed to update booking.");
      console.error("Error updating booking:", error);
    } finally {
      refetchMe();
      setLoading(false);
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
        <BookingHistoryTable
          bookings={filteredBookings}
          onEditClick={handleEditClick}
        />
      )}
      <div className="w-[398px] lg:w-[950px] h-auto flex flex-col md:flex-row items-center bg-white rounded-[16px] hover:shadow-lg"></div>
      <EditBookingModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleSaveEdit}
        booking={selectedBooking}
        loading={loading}
      />
    </div>
  );
}

export default Page;
