"use client";

import React, { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Spinner from "../common/spinner";
import { toast } from "react-hot-toast";
import { Pet } from "@/utils/types/pet";
import { updatePet } from "@/network/network/pet";
import { useUser } from "../config/user-context";

type EditPetModalProps = {
  isVisible: boolean;
  onClose: () => void;
  petDetails: Pet | null;
  onUpdate: (updatedPet: any) => void;
};

function EditPetModal({
  isVisible,
  onClose,
  petDetails,
  onUpdate,
}: EditPetModalProps) {
  const { refetchMe } = useUser();
  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [size, setSize] = useState<"Small" | "Medium" | "Large">("Small");
  const [vaccinePhoto, setVaccinePhoto] = useState<File | null>(null);
  const [saveLabel, setSaveLabel] = useState<any>("Save");
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const [isPhotoLoading, setIsPhotoLoading] = useState(true);
  const [isPhotoModalVisible, setIsPhotoModalVisible] = useState(false);

  useEffect(() => {
    if (petDetails) {
      setPetName(petDetails.name);
      setBreed(petDetails.breed);

      const parsedDate = petDetails.birth_date
        ? new Date(petDetails.birth_date)
        : null;
      if (parsedDate && !isNaN(parsedDate.getTime())) {
        setBirthDate(parsedDate);
      } else {
        setBirthDate(null);
      }

      setSize(petDetails.size);
      setPhotoPreview(petDetails.vaccine_photo || null);
      setIsPhotoLoading(true);
    }
  }, [petDetails]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVaccinePhoto(e.target.files[0]);
      setPhotoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleEditPet = async () => {
    if (!petDetails) return;

    setSaveLabel(<Spinner />);

    try {
      const updatedPetData = {
        petId: petDetails.id,
        name: petName,
        breed: breed,
        birth_date:
          birthDate?.toISOString().split("T")[0] ?? petDetails.birth_date,
        size: size,
        vaccine_photo: vaccinePhoto || null,
      };

      await updatePet(updatedPetData);
      toast.error("Failed to update pet. Please try again.");

      onUpdate(updatedPetData);

      onClose();
    } catch (error) {
      console.error("Error updating pet:", error);
      toast.success("Pet updated successfully!");
    } finally {
      setSaveLabel("Save");
      refetchMe();
    }
  };

  const handleImageLoad = () => {
    setIsPhotoLoading(false);
  };

  const handleExpandPhoto = () => {
    setIsPhotoModalVisible(true);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-primary-dark">
      {/* Main Modal */}
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-3xl mx-4 sm:mx-auto flex gap-6">
        {/* Left section: Form inputs */}
        <div className="flex-1 flex flex-col gap-4">
          <h2 className="text-primary-dark text-[24px] font-semibold mb-4 text-center sm:text-left">
            Edit Pet
          </h2>
          <input
            type="text"
            placeholder="Pet Name"
            value={petName}
            onChange={(e) => setPetName(e.target.value)}
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          />
          <input
            type="text"
            placeholder="Breed"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          />
          <DatePicker
            selected={birthDate}
            onChange={(date: Date | null) => setBirthDate(date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select Birth Date"
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          />
          <select
            value={size}
            onChange={(e) =>
              setSize(e.target.value as "Small" | "Medium" | "Large")
            }
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          <div className="font-bold">Update Vaccine Photo</div>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="w-full"
          />
          <div className="flex justify-center gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="w-full max-w-[120px] h-[40px] bg-white border border-primary-dark text-primary-dark flex items-center justify-center rounded-full cursor-pointer mt-6 lg:mt-0"
            >
              Cancel
            </button>
            <button
              onClick={handleEditPet}
              type="button"
              className="w-full max-w-[120px] h-[40px] bg-primary-dark flex items-center justify-center rounded-full cursor-pointer mt-6 lg:mt-0"
            >
              <span className="text-white">{saveLabel}</span>
            </button>
          </div>
        </div>

        {/* Right section: Vaccine photo preview */}
        <div className="flex-1">
          <h2 className="text-primary-dark text-[20px] font-semibold mb-4 text-center sm:text-left">
            Vaccine Photo Preview
          </h2>
          {photoPreview ? (
            <div className="relative w-full h-[300px]">
              {isPhotoLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                  <Spinner type="primary" />
                </div>
              )}
              <img
                src={photoPreview}
                alt="Vaccine Photo"
                className={`w-full h-full object-cover rounded border border-gray ${
                  isPhotoLoading ? "opacity-0" : "opacity-100"
                }`}
                onLoad={handleImageLoad}
                onClick={handleExpandPhoto}
              />
            </div>
          ) : (
            <div className="w-full h-[300px] flex items-center justify-center border border-gray rounded text-gray-500">
              No photo uploaded
            </div>
          )}
        </div>
      </div>

      {/* Full-screen photo modal */}
      {isPhotoModalVisible && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center"
          onClick={() => setIsPhotoModalVisible(false)}
        >
          <img
            src={photoPreview!}
            alt="Expanded Vaccine Photo"
            className="max-w-[90%] max-h-[90%] rounded"
          />
        </div>
      )}
    </div>
  );
}

export default EditPetModal;
