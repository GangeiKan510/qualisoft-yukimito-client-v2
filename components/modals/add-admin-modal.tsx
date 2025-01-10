import React, { useState } from "react";
import Spinner from "@/components/common/spinner";

interface AddAdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (adminData: { email: string; role: number }) => void;
  loading?: boolean;
}

const AddAdminModal: React.FC<AddAdminModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
}) => {
  const [adminData, setAdminData] = useState({ email: "", role: 2 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({
      ...prev,
      [name]: name === "role" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onConfirm(adminData);
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
          <div className="text-lg font-semibold text-black">
            Add | Edit Admin Account
          </div>
          <div className="mt-4 space-y-4">
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              placeholder="Admin Email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            />
            <select
              name="role"
              value={adminData.role}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring"
              disabled={loading}
            >
              <option value={2}>Admin (Role 2)</option>
              <option value={1}>User (Role 1)</option>
            </select>
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
              className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Add"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddAdminModal;
