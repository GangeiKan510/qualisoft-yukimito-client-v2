"use client";

import React, { useEffect, useState } from "react";
import { getAllBookings } from "@/network/network/admin/booking";
import { Pet } from "@/utils/types/pet";
import Spinner from "@/components/common/spinner";

function Page() {
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const data = await getAllBookings();
        console.log("Fetched bookings:", data);

        const allBookings = [...data.regularBookings, ...data.instantBookings];
        setBookings(allBookings);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };

    fetchBookings();
  }, []);

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
            <li key={booking.id} className="mb-4 p-4 border rounded-lg">
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
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Page;
