"use client";

import React from "react";

type PetCardProps = {
  petName: string;
  size: string;
  breed: string;
  vaccineStatus: "pending" | "approved";
  onEdit: () => void;
  onViewVaccine: () => void;
};

function PetCard({
  petName,
  size,
  breed,
  vaccineStatus,
  onEdit,
  onViewVaccine,
}: PetCardProps) {
  const vaccineText =
    vaccineStatus === "pending" ? "vaccine pending" : "vaccine approved";

  return (
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
                onClick={onViewVaccine}
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
  );
}

export default PetCard;
