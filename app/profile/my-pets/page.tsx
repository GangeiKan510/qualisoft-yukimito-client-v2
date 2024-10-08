"use client";

import React, { useEffect, useState } from "react";
import PetCard from "@/app/components/cards/pet-card";
import toast, { Toaster } from "react-hot-toast";
import { useUser } from "@/app/components/config/user-context";
import Spinner from "@/app/components/common/spinner";
import AddPetModal from "@/app/components/modals/add-pet";
import ConfirmationModal from "@/app/components/common/confirmation-modal";

function Page() {
  const { user, refetchMe } = useUser();
  const [pets, setPets] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [isConfirmationModalVisible, setConfirmationModalVisible] =
    useState(false);
  const [petToDelete, setPetToDelete] = useState<string | null>(null);

  useEffect(() => {
    if (user?.userInfo?.pets) {
      setPets(user.userInfo.pets);
      setLoading(false);
    } else {
      setPets([]);
      setLoading(false);
    }
  }, [user]);

  const handleDeletePet = (petId: string) => {
    setPetToDelete(petId);
    setConfirmationModalVisible(true);
  };

  const confirmDeletePet = async () => {
    if (!petToDelete) return;

    // Call your delete API here
    // await deletePet(petToDelete);

    setPets(pets.filter((pet) => pet.id !== petToDelete));
    setConfirmationModalVisible(false);
    setPetToDelete(null);
  };

  return (
    <div className="w-full flex flex-col gap-5 p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="w-[400px] lg:w-[950px] flex justify-between">
        <div className="text-[24px] font-semibold text-primary-dark">
          Your Pets
        </div>
        <div
          className="h-[40px] flex items-center px-5 bg-secondary text-white rounded-full cursor-pointer"
          onClick={() => setModalVisible(true)}
        >
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
              petId={pet.id}
            />
          ))}
        </div>
      )}

      {/* Add Pet Modal */}
      <AddPetModal
        isVisible={isModalVisible}
        onClose={() => setModalVisible(false)}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={isConfirmationModalVisible}
        title="Delete Pet"
        message="Are you sure you want to delete this pet?"
        type="danger"
        confirmMessage="Delete"
        onConfirm={confirmDeletePet}
        onCancel={() => setConfirmationModalVisible(false)}
      />
    </div>
  );
}

export default Page;
