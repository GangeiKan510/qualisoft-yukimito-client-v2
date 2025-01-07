import React from "react";
import Image from "next/image";

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
        <Image
          width={24}
          height={24}
          src="/svg/close-icon.svg"
          alt="close-icon"
          className="absolute top-3 right-3 cursor-pointer"
          onClick={onClose}
        />
        {children}
      </div>
    </div>
  );
};

export default VaccinePhoto;
