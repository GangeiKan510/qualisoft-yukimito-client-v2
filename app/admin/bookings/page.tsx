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
import { toast } from "react-hot-toast";
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
      toast.error(`Failed to ${action} booking. Please try again.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredBookings(
      bookings.regularBookings
        .concat(bookings.instantBookings)
        .filter((booking: any) => {
          const bookingString = JSON.stringify(booking).toLowerCase();
          return bookingString.includes(term);
        }),
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
    <div className="w-full flex flex-col px-8">
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">All Bookings</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search anything..."
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

      <div className="w-full">
        {filteredBookings.length ? (
          <ul>
            {filteredBookings.map((booking) => (
              <li
                key={booking.id}
                className="w-full mb-4 p-4 border rounded-lg"
              >
                <p>
                  <strong>Owner:</strong> {booking.pet_owner_name}
                </p>
                <p>
                  <strong>Service:</strong> {booking.service}
                </p>
                <p>
                  <strong>Status:</strong> {booking.status}
                </p>
                <p>
                  <strong>Total Bill:</strong> ${booking.total_bill}
                </p>
                <p>
                  <strong>Check-in:</strong>{" "}
                  {new Date(booking.check_in_date).toLocaleString()}
                </p>
                <p>
                  <strong>Check-out:</strong>{" "}
                  {new Date(booking.check_out_date).toLocaleString()}
                </p>
                <p>
                  <strong>Pets:</strong>
                </p>
                <ul>
                  {(booking.pets || booking.raw_pet_data).map(
                    (pet: Pet, index: number) => (
                      <li key={pet.id || index}>
                        - {pet.name} ({pet.breed}, {pet.size})
                      </li>
                    ),
                  )}
                </ul>

                <div className="w-full mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => handleAction("accept", booking.id)}
                    disabled={actionLoading === booking.id}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                  >
                    {actionLoading === booking.id && <Spinner />}
                    {actionLoading !== booking.id && "Accept"}
                  </button>

                  <button
                    onClick={() => handleAction("reject", booking.id)}
                    disabled={actionLoading === booking.id}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {actionLoading === booking.id && <Spinner />}
                    {actionLoading !== booking.id && "Reject"}
                  </button>

                  <button
                    onClick={() => handleAction("delete", booking.id)}
                    disabled={actionLoading === booking.id}
                    className="px-4 py-2 bg-red text-white rounded hover:bg-[#d63a3a] disabled:opacity-50"
                  >
                    {actionLoading === booking.id && <Spinner />}
                    {actionLoading !== booking.id && "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}
      </div>
    </div>
  );
}

export default Page;
