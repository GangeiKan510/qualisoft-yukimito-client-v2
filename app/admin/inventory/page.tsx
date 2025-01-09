"use client";

import React, { useState, useEffect } from "react";
import InventoryTable from "@/components/tables/inventory-table";
import InventoryFilters from "@/components/common/inventory-filters";
import AddItemModal from "@/components/modals/add-item-modal";
import EditItemModal from "@/components/modals/edit-item-modal";
import { getAllProducts, deleteProduct } from "@/network/network/admin/product";
import { useQuery } from "@tanstack/react-query";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";

const InventoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentItem, setCurrentItem] = useState<any | null>(null);
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

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

  useEffect(() => {
    if (products.length) {
      setFilteredProducts(products);
      toast.success("Products fetched successfully.");
    }
  }, [products]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch products.");
    }
  }, [isError]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = products.filter((product: any) =>
      JSON.stringify(product).toLowerCase().includes(term),
    );
    setFilteredProducts(filtered);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleOpenEditModal = (item: any) => {
    setCurrentItem(item);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => setIsEditModalOpen(false);

  const handleDeleteProduct = async (productId: string) => {
    setActionLoading(productId);
    try {
      await deleteProduct(productId);
      toast.success("Product deleted successfully.");
      refetch();
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Failed to delete product.");
    } finally {
      setActionLoading(null);
    }
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
        <h1 className="text-2xl font-bold text-primary-dark">Inventory</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search products..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            className="p-2 text-sm bg-green-500 text-white rounded hover:bg-green-600"
            onClick={handleOpenModal}
          >
            + Add Item
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-md p-6">
        {filteredProducts.length > 0 ? (
          <InventoryTable
            items={filteredProducts}
            onEdit={handleOpenEditModal}
            onDelete={handleDeleteProduct}
            actionLoading={actionLoading}
          />
        ) : (
          <div className="text-center text-gray-500 py-8">
            No products found. Click <strong>+ Add Item</strong> to create a new
            product.
          </div>
        )}
      </div>

      {isModalOpen && (
        <AddItemModal onClose={handleCloseModal} onSuccess={refetch} />
      )}
      {isEditModalOpen && currentItem && (
        <EditItemModal item={currentItem} onClose={handleCloseEditModal} />
      )}
    </div>
  );
};

export default InventoryPage;
