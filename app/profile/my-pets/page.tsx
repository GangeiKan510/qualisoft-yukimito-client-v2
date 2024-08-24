"use client";

import React, { useEffect, useState } from "react";
import PetCard from "@/app/components/ cards/pet-card";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/app/components/config/user-context";
import { getUserPets } from "@/app/api/network/pet";
import Spinner from "@/app/components/common/spinner";

function Page() {
  const { user } = useUser();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPets = async () => {
      try {
        setLoading(true);
        setError(null);

        const userId = user?.userInfo.id;
        if (!userId) {
          setError("User ID is not available.");
          return;
        }

        const petsData = await getUserPets(userId);
        if (!Array.isArray(petsData)) {
          setError("Failed to load pets.");
          return;
        }

        setPets(petsData);
      } catch (error) {
        console.error("Error fetching pets:", error);
        setError("Error fetching pets. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [user]);

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

      {/* Display loading, error, or pets */}
      {loading ? (
        <div>
          <Spinner />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : pets.length === 0 ? (
        <div>No pets yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              petName={pet.name}
              size={pet.size}
              breed={pet.breed}
              vaccineStatus={pet.vaccine_photo ? "approved" : "pending"}
              onEdit={() => console.log("Edit clicked")}
              onViewVaccine={() => console.log("View Vaccine clicked")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
