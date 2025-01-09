"use client";

import React from 'react';
import CustomerInformation from './components/customer-information';

const CustomersPage = () => {
  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Customer Information</h1>
      <div className="flex justify-end items-center gap-4 mb-4"> 
        <input
          type="text"
          placeholder="Search customer..."
          className="border border-gray-300 rounded-md p-3 focus:ring-2 focus:ring-blue-500 outline-none w-64"
        />
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-3 shadow-sm transition">
          Search
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <CustomerInformation onDelete={() => {}} />
      </div>
    </div>
  );
};

export default CustomersPage;
