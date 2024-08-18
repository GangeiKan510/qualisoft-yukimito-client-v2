"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { getBookingAvailability } from "@/app/api/network/booking";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../common/spinner";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";

function InstantBookingForm() {
  const router = useRouter(); // Initialize useRouter
  const [service, setService] = useState("Home Care");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [numberOfPets, setNumberOfPets] = useState("1");
  const [buttonLabel, setButtonLabel] = useState<any>("See Availability");
  const [availability, setAvailability] = useState(false);

  const checkAvailability = async () => {
    if (buttonLabel === "Book Now!") {
      // If availability is confirmed, redirect to /create-booking
      router.push("/create-booking");
      return;
    }

    // Validation: Check if all required fields are filled
    if (!service || !checkInDate || !numberOfPets) {
      toast.error("Please fill in all fields before checking availability.");
      return;
    }

    setButtonLabel(<Spinner />);
    const availability = await getBookingAvailability();
    console.log(availability.available);
    if (availability.available === true) {
      setAvailability(true);
      setButtonLabel("Book Now!");
    } else {
      setButtonLabel("See Availability");
      setAvailability(false);
    }
  };

  // The earliest and latest times allowed for check in
  const today = new Date();
  const minTime =
    checkInDate && checkInDate.toDateString() === today.toDateString()
      ? new Date(today.setHours(7, 30))
      : new Date(0, 0, 0, 7, 30); // 7:30 AM
  const maxTime = new Date(0, 0, 0, 19, 0); // 7:00 PM

  return (
    <div className="w-full lg:w-[500px] h-auto lg:h-[500px] shadow-lg rounded-[16px] bg-white">
      <Toaster />
      <div className="p-6 lg:p-8">
        <div className="text-[20px] sm:text-[24px] text-center text-primary-dark font-bold">
          Book your pet&apos;s stay!
        </div>
        <div className="text-[12px] text-primary-dark pb-5 border-b border-gray border-opacity-25 text-center">
          We&apos;ll prepare an all-in dream vacation for your best friend.
        </div>
        <div className="my-5 flex flex-col gap-5">
          <div>
            <div className="mb-1 text-primary-dark font-semibold">
              Select a Service
            </div>
            <select
              name="service"
              id="service"
              value={service}
              onChange={(e) => setService(e.target.value)}
              className="w-full lg:w-[436px] text-secondary-dark h-[40px] border border-primary-dark text-primary-dark ps-2 rounded-[8px]"
            >
              <option value="Home Care">Home Care</option>
              <option value="Errand Care">Errand Care</option>
              <option value="Day Care">Day Care</option>
            </select>
          </div>
          <div>
            <div className="mb-1 text-primary-dark font-semibold">
              Check In Time
            </div>
            <DatePicker
              selected={checkInDate}
              onChange={(date) => setCheckInDate(date)}
              showTimeSelect
              minDate={new Date()} // Disable past dates
              minTime={minTime} // Earliest time selectable
              maxTime={maxTime} // Latest time selectable
              dateFormat="Pp"
              placeholderText="Select a Check-in Time"
              className="w-full lg:w-[436px] text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
            />
          </div>
          <div>
            <div className="mb-1 text-primary-dark font-semibold">
              Number of Pets
            </div>
            <select
              name="numberOfPets"
              id="numberOfPets"
              value={numberOfPets}
              onChange={(e) => setNumberOfPets(e.target.value)}
              className="w-full lg:w-[436px] text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>
          <div className="flex items-center justify-center my-5 gap-4">
            <div
              onClick={checkAvailability}
              className="flex items-center justify-center h-[40px] px-5 border border-primary-dark bg-primary-dark text-white rounded-full cursor-pointer font-semibold"
            >
              {buttonLabel}
            </div>
            {availability && (
              <div className="flex gap-1 text-primary-dark">
                Available
                <Image
                  width={16}
                  height={16}
                  src="/svg/available-true.svg"
                  alt="available-icon"
                />
              </div>
            )}
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstantBookingForm;
