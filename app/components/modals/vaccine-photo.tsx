import React from "react";

type VaccinePhotoProps = {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const VaccinePhoto = ({ isVisible, onClose, children }: VaccinePhotoProps) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        className="absolute inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-5 rounded-lg shadow-lg z-10">
        {children}
        <button onClick={onClose} className="absolute top-2 right-2 text-black">
          X
        </button>
      </div>
    </div>
  );
};

export default VaccinePhoto;
