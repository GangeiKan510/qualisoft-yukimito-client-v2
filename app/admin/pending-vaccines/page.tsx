"use client";

import React, { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { getAllPets } from "@/network/network/admin/pet";
import { useQuery } from "@tanstack/react-query";
import PetVaccinesTable from "@/components/tables/pet-vaccines-table";

function Page() {
  const {
    data: pets = [],
    isLoading,
    isError,
    isSuccess,
    refetch,
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
            placeholder="Search pets..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn btn-primary">Search</button>
        </div>
      </header>

      <main className="w-full bg-white rounded-xl shadow-md p-6">
        <PetVaccinesTable pets={pets} refetch={refetch} />
      </main>
    </div>
  );
}

export default Page;
