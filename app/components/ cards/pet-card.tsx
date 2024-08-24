"use client";

import React, { useState } from "react";
import VaccinePhoto from "../modals/vaccine-photo";
import Image from "next/image";

type PetCardProps = {
  petName: string;
  size: string;
  breed: string;
  vaccineStatus: "pending" | "approved";
  onEdit: () => void;
  onViewVaccine: () => void;
  vaccinePhotoUrl: string; // Add this prop to hold the vaccine photo URL
};

function PetCard({
  petName,
  size,
  breed,
  vaccineStatus,
  onEdit,
  onViewVaccine,
  vaccinePhotoUrl,
}: PetCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const vaccineText =
    vaccineStatus === "pending" ? "vaccine pending" : "vaccine approved";

  const handleViewVaccine = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  return (
    <>
      <div className="w-full lg:w-[950px] h-auto md:h-[103px] flex flex-col md:flex-row items-center bg-white hover:bg-[#D2EAE7] rounded-[16px] shadow hover:shadow-lg">
        <div className="w-full p-5 flex gap-4 items-center">
          <div className="hidden lg:flex items-center justify-center text-[24px] text-white !w-[50px] !h-[44.234px] bg-primary-dark rounded-full leading-none">
            {petName.charAt(0).toUpperCase()}
          </div>
          <div className="w-full flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <div className="font-semibold text-primary-dark">
                {petName} ({size}) - {vaccineText}
              </div>
              <div>
                <span className="text-gray">{breed}</span>&nbsp;
                <span
                  className="text-primary-dark underline underline-offset-2 cursor-pointer"
                  onClick={handleViewVaccine}
                >
                  View Vaccine
                </span>
              </div>
            </div>
          </div>

          <div
            className="mt-3 md:mt-0 flex items-center font-semibold cursor-pointer text-primary-dark"
            onClick={onEdit}
          >
            Edit
          </div>
        </div>
      </div>

      {/* Modal for vaccine photo */}
      <VaccinePhoto isVisible={isModalVisible} onClose={handleCloseModal}>
        <Image
          width={500}
          height={100}
          src={vaccinePhotoUrl}
          alt="Vaccine Photo"
          className="max-w-full h-auto rounded-lg"
        />
      </VaccinePhoto>
    </>
  );
}

export default PetCard;
