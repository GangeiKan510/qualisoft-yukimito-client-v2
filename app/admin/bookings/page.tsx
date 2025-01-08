"use client";

import React, { useEffect, useState } from "react";
import {
  getAllBookings,
  acceptBooking,
  rejectBooking,
  deleteBooking,
} from "@/network/network/admin/booking";
import { Pet } from "@/utils/types/pet";
import Spinner from "@/components/common/spinner";
import { toast } from "react-hot-toast";

function Page() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState<string | null>(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        console.log("Fetched bookings:", data);

        const allBookings = [...data.regularBookings, ...data.instantBookings];
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to fetch bookings.");
      }
    };

    fetchBookings();
  }, []);

  const handleAction = async (
    action: "accept" | "reject" | "delete",
    bookingId: string,
  ) => {
    setLoading(bookingId);
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

      setBookings((prevBookings) =>
        prevBookings.filter((b) => b.id !== bookingId),
      );
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
      toast.error(`Failed to ${action} booking. Please try again.`);
    } finally {
      setLoading(null);
    }
  };

  if (!bookings.length) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8">
      <h1 className="text-2xl font-bold mb-6 text-primary-dark">
        All Bookings
      </h1>

      <div className="w-full">
        <ul>
          {bookings.map((booking) => (
            <li key={booking.id} className="w-full mb-4 p-4 border rounded-lg">
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
                  disabled={loading === booking.id}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                >
                  {loading === booking.id && <Spinner />}
                  {loading !== booking.id && "Accept"}
                </button>

                <button
                  onClick={() => handleAction("reject", booking.id)}
                  disabled={loading === booking.id}
                  className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                >
                  {loading === booking.id && <Spinner />}
                  {loading !== booking.id && "Reject"}
                </button>

                <button
                  onClick={() => handleAction("delete", booking.id)}
                  disabled={loading === booking.id}
                  className="px-4 py-2 bg-red text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  {loading === booking.id && <Spinner />}
                  {loading !== booking.id && "Delete"}
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
