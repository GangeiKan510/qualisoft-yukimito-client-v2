"use client";

import React, { useState } from "react";

interface AddServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (service: string) => void;
  loading: boolean;
}

const AddServiceModal: React.FC<AddServiceModalProps> = ({
  isOpen,
  onClose,
  onAdd,
  loading,
}) => {
  const [selectedService, setSelectedService] = useState<string>("");

  if (!isOpen) return null;

  const handleAdd = () => {
    if (selectedService) {
      onAdd(selectedService);
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
        <div className="text-lg font-semibold text-black mb-4">Add Service</div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-1">
            Select Service
          </label>
          <select
            className="w-full px-3 py-2 border border-gray-300 rounded-md"
            value={selectedService}
            onChange={(e) => setSelectedService(e.target.value)}
          >
            <option value="" disabled>
              Choose a service
            </option>
            <option value="Errand Care">Errand Care</option>
            <option value="Day Care">Day Care</option>
          </select>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-black"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            onClick={handleAdd}
            className={`px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddServiceModal;
