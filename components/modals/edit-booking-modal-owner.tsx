"use client";

import React, { useEffect, useState } from "react";

interface EditBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (checkInDate: string, checkOutDate?: string) => void;
  booking: {
    id: string;
    service: string;
    check_in_date: string;
    check_out_date: string | null;
  };
  loading: boolean;
}

const EditBookingModal: React.FC<EditBookingModalProps> = ({
  isOpen,
  onClose,
  onSave,
  booking,
  loading,
}) => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [minDate, setMinDate] = useState<string>("");

  useEffect(() => {
    if (isOpen && booking) {
      setCheckInDate(
        booking.check_in_date ? booking.check_in_date.split("T")[0] : "",
      );
      setCheckOutDate(
        booking.check_out_date ? booking.check_out_date.split("T")[0] : "",
      );

      const today = new Date();
      today.setDate(today.getDate() + 1);
      setMinDate(today.toISOString().split("T")[0]);
    }
  }, [isOpen, booking]);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(
      checkInDate,
      booking.service === "Home Care" ? checkOutDate : undefined,
    );
  };

  const renderCheckOutDateField = () => {
    if (booking.service === "Home Care") {
      return (
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Check-out Date
          </label>
          <input
            type="date"
            value={checkOutDate}
            min={checkInDate || minDate}
            onChange={(e) => setCheckOutDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
      );
    } else {
      return (
        <div className="text-gray-500 text-sm">
          Check-out date is automatically calculated for {booking.service}.
        </div>
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-96 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray hover:text-[#8c8c8c]"
          disabled={loading}
        >
          ✕
        </button>
        <div className="text-lg font-semibold text-black mb-4">
          Edit Booking: {booking.id}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Service Type
          </label>
          <input
            type="text"
            value={booking.service}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-100"
            disabled
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Check-in Date
          </label>
          <input
            type="date"
            value={checkInDate}
            min={minDate}
            onChange={(e) => setCheckInDate(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            required
          />
        </div>
        {renderCheckOutDateField()}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditBookingModal;
