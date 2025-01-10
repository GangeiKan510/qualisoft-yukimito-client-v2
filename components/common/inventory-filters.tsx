import React from 'react';

const InventoryFilters: React.FC = () => {
  return (
    <div className="flex flex-wrap gap-4 mb-6">
      <input
        type="text"
        placeholder="Search items..."
        className="flex-grow border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none"
      />
      <select className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none">
        <option value="all">All Categories</option>
        <option value="food">Food</option>
        <option value="supplies">Supplies</option>
        <option value="medicine">Medicine</option>
      </select>
      <select className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none">
        <option value="all">All Status</option>
        <option value="in-stock">In Stock</option>
        <option value="low-stock">Low Stock</option>
        <option value="out-of-stock">Out of Stock</option>
      </select>
      <button className="bg-[#fde175] hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-3 shadow-sm transition">
        Filter
      </button>
    </div>
  );
};

export default InventoryFilters;
