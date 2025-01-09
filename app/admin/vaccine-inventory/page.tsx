"use client";

import React, { useState, useEffect } from "react";
import {
  createVaccine,
  getAllVaccines,
  updateVaccine,
  deleteVaccine,
} from "@/network/network/admin/vaccine";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";

function VaccineManagement() {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["vaccines"],
    queryFn: getAllVaccines,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (data) {
      setVaccines(data);
      toast.success("Vaccines fetched successfully.");
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch vaccines.");
    }
  }, [isError]);

  const handleCreateVaccine = async () => {
    try {
      const newVaccine = await createVaccine({
        name: "New Vaccine",
        manufacturer: "Manufacturer X",
        batch_number: "12345",
        expiry_date: new Date().toISOString(),
        date_administered: new Date().toISOString(),
      });
      setVaccines((prev) => [...prev, newVaccine]);
      toast.success("Vaccine created successfully.");
      refetch();
    } catch (error) {
      console.error("Error creating vaccine:", error);
      toast.error("Failed to create vaccine.");
    }
  };

  const handleUpdateVaccine = async (vaccineId: string) => {
    setUpdateLoading(vaccineId);
    try {
      await updateVaccine({
        id: vaccineId,
        name: "Updated Vaccine",
        manufacturer: "Updated Manufacturer",
      });
      refetch();
      toast.success("Vaccine updated successfully.");
    } catch (error) {
      console.error("Error updating vaccine:", error);
      toast.error("Failed to update vaccine.");
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleDeleteVaccine = async (vaccineId: string) => {
    setDeleteLoading(vaccineId);
    try {
      await deleteVaccine(vaccineId);
      setVaccines((prev) => prev.filter((vaccine) => vaccine.id !== vaccineId));
      toast.success("Vaccine deleted successfully.");
    } catch (error) {
      console.error("Error deleting vaccine:", error);
      toast.error("Failed to delete vaccine.");
    } finally {
      setDeleteLoading(null);
      refetch();
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
    setVaccines(
      data?.filter((vaccine: any) =>
        JSON.stringify(vaccine).toLowerCase().includes(term),
      ) || [],
    );
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8">
      <Toaster />
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">
          Vaccine Management
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search vaccines..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            className="p-2 text-sm text-gray-600 rounded hover:bg-gray-100"
            onClick={() => toast("Filter & Sort feature coming soon!")}
          >
            Filter & Sort
          </button>
          <button
            className="p-2 text-sm bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={handleCreateVaccine}
          >
            Add Vaccine
          </button>
        </div>
      </div>

      <div className="w-full">
        {vaccines.length ? (
          <ul>
            {vaccines.map((vaccine) => (
              <li
                key={vaccine.id}
                className="w-full mb-4 p-4 border rounded-lg"
              >
                <p>
                  <strong>Name:</strong> {vaccine.name}
                </p>
                <p>
                  <strong>Manufacturer:</strong> {vaccine.manufacturer}
                </p>
                <p>
                  <strong>Batch Number:</strong> {vaccine.batch_number}
                </p>
                <p>
                  <strong>Expiry Date:</strong>{" "}
                  {new Date(vaccine.expiry_date).toLocaleDateString()}
                </p>
                <p>
                  <strong>Date Administered:</strong>{" "}
                  {new Date(vaccine.date_administered).toLocaleDateString()}
                </p>
                <div className="w-full mt-4 flex justify-end space-x-4">
                  <button
                    onClick={() => handleUpdateVaccine(vaccine.id)}
                    disabled={updateLoading === vaccine.id}
                    className="px-4 py-2 bg-yellow-600 text-white rounded hover:bg-yellow-700 disabled:opacity-50"
                  >
                    {updateLoading === vaccine.id && <Spinner />}
                    {updateLoading !== vaccine.id && "Update"}
                  </button>
                  <button
                    onClick={() => handleDeleteVaccine(vaccine.id)}
                    disabled={deleteLoading === vaccine.id}
                    className="px-4 py-2 bg-red text-white rounded hover:bg-[#da3d3d] disabled:opacity-50"
                  >
                    {deleteLoading === vaccine.id && <Spinner />}
                    {deleteLoading !== vaccine.id && "Delete"}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="text-center text-gray-500">No vaccines found.</div>
        )}
      </div>
    </div>
  );
}

export default VaccineManagement;
