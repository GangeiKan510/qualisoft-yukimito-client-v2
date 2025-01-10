"use client";

import React, { useState } from "react";
import Spinner from "../common/spinner";

interface DeleteBookingConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  bookingId: string;
  confirmationInput: string;
  setConfirmationInput: (value: string) => void;
}

const DeleteBookingConfirmationModal: React.FC<
  DeleteBookingConfirmationModalProps
> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  bookingId,
  confirmationInput,
  setConfirmationInput,
}) => {
  if (!isOpen) return null;

  const isDisabled = confirmationInput !== bookingId;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-80 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray hover:text-[#8c8c8c]"
          disabled={loading}
        >
          ✕
        </button>
        <div className="flex flex-col text-center mt-3">
          <div className="text-lg font-semibold text-black">
            Confirm Booking Deletion
          </div>
          <div className="text-sm font-normal mb-4 text-gray">
            Please type the booking ID <strong>{bookingId}</strong> to confirm
            deletion. This action cannot be undone.
          </div>
          <input
            type="text"
            value={confirmationInput}
            onChange={(e) => setConfirmationInput(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter booking ID"
          />
          <div className="flex justify-center gap-4">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-black"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className={`px-4 py-2 bg-red text-white rounded-md hover:bg-[#e44545] flex items-center justify-center ${
                isDisabled ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={loading || isDisabled}
            >
              {loading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingConfirmationModal;
