"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/app/components/config/user-context";

function Page() {
  const { user } = useUser();
  const [service, setService] = useState("Home Care");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);

  const today = new Date();
  const minTime =
    checkInDate && checkInDate.toDateString() === today.toDateString()
      ? new Date(today.setHours(7, 30))
      : new Date(0, 0, 0, 7, 30); // 7:30 AM
  const maxTime = new Date(0, 0, 0, 19, 0); // 7:00 PM

  const handlePetSelection = (petId: string) => {
    if (selectedPets.includes(petId)) {
      setSelectedPets(selectedPets.filter((id) => id !== petId));
    } else {
      setSelectedPets([...selectedPets, petId]);
    }
  };

  const handleSubmit = async () => {
    if (!service) {
      toast.error("Please select a service.");
      return;
    }
    if (!checkInDate) {
      toast.error("Please select a check-in date and time.");
      return;
    }
    if (selectedPets.length === 0) {
      toast.error("Please select at least one pet.");
      return;
    }

    const bookingData = {
      userId: user?.uid,
      service,
      checkInDate: checkInDate.toISOString(),
      pets: selectedPets,
    };

    // Handle booking submission logic here...
    console.log("Booking Data:", bookingData);
    toast.success("Booking created successfully!");
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="w-full lg:w-[950px] flex justify-between">
        <div className="text-[24px] font-semibold text-primary-dark">
          Create Booking
        </div>
      </div>

      {/* Service Selection */}
      <div className="w-full lg:w-[950px] flex flex-col gap-3">
        <div className="font-semibold text-primary-dark">Select Service</div>
        <select
          value={service}
          onChange={(e) => setService(e.target.value)}
          className="text-primary-dark border border-primary-dark rounded px-3 py-2"
        >
          <option value="Home Care">Home Care</option>
          <option value="Errand Care">Errand Care</option>
          <option value="Day Care">Day Care</option>
        </select>
      </div>

      {/* Check-In Time Selection */}
      <div className="w-full lg:w-[950px] flex flex-col gap-3">
        <div className="font-semibold text-primary-dark">
          Select Check-In Time
        </div>
        <DatePicker
          wrapperClassName="w-full"
          selected={checkInDate}
          onChange={(date) => setCheckInDate(date)}
          showTimeSelect
          minDate={new Date()}
          minTime={minTime} // Earliest time selectable
          maxTime={maxTime} // Latest time selectable
          dateFormat="Pp"
          placeholderText="Select a Check-in Time"
          className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
        />
      </div>

      {/* Pets Selection */}
      <div className="w-full lg:w-[950px] flex flex-col gap-3">
        <div className="font-semibold text-primary-dark">
          Select Pets&nbsp;
          <span className="font-normal text-gray">
            *Some of your pets might not appear here because their vaccine is
            not approved.
          </span>
        </div>
        <div className="flex flex-col gap-2">
          {user?.userInfo.pets.map((pet: any) => (
            <label key={pet.id} className="flex items-center">
              <input
                type="checkbox"
                checked={selectedPets.includes(pet.id)}
                onChange={() => handlePetSelection(pet.id)}
                className="mr-2"
              />
              <span className="text-primary-dark font-semibold">
                {pet.name}&nbsp;
              </span>
              <span className="text-gray">({pet.breed})</span>
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="w-full lg:w-[950px] flex justify-end">
        <button
          onClick={handleSubmit}
          className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center"
        >
          Submit
        </button>
      </div>
    </div>
  );
}

export default Page;
