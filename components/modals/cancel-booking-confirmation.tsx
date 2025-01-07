import React from "react";
import Spinner from "../common/spinner";

interface CancelConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const CancelConfirmationModal: React.FC<CancelConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  if (!isOpen) return null;

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
          <div className="text-lg font-semibold text-black">Are you sure?</div>
          <div className="text-sm font-normal mb-4 text-gray">
            Are you sure you want to cancel this booking? This action cannot be
            undone.
          </div>
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
              className="px-4 py-2 bg-red text-white rounded-md hover:bg-[#e44545] flex items-center justify-center"
              disabled={loading}
            >
              {loading ? <Spinner /> : "Confirm"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelConfirmationModal;
