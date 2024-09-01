"use client";

import React, { useState } from "react";
import VaccinePhoto from "../modals/vaccine-photo";
import Image from "next/image";
import Spinner from "../common/spinner";
import { deletePet } from "@/app/api/network/pet";
import ConfirmationModal from "../common/confirmation-modal";
import { toast } from "react-hot-toast";

type PetCardProps = {
  petName: string;
  size: string;
  breed: string;
  vaccineStatus: "pending" | "approved";
  onEdit: () => void;
  onDelete: () => void;
  onViewVaccine: () => void;
  vaccinePhotoUrl: string;
  petId: string;
};

function PetCard({
  petName,
  size,
  breed,
  vaccineStatus,
  onEdit,
  onDelete,
  onViewVaccine,
  vaccinePhotoUrl,
  petId,
}: PetCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [deleteLabel, setDeleteLabel] = useState<any>("Delete");
  const [loading, setLoading] = useState(false);

  const vaccineText =
    vaccineStatus === "pending" ? "vaccine pending" : "vaccine approved";

  const handleViewVaccine = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // TODO: Automaticall Close Confirmation Modal Adter Delete
  // TODO: Refetch Pets to Load List after adding or deleting a pet
  const handleDelete = async () => {
    setLoading(true);
    setDeleteLabel(<Spinner />);
    try {
      await deletePet(petId);
      setShowDeleteConfirmation(false);
      onDelete();
      toast.success("Pet deleted successfully!");
    } catch (error) {
      console.error("Error deleting pet:", error);
      toast.error("Failed to delete pet.");
    }
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
                  className="flex gap-1 text-primary-dark underline underline-offset-2 cursor-pointer"
                  onClick={handleViewVaccine}
                >
                  <Image
                    width={24}
                    height={24}
                    src="/svg/preview-image.svg"
                    alt="preview-icon"
                    className="max-w-full h-auto rounded-lg"
                  />
                  View Vaccine
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-3 mt-3 md:mt-0 items-center font-semibold cursor-pointer text-primary-dark">
            <div onClick={onEdit}>Edit</div>
            <div
              className="flex items-center cursor-pointer"
              onClick={() => setShowDeleteConfirmation(true)}
            >
              {loading ? (
                <Spinner />
              ) : (
                <>
                  <Image
                    width={24}
                    height={24}
                    src="/svg/delete-pet-icon.svg"
                    alt="delete-icon"
                    className="max-w-full h-auto rounded-lg"
                  />
                </>
              )}
            </div>
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
          className="max-w-full h-auto rounded-lg p-4"
        />
      </VaccinePhoto>

      {/* Confirmation Modal for deleting a pet */}
      <ConfirmationModal
        isOpen={showDeleteConfirmation}
        title={loading ? <Spinner /> : "Confirm Delete"}
        message={`Are you sure you want to delete ${petName}?`}
        type="danger"
        confirmMessage={deleteLabel}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteConfirmation(false)}
      />
    </>
  );
}

export default PetCard;
