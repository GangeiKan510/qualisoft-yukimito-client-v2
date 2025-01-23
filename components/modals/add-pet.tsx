"use client";

import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useUser } from "../config/user-context";
import { addPet } from "@/network/network/pet";
import { toast } from "react-hot-toast";
import Spinner from "../common/spinner";

type AddPetModalProps = {
  isVisible: boolean;
  onClose: () => void;
};

function AddPetModal({ isVisible, onClose }: AddPetModalProps) {
  const { user, refetchMe } = useUser();
  const userId = user?.userInfo?.id;

  const [petName, setPetName] = useState("");
  const [breed, setBreed] = useState("");
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [size, setSize] = useState("Small");
  const [vaccinePhoto, setVaccinePhoto] = useState<File | null>(null);
  const [saveLabel, setSaveLabel] = useState<any>("Add");

  const isFormComplete = (): boolean => {
    return petName.trim() !== "" && breed.trim() !== "" && birthDate !== null && size !== "" && vaccinePhoto !== null;
  };

  const handleAddPet = async () => {
    setSaveLabel(<Spinner />);
    if (!isFormComplete() || !userId) {
      toast.error("Please fill all fields correctly.");
      setSaveLabel("Add");
      return;
    }

    if (!birthDate) {
      toast.error("Please select a birth date.");
      setSaveLabel("Add");
      return;
    }

    const petData = {
      userId,
      name: petName,
      breed,
      birth_date: birthDate.toISOString().split("T")[0],
      size,
      vaccine_photo: vaccinePhoto,
    };

    try {
      await addPet(petData);
      toast.success("Pet added successfully!");
      onClose();
    } catch (error) {
      console.error("Error adding pet:", error);
      toast.error("Failed to add pet.");
    } finally {
      setSaveLabel("Add");
      refetchMe();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVaccinePhoto(e.target.files[0]);
    }
  };

  const today = new Date();
  const maxDate = today;

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 text-primary-dark">
      <div className="relative bg-white p-6 rounded shadow-lg w-full max-w-md mx-4 sm:mx-auto">
        <h2 className="text-primary-dark text-[24px] font-semibold mb-4 text-center sm:text-left">
          Add New Pet
        </h2>
        <div className="flex flex-col gap-4">
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
            maxDate={maxDate}
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          />
          <select
            value={size}
            onChange={(e) => setSize(e.target.value)}
            className="w-full h-[50px] border border-gray rounded-[8px] px-5"
          >
            <option value="Small">Small</option>
            <option value="Medium">Medium</option>
            <option value="Large">Large</option>
          </select>
          <div>
            <label htmlFor="vaccine-photo" className="block text-sm font-medium text-gray-700">
              Add Your Vaccine Photo Here!
            </label>
            <input
              id="vaccine-photo"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="w-full"
            />
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              onClick={onClose}
              type="button"
              className="w-full max-w-[120px] h-[40px] bg-white border border-primary-dark text-primary-dark flex items-center justify-center rounded-full cursor-pointer mt-6 lg:mt-0"
            >
              Cancel
            </button>
            <button
              onClick={handleAddPet}
              type="button"
              disabled={!isFormComplete()}
              className={`w-full max-w-[120px] h-[40px] flex items-center justify-center rounded-full mt-6 lg:mt-0 ${
                isFormComplete() ? "bg-primary-dark text-white" : "bg-zinc-400 text-white cursor-not-allowed"
              }`}
            >
              <span>{saveLabel}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddPetModal;
