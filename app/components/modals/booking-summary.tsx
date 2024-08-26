import React from "react";
import { RegularBookingData } from "../utils/types/types";

interface BookingSummaryProps {
  bookingData: RegularBookingData | null;
  onClose: () => void;
}

const BookingSummary: React.FC<BookingSummaryProps> = ({
  bookingData,
  onClose,
}) => {
  if (!bookingData) return null;

  const calculateTotalBill = () => {
    let totalBill = 0;
    const { pets, service, check_in_date, check_out_date } = bookingData;
    const checkIn = new Date(check_in_date);
    const checkOut = new Date(check_out_date || "");
    const numberOfDays = Math.ceil(
      Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );

    pets.forEach((pet) => {
      switch (service) {
        case "Errand Care":
          totalBill +=
            pet.size === "Large" || pet.size === "XLarge" ? 200 : 175;
          break;
        case "Day Care":
          totalBill +=
            pet.size === "Large" || pet.size === "XLarge" ? 275 : 250;
          break;
        case "Home Care":
          const homeCareRates: Record<string, number> = {
            XSmall: 425,
            Small: 475,
            Medium: 525,
            Large: 575,
            XLarge: 650,
          };
          totalBill += homeCareRates[pet.size] * numberOfDays;
          break;
        default:
          break;
      }
    });

    return totalBill;
  };

  const totalBill = calculateTotalBill();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4 text-primary-dark">
          Booking Summary
        </h2>
        <div className="mb-2">
          <strong className="text-primary-dark">Fur Parent:</strong>{" "}
          <span className="text-gray">{bookingData.pet_owner_name}</span>
        </div>
        <div className="mb-2">
          <strong className="text-primary-dark">Service:</strong>{" "}
          <span className="text-gray">{bookingData.service}</span>
        </div>
        <div className="mb-2">
          <strong className="text-primary-dark">Check-in Date:</strong>{" "}
          <span className="text-gray">
            {new Date(bookingData.check_in_date).toLocaleDateString()}
          </span>
        </div>
        {bookingData.check_out_date && (
          <div className="mb-2">
            <strong className="text-primary-dark">Check-out Date:</strong>{" "}
            <span className="text-gray">
              {new Date(bookingData.check_out_date).toLocaleDateString()}
            </span>
          </div>
        )}
        <div className="mb-4">
          <strong className="text-primary-dark">Pets:</strong>{" "}
          <ul className="list-disc pl-5 text-gray">
            {bookingData.pets.map((pet, index) => (
              <li key={index}>
                {pet.name} ({pet.breed}) - {pet.size}
              </li>
            ))}
          </ul>
        </div>
        <div className="border-t pt-4">
          <p>
            <strong className="text-primary-dark">Total Bill:</strong>{" "}
            <span className="text-primary">₱{totalBill.toFixed(2)}</span>
          </p>
        </div>
        <div className="flex justify-end mt-4">
          <button
            onClick={onClose}
            className="h-[40px] border border-primary-dark bg-primary-dark text-white px-8 rounded-full flex items-center justify-center"
          >
            Book Now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingSummary;
