import React, { useState } from "react";

interface EditPriceModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookingId: string;
  currentPrice: number;
  onSave: (bookingId: string, newPrice: number) => void;
}

const EditPriceModal: React.FC<EditPriceModalProps> = ({
  isOpen,
  onClose,
  bookingId,
  currentPrice,
  onSave,
}) => {
  const [newPrice, setNewPrice] = useState<number>(currentPrice);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Edit Price</h2>
        <p className="text-sm mb-2">Booking ID: {bookingId}</p>
        <input
          type="number"
          value={newPrice}
          onChange={(e) => setNewPrice(Number(e.target.value))}
          className="block w-full px-3 py-2 border rounded-md mb-4"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(bookingId, newPrice)}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditPriceModal;
