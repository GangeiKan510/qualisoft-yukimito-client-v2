"use client";

import React, { useState, useEffect } from "react";
import {
  acceptBooking,
  rejectBooking,
  deleteBooking,
  getAllBookings,
} from "@/network/network/admin/booking";
import { Pet } from "@/utils/types/pet";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

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
      console.log(error);
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

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBookings.length ? (
          filteredBookings.map((booking) => (
            <div
              key={booking.id}
              className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <div className="mb-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-1">
                  {booking.pet_owner_name}
                </h2>
                <p className="text-sm text-gray-500">{booking.service}</p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.check_in_date).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.check_out_date).toLocaleDateString()}
                </p>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600 font-medium">
                  <strong>Total Bill:</strong> ₱{booking.total_bill}
                </p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {(booking.pets || booking.raw_pet_data).map(
                  (pet: Pet, index: number) => (
                    <span
                      key={pet.id || index}
                      className="px-2 py-1 bg-primary text-white rounded-full text-xs font-medium"
                    >
                      {pet.name} ({pet.breed})
                    </span>
                  ),
                )}
              </div>

              <div
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  booking.status === "accepted"
                    ? "bg-green-100 text-green-600"
                    : booking.status === "rejected"
                    ? "bg-[#ffdada] text-red"
                    : "bg-yellow-100 text-yellow-600"
                }`}
              >
                {booking.status || "Pending"}
              </div>

              <div className="mt-4 flex justify-end space-x-4">
                {/* Show Accept and Reject buttons only if status is pending */}
                {booking.status === "pending" && (
                  <>
                    <button
                      onClick={() => handleAction("accept", booking.id)}
                      disabled={actionLoading === booking.id}
                      className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                    >
                      {actionLoading === booking.id ? <Spinner /> : "Accept"}
                    </button>

                    <button
                      onClick={() => handleAction("reject", booking.id)}
                      disabled={actionLoading === booking.id}
                      className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                    >
                      {actionLoading === booking.id ? <Spinner /> : "Reject"}
                    </button>
                  </>
                )}

                {/* Show Delete button for all statuses */}
                <button
                  onClick={() => handleAction("delete", booking.id)}
                  disabled={actionLoading === booking.id}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-[#d63a3a] disabled:opacity-50"
                >
                  {actionLoading === booking.id ? <Spinner /> : "Delete"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No results found.
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
