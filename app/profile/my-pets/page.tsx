"use client";

import React, { useEffect, useState } from "react";
import PetCard from "@/app/components/ cards/pet-card";
import { Toaster } from "react-hot-toast";
import { useUser } from "@/app/components/config/user-context";
import Spinner from "@/app/components/common/spinner";

function Page() {
  const { user } = useUser();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userInfo?.pets) {
      setPets(user.userInfo.pets);
      setLoading(false);
    } else {
      setLoading(true);

      const fetchPets = async () => {
        try {
          const fetchedPets: React.SetStateAction<any[]> = [];
          setPets(fetchedPets);
        } catch (err) {
          setError("Failed to load pets.");
        } finally {
          setLoading(false);
        }
      };

      fetchPets();
    }
  }, [user]);

  console.log(user);

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

      {loading ? (
        <div>
          <Spinner type="secondary" />
        </div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : pets.length === 0 ? (
        <div className="text-center text-gray">No pets yet.</div>
      ) : (
        <div className="flex flex-col gap-3">
          {pets.map((pet) => (
            <PetCard
              key={pet.id}
              petName={pet.name}
              size={pet.size}
              breed={pet.breed}
              vaccineStatus={pet.vaccine_photo ? "approved" : "pending"}
              vaccinePhotoUrl={pet.vaccine_photo}
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
