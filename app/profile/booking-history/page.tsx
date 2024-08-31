"use client";

import React, { useEffect, useState } from "react";
import { useUser } from "@/app/components/config/user-context";
import "react-datepicker/dist/react-datepicker.css";
import { Toaster } from "react-hot-toast";
import BookingHistoryTable from "@/app/components/ cards/booking-history-table";

function Page() {
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (user?.userInfo?.bookings) {
      setBookings(user.userInfo.bookings);
    }
  }, [user]);

  console.log(bookings);

  return (
    <div className="flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="text-[24px] font-semibold text-primary-dark">
        Booking History
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
