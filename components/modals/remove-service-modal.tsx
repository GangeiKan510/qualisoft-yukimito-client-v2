"use client";

import React from "react";

interface RemoveServiceModalProps {
  isOpen: boolean;
  onClose: () => void;
  additionalServices: any[];
  onRemove: (serviceId: string) => void;
  loading: boolean;
}

const RemoveServiceModal: React.FC<RemoveServiceModalProps> = ({
  isOpen,
  onClose,
  additionalServices,
  onRemove,
  loading,
}) => {
  if (!isOpen) return null;

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
          Remove Additional Service
        </div>
        {additionalServices.length > 0 ? (
          <ul className="divide-y divide-gray-300">
            {additionalServices.map((service) => (
              <li
                key={service.id}
                className="flex justify-between items-center py-2"
              >
                <div>
                  <div className="font-medium">{service.title}</div>
                  <div className="text-sm text-gray-500">₱{service.amount}</div>
                </div>
                <button
                  onClick={() => onRemove(service.id)}
                  className={`px-4 border border-red py-2 bg-red-600 text-red rounded-md hover:bg-red-700 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">
            No additional services found.
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoveServiceModal;
