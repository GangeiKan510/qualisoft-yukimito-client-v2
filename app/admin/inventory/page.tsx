"use client";

import React, { useState } from 'react';
import InventoryTable from '@/components/tables/inventory-table';
import InventoryFilters from './components/inventory-filters';
import AddItemModal from './components/add-item-modal';

const InventoryPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
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
        <InventoryTable />
      </div>
      {isModalOpen && <AddItemModal onClose={handleCloseModal} />}
    </div>
  );
};

export default InventoryPage;
