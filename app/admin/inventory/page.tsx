"use client";

import React, { useState } from "react";
import InventoryTable from "@/components/tables/inventory-table";
import InventoryFilters from "@/components/common/inventory-filters";
import AddItemModal from "@/components/modals/add-item-modal";
import EditItemModal from "@/components/modals/edit-item-modal";
import { getAllProducts } from "@/network/network/admin/product";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";

const InventoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);

  const {
    data: products = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getAllProducts,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (item: any) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => setIsEditModalOpen(false);

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  if (isError) {
    toast.error("Failed to fetch products.");
    return (
      <div className="text-center text-red-500">Error loading products.</div>
    );
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <Toaster />
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Inventory</h1>
      <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
        <InventoryFilters />
        <div className="flex flex-wrap gap-4 mb-6">
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold rounded-md px-6 py-3 shadow-sm transition"
            onClick={handleOpenModal}
          >
            + Add Item
          </button>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        {products.length > 0 ? (
          <InventoryTable items={products} onEdit={handleOpenEditModal} />
        ) : (
          <div className="text-center text-gray-500 py-8">
            No products available. Click <strong>+ Add Item</strong> to create a
            new product.
          </div>
        )}
      </div>
      {isModalOpen && <AddItemModal onClose={handleCloseModal} />}
      {isEditModalOpen && currentItem && (
        <EditItemModal item={currentItem} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default InventoryPage;
