"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/app/components/config/user-context";
import BookingSummary from "@/app/components/modals/booking-summary";
import { createBooking } from "@/app/api/network/booking";
import Image from "next/image";

interface Pet {
  id: string;
  name: string;
  breed: string;
  birth_date: string;
  size: string;
  vaccine_photo: string;
}

interface UserInfo {
  id: string;
  name: string;
  phone: string;
  address: string;
  email: string;
  pets: Pet[];
}

interface UserContext {
  userInfo: UserInfo;
  uid: string;
}

interface BookingData {
  pet_owner_name: string;
  service: string;
  address: string;
  phone_number: string;
  email: string;
  check_in_date: string;
  check_out_date?: string;
  user_id: string;
  pets: Pet[];
  raw_pet_data: Pet[];
}

const Page: React.FC = () => {
  const { user } = useUser() as { user: UserContext };
  const [service, setService] = useState<string>("Errand Care");
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [selectedPets, setSelectedPets] = useState<string[]>([]);
  const [bookingData, setBookingData] = useState<BookingData | null>(null);

  const today = new Date();
  const minTime =
    checkInDate && checkInDate.toDateString() === today.toDateString()
      ? new Date(today.setHours(7, 30))
      : new Date(0, 0, 0, 7, 30); // 7:30 AM
  const maxTime = new Date(0, 0, 0, 19, 0); // 7:00 PM

  const calculateCheckOutDate = (checkIn: Date | null, serviceType: string) => {
    if (!checkIn) return null;
    const newDate = new Date(checkIn);

    if (serviceType === "Errand Care") {
      newDate.setHours(newDate.getHours() + 4);
    } else if (serviceType === "Day Care") {
      newDate.setHours(newDate.getHours() + 10);
    }

    return newDate;
  };

  const handleCheckInDateChange = (date: Date | null) => {
    setCheckInDate(date);
    if (service === "Errand Care" || service === "Day Care") {
      const calculatedCheckOutDate = calculateCheckOutDate(date, service);
      setCheckOutDate(calculatedCheckOutDate);
    } else {
      setCheckOutDate(null);
    }
  };

  const handlePetSelection = (petId: string) => {
    if (selectedPets.includes(petId)) {
      setSelectedPets(selectedPets.filter((id) => id !== petId));
    } else {
      setSelectedPets([...selectedPets, petId]);
    }
  };

  const prepareBookingData = () => {
    if (!service) {
      toast.error("Please select a service.");
      return;
    }
    if (!checkInDate) {
      toast.error("Please select a check-in date.");
      return;
    }
    if (service === "Home Care" && !checkOutDate) {
      toast.error("Please select a check-out date.");
      return;
    }
    if (selectedPets.length === 0) {
      toast.error("Please select at least one pet.");
      return;
    }

    const selectedPetDetails = user?.userInfo.pets.filter((pet) =>
      selectedPets.includes(pet.id),
    );

    const formattedPets: Pet[] = selectedPetDetails.map((pet) => ({
      id: pet.id,
      name: pet.name,
      breed: pet.breed,
      birth_date: pet.birth_date,
      size: pet.size,
      vaccine_photo: pet.vaccine_photo,
    }));

    const bookingData: BookingData = {
      pet_owner_name: user?.userInfo.name,
      service,
      address: user?.userInfo.address,
      phone_number: user?.userInfo.phone,
      email: user?.userInfo.email,
      check_in_date:
        service === "Home Care"
          ? checkInDate.toISOString().split("T")[0]
          : checkInDate.toISOString(),
      check_out_date: checkOutDate?.toISOString(),
      user_id: user?.userInfo.id,
      pets: formattedPets,
      raw_pet_data: formattedPets,
    };

    setBookingData(bookingData); // Set the booking data to display in the summary modal
  };

  const handleBookingSubmit = async () => {
    if (!bookingData) return;

    console.log("Submitting Booking Data:", bookingData);
    try {
      const response = await createBooking(bookingData);
      if (response) {
        toast.success("Booking created successfully!");
      } else {
        toast.error("There was a problem creating the booking.");
      }
    } catch (error) {
      console.log(error);
    }

    setBookingData(null);
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="w-full lg:w-[950px] flex justify-between">
        <div className="flex gap-2 text-[24px] font-semibold text-primary-dark">
          Create Booking
          <Image
            width={24}
            height={24}
            src="/svg/more-info-icon.svg"
            alt="preview-icon"
            className="max-w-full h-auto rounded-lg cursor-pointer"
          />
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

      {/* Check-In Date Selection */}
      <div className="w-full lg:w-[950px] flex flex-col gap-3">
        <div className="font-semibold text-primary-dark">
          {service === "Home Care"
            ? "Select Check-In Date"
            : "Select Check-In Time"}
        </div>
        <DatePicker
          wrapperClassName="w-full"
          selected={checkInDate}
          onChange={handleCheckInDateChange}
          showTimeSelect={service !== "Home Care"}
          minDate={new Date()}
          minTime={minTime}
          maxTime={maxTime}
          dateFormat={service === "Home Care" ? "P" : "Pp"}
          placeholderText={`Select a ${
            service === "Home Care" ? "Check-in Date" : "Check-in Date & Time"
          }`}
          className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
        />
        {(service === "Errand Care" || service === "Day Care") &&
          checkInDate &&
          checkOutDate && (
            <div className="text-secondary mt-2">
              Expected Check-out Time: {checkOutDate.toLocaleString()}
            </div>
          )}
      </div>

      {/* Check-Out Date Selection for Home Care */}
      {service === "Home Care" && (
        <div className="w-full lg:w-[950px] flex flex-col gap-3">
          <div className="font-semibold text-primary-dark">
            Select Check-Out Date
          </div>
          <DatePicker
            wrapperClassName="w-full"
            selected={checkOutDate}
            onChange={(date) => setCheckOutDate(date)}
            minDate={
              checkInDate
                ? new Date(checkInDate.getTime() + 24 * 60 * 60 * 1000)
                : new Date()
            }
            dateFormat="P"
            placeholderText="Select a Check-out Date"
            className="w-full text-primary-dark h-[40px] border border-primary-dark ps-2 rounded-[8px]"
          />
        </div>
      )}

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
          {user?.userInfo.pets.map((pet) => (
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

      {/* Confirm Button */}
      <div className="w-full lg:w-[950px] flex justify-end">
        <button
          onClick={prepareBookingData}
          className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center"
        >
          Confirm
        </button>
      </div>

      {/* Booking Summary Modal */}
      {bookingData && (
        <BookingSummary
          bookingData={bookingData}
          onClose={() => setBookingData(null)}
          onBookNow={handleBookingSubmit}
        />
      )}
    </div>
  );
};

export default Page;
