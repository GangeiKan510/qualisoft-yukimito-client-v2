"use client";

import React, { useState, useEffect } from "react";
import {
  createVaccine,
  getAllVaccines,
  updateVaccine,
  deleteVaccine,
} from "@/network/network/admin/vaccine";
import Spinner from "@/components/common/spinner";
import DeleteConfirmationModal from "@/components/modals/delete-confirmation-modal";
import CreateVaccineModal from "@/components/modals/create-vaccine";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import UpdateVaccineModal from "@/components/modals/update-vaccine";
import VaccinesTable from "@/components/tables/vaccines-table";

function VaccineManagement() {
  const [vaccines, setVaccines] = useState<any[]>([]);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<boolean>(false);
  const [deleteVaccineId, setDeleteVaccineId] = useState<string | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [selectedVaccine, setSelectedVaccine] = useState<any | null>(null);
  const [createLoading, setCreateLoading] = useState<boolean>(false);
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

  const handleCreateVaccine = async (vaccineData: {
    name: string;
    manufacturer: string;
    batch_number: string;
    expiry_date: string;
    date_administered: string;
  }) => {
    setCreateLoading(true);
    try {
      const formattedData = {
        ...vaccineData,
        expiry_date: new Date(vaccineData.expiry_date).toISOString(),
        date_administered: new Date(
          vaccineData.date_administered,
        ).toISOString(),
      };

      const newVaccine = await createVaccine(formattedData);
      setVaccines((prev) => [...prev, newVaccine]);
      toast.success("Vaccine created successfully.");
      setIsCreateModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error creating vaccine:", error);
      toast.error("Failed to create vaccine.");
    } finally {
      setCreateLoading(false);
    }
  };

  const handleUpdateVaccine = async (vaccineData: {
    id: string;
    name: string;
    manufacturer: string;
    batch_number: string;
    expiry_date: string;
    date_administered: string;
  }) => {
    setUpdateLoading(vaccineData.id);
    try {
      const formattedData = {
        ...vaccineData,
        expiry_date: new Date(vaccineData.expiry_date).toISOString(),
        date_administered: new Date(
          vaccineData.date_administered,
        ).toISOString(),
      };

      await updateVaccine(formattedData);
      toast.success("Vaccine updated successfully.");
      setIsUpdateModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Error updating vaccine:", error);
      toast.error("Failed to update vaccine.");
    } finally {
      setUpdateLoading(null);
    }
  };

  const handleOpenUpdateModal = (vaccine: any) => {
    setSelectedVaccine(vaccine);
    setIsUpdateModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!deleteVaccineId) return;

    setDeleteLoading(true);
    try {
      await deleteVaccine(deleteVaccineId);
      setVaccines((prev) =>
        prev.filter((vaccine) => vaccine.id !== deleteVaccineId),
      );
      toast.success("Vaccine deleted successfully.");
      setDeleteVaccineId(null);
    } catch (error) {
      console.error("Error deleting vaccine:", error);
      toast.error("Failed to delete vaccine.");
    } finally {
      setDeleteLoading(false);
      refetch();
    }
  };

  const handleOpenDeleteModal = (vaccineId: string) => {
    setDeleteVaccineId(vaccineId);
  };

  const handleCloseDeleteModal = () => {
    setDeleteVaccineId(null);
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
            className="p-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            onClick={() => setIsCreateModalOpen(true)}
          >
            + Add Vaccine
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-md p-6">
        {vaccines.length ? (
          <VaccinesTable
            vaccines={vaccines}
            onUpdate={handleOpenUpdateModal}
            onDelete={handleOpenDeleteModal}
            actionLoading={updateLoading}
          />
        ) : (
          <div className="text-center text-gray-500">No vaccines found.</div>
        )}
      </div>

      <DeleteConfirmationModal
        isOpen={!!deleteVaccineId}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDelete}
        loading={deleteLoading}
      />

      <CreateVaccineModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onConfirm={handleCreateVaccine}
        loading={createLoading}
      />

      <UpdateVaccineModal
        isOpen={isUpdateModalOpen}
        onClose={() => setIsUpdateModalOpen(false)}
        onConfirm={handleUpdateVaccine}
        initialData={selectedVaccine}
        loading={!!updateLoading}
      />
    </div>
  );
}

export default VaccineManagement;
