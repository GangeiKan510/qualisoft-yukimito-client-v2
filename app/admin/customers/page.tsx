import React from "react";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  return (
    <div className="w-full flex flex-col px-8 bg-gray-100">
      <Toaster />
      <header className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Customers</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search customers..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn btn-primary">Search</button>
          <button className="p-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">
            Add Customer
          </button>
        </div>
      </header>

      <main className="w-full">
        <ul className="space-y-4">
          <li className="w-full p-4 bg-white shadow-md rounded-lg flex items-start">
            <img
              src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png"
              alt="Profile Icon"
              className="w-20 h-20 rounded-full mr-4"
            />
            <div className="flex-1">
              <p className="text-gray-700">
                <strong>Name:</strong> John Doe
              </p>
              <p className="text-gray-700">
                <strong>Detail 1:</strong> Example detail
              </p>
              <p className="text-gray-700">
                <strong>Detail 2:</strong> Example detail
              </p>
              <p className="text-gray-700">
                <strong>Detail 3:</strong> Example detail
              </p>
              <div className="flex justify-end mt-4 space-x-3">
                <button className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-yellow-700 disabled:opacity-50">
                  Edit
                </button>
                <button className="px-4 py-2 bg-red text-white rounded hover:bg-[#da3d3d] disabled:opacity-50">
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </main>
    </div>
  );
}

export default Page;
