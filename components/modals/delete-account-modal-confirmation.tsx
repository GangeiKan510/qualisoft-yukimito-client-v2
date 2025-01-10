import React from "react";
import Spinner from "../common/spinner";

interface DeleteAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  email: string;
  confirmationEmail: string;
  setConfirmationEmail: (email: string) => void;
}

const DeleteAccountModal: React.FC<DeleteAccountModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  email,
  confirmationEmail,
  setConfirmationEmail,
}) => {
  if (!isOpen) return null;

  const isDisabled = confirmationEmail !== email;

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
            Confirm Account Deletion
          </div>
          <div className="text-sm font-normal mb-4 text-gray">
            Please type your email <strong>{email}</strong> to confirm.
          </div>
          <input
            type="email"
            value={confirmationEmail}
            onChange={(e) => setConfirmationEmail(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md mb-4"
            placeholder="Enter your email"
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
              {loading ? <Spinner /> : "Delete"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
