"use client";

import React, { useState } from "react";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);
  };

  return (
    <div className="w-full flex flex-col px-8">
      <Toaster />

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">
          User Management
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            className="p-2 text-sm text-gray-600 rounded hover:bg-gray-100"
            onClick={() => toast("Filter & Sort feature coming soon!")}
          >
            Filter & Sort
          </button>
        </div>
      </div>

      <div className="w-full text-center text-gray-500">
        <Spinner type="primary" />
      </div>
    </div>
  );
}

export default Page;
