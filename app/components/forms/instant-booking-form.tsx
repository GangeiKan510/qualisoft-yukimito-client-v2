"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function InstantBookingForm() {
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);

  return (
    <div className="w-full lg:w-[500px] h-auto lg:h-[500px] shadow-lg rounded-[16px] bg-white">
      <div className="p-6 lg:p-8">
        <div className="text-[20px] sm:text-[24px] text-center text-primary-dark font-bold">
          Book your pet&apos;s stay!
        </div>
        <div className="text-[12px] text-primary-dark pb-5 border-b border-gray border-opacity-25">
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
              minTime={new Date()} // Disable past times today
              maxTime={new Date(new Date().setHours(23, 59))} // Limit time to end of the day
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
              name="service"
              id="service"
              className="w-full lg:w-[436px] text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
            >
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </div>
          <div className="flex items-center justify-center my-5">
            <div className="flex items-center justify-center h-[40px] px-5 border border-primary-dark bg-primary-dark text-white rounded-full cursor-pointer font-semibold">
              See Availability
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstantBookingForm;
