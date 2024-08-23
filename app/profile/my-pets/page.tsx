"use client"; // Make the entire page a client component

import PetCard from "@/app/components/ cards/pet-card";
import React from "react";
import { Toaster } from "react-hot-toast";

function Page() {
  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="w-full lg:w-[950px] flex justify-between">
        <div className="text-[24px] font-semibold text-primary-dark">
          Your Pets
        </div>
        <div className="h-[40px] flex items-center px-5 bg-secondary text-white rounded-full cursor-pointer">
          Add pet
        </div>
      </div>

      {/* Pet Card */}
      <div className="flex flex-col gap-3">
        <PetCard
          petName="Jax"
          size="large"
          breed="Doberman"
          vaccineStatus="pending"
          onEdit={() => console.log("Edit clicked")}
          onViewVaccine={() => console.log("View Vaccine clicked")}
        />
        <PetCard
          petName="Riri"
          size="small"
          breed="Exo Persian"
          vaccineStatus="pending"
          onEdit={() => console.log("Edit clicked")}
          onViewVaccine={() => console.log("View Vaccine clicked")}
        />
      </div>
    </div>
  );
}

export default Page;
