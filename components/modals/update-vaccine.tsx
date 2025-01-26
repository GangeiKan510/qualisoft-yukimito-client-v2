import React, { useState, useEffect } from "react";
import Spinner from "../common/spinner";

interface UpdateVaccineModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (vaccineData: {
    id: string;
    name: string;
    manufacturer: string;
    batch_number: string;
    expiry_date: string;
    date_administered: string;
  }) => void;
  initialData: {
    id: string;
    name: string;
    manufacturer: string;
    batch_number: string;
    expiry_date: string;
    date_administered: string;
  } | null;
  loading: boolean;
}

const UpdateVaccineModal: React.FC<UpdateVaccineModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  initialData,
  loading,
}) => {
  const [vaccineData, setVaccineData] = useState({
    id: "",
    name: "",
    manufacturer: "",
    batch_number: "",
    expiry_date: "",
    date_administered: "",
  });

  useEffect(() => {
    if (initialData) {
      setVaccineData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setVaccineData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    onConfirm(vaccineData);
  };

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
        <div className="flex flex-col text-center mt-3">
          <div className="text-lg font-semibold text-black">Update Vaccine</div>
          <div className="mt-4 space-y-4">
            <label className="block text-left font-semibold mb-1px w-30">
              Vaccine Name:
            </label>
            <input
              type="text"
              name="name"
              value={vaccineData.name}
              onChange={handleChange}
              placeholder="Vaccine Name"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            />
            <label className="block text-left font-semibold mb-1px w-30">
              Manufacturer:
            </label>
            <input
              type="text"
              name="manufacturer"
              value={vaccineData.manufacturer}
              onChange={handleChange}
              placeholder="Manufacturer"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            />
            <label className="block text-left font-semibold mb-1px w-30">
              Description/Purpose:
            </label>
            <input
              type="text"
              name="batch_number"
              value={vaccineData.batch_number}
              onChange={handleChange}
              placeholder="Description/Purpose"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            />
            <label className="block text-left font-semibold mb-1px w-30">
              Expiry Date:
            </label>
            <input
              type="date"
              name="expiry_date"
              value={vaccineData.expiry_date.split("T")[0]}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            />
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-black"
              disabled={loading}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Update"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateVaccineModal;
