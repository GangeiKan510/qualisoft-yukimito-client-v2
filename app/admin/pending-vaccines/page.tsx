"use client";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAllPets } from "@/network/network/admin/pet";
import { useQuery } from "@tanstack/react-query";

function Page() {
  const {
    data: pets = [],
    isLoading,
    isError,
    isSuccess,
  } = useQuery({
    queryKey: ["pets"],
    queryFn: getAllPets,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      console.log("Fetched pets:", pets);
      toast.success("Pets fetched successfully.");
    }
  }, [pets, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch pets.");
    }
  }, [isError]);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8 bg-gray-100">
      <Toaster />
      <header className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Pet Vaccines</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search vaccines..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>

      <main className="w-full">
        <ul className="space-y-4">
          {pets.map((pet: any) => (
            <li
              key={pet.id}
              className="w-full p-4 bg-white shadow-md rounded-lg flex items-start"
            >
              <div className="flex-1">
                <p className="text-gray-700">
                  <strong>Pet Owner:</strong> {pet.User?.name || "Unknown"}
                </p>
                <p className="text-gray-700">
                  <strong>Pet Name:</strong> {pet.name}
                </p>
                <p className="text-gray-700">
                  <strong>Breed:</strong> {pet.breed}
                </p>
                <p className="text-gray-700">
                  <strong>Birth Date:</strong>{" "}
                  {new Date(pet.birth_date).toLocaleDateString()}
                </p>
                <div className="flex justify-end mt-4 space-x-3">
                  <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-yellow-700 disabled:opacity-50">
                    Verify Vaccine
                  </button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default Page;
