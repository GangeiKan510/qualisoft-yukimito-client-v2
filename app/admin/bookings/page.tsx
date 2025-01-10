"use client";

import React, { useState, useEffect } from "react";
import {
  acceptBooking,
  rejectBooking,
  deleteBooking,
  getAllBookings,
} from "@/network/network/admin/booking";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import BookingsTable from "@/components/tables/all-bookings-table";

function Page() {
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: bookings = { regularBookings: [], instantBookings: [] },
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      const allBookings = [
        ...bookings.regularBookings,
        ...bookings.instantBookings,
      ];
      setFilteredBookings(allBookings);
      toast.success("Bookings fetched successfully.");
    }
  }, [bookings, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch bookings.");
    }
  }, [isError]);

  const handleAction = async (
    action: "accept" | "reject" | "delete",
    bookingId: string,
  ) => {
    setActionLoading(bookingId);
    try {
      if (action === "accept") {
        await acceptBooking(bookingId);
        toast.success("Booking accepted successfully.");
      } else if (action === "reject") {
        await rejectBooking(bookingId);
        toast.success("Booking rejected successfully.");
      } else if (action === "delete") {
        await deleteBooking(bookingId);
        toast.success("Booking deleted successfully.");
      }

      setFilteredBookings((prevBookings) =>
        prevBookings.filter((b) => b.id !== bookingId),
      );
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
      toast.error(`Failed to ${action} booking.`);
    } finally {
      setActionLoading(null);
      refetch();
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredBookings(
      bookings.regularBookings
        .concat(bookings.instantBookings)
        .filter((booking: any) =>
          JSON.stringify(booking).toLowerCase().includes(term),
        ),
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8 py-4">
      <Toaster />

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-dark">All Bookings</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search bookings..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            className="p-2 text-sm text-gray-600 rounded hover:bg-gray-100"
            onClick={() => toast("Filter & Sort feature coming soon!")}
          >
            Filter & Sort
          </button>
        </div>
      </div>

      {filteredBookings.length ? (
        <BookingsTable
          bookings={filteredBookings}
          onAction={handleAction}
          actionLoading={actionLoading}
        />
      ) : (
        <div className="text-center text-gray-500">No results found.</div>
      )}
    </div>
  );
}

export default Page;
