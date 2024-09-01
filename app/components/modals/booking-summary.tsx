import React, { useState } from "react";
import { RegularBookingData } from "../utils/types/types";
import Spinner from "../common/spinner";

interface BookingSummaryProps {
  bookingData: RegularBookingData | null;
  onClose: () => void;
  onBookNow: () => Promise<void>;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  onClose,
  onBookNow,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!bookingData) return null;

  // Function to calculate the price for a single pet based on the service and size
  const calculatePetPrice = (
    pet: { size: string },
    service: string,
    numberOfDays: number,
  ) => {
    let petPrice = 0;

    switch (service) {
      case "Errand Care":
        petPrice = pet.size === "Large" || pet.size === "XLarge" ? 200 : 175;
        break;
      case "Day Care":
        petPrice = pet.size === "Large" || pet.size === "XLarge" ? 275 : 250;
        break;
      case "Home Care":
        const homeCareRates: Record<string, number> = {
          XSmall: 425,
          Small: 475,
          Medium: 525,
          Large: 575,
          XLarge: 650,
        };
        petPrice = homeCareRates[pet.size] * numberOfDays;
        break;
      default:
        break;
    }

    return petPrice;
  };

  const calculateTotalBill = () => {
    let totalBill = 0;
    const { pets, service, check_in_date, check_out_date } = bookingData;
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date || "");
    const numberOfDays = Math.ceil(
      Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );

    pets.forEach((pet) => {
      totalBill += calculatePetPrice(pet, service, numberOfDays);
    });

    return totalBill;
  };

  const totalBill = calculateTotalBill();

  const handleBookNowClick = async () => {
    setIsLoading(true);
    await onBookNow();
    setIsLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">
          Booking Summary
        </h2>
        <div className="mb-2">
          <strong className="text-primary-dark">Name:</strong>{" "}
          <span className="text-gray">{bookingData.pet_owner_name}</span>
        </div>
        <div className="mb-2">
          <strong className="text-primary-dark">Service:</strong>{" "}
          <span className="text-gray">{bookingData.service}</span>
        </div>
        <div className="mb-2">
          <strong className="text-primary-dark">Check-in Date:</strong>{" "}
          <span className="text-gray">
            {new Date(bookingData.check_in_date).toLocaleString()}
          </span>
        </div>
        {bookingData.check_out_date && (
          <div className="mb-2">
            <strong className="text-primary-dark">Check-out Date:</strong>{" "}
            <span className="text-gray">
              {new Date(bookingData.check_out_date).toLocaleString()}
            </span>
          </div>
        )}
        <div className="mb-4">
          <strong className="text-primary-dark">Pets:</strong>{" "}
          <ul className="list-disc pl-5 text-gray">
            {bookingData.pets.map((pet, index) => {
              const { service, check_in_date, check_out_date } = bookingData;
              const checkIn = new Date(check_in_date);
              const checkOut = new Date(check_out_date || "");
              const numberOfDays = Math.ceil(
                Math.abs(checkOut.getTime() - checkIn.getTime()) /
                  (1000 * 60 * 60 * 24),
              );
              const petPrice = calculatePetPrice(pet, service, numberOfDays);

              return (
                <li key={index} className="flex justify-between">
                  <span>
                    {index + 1}. {pet.name} ({pet.breed}) - {pet.size}
                  </span>
                  <span className="text-primary">₱{petPrice.toFixed(2)}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-4">
          <div className="flex justify-between">
            <span className="text-primary-dark font-bold">Total Bill:</span>{" "}
            <span className="text-primary font-bold">
              ₱{totalBill.toFixed(2)}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="h-[40px] border border-primary-dark bg-white text-primary-dark px-8 rounded-full flex items-center justify-center mr-2"
          >
            Close
          </button>
          <button
            onClick={handleBookNowClick}
            disabled={isLoading}
            className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center"
          >
            {isLoading ? <Spinner /> : "Book Now!"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
