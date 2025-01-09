import React from "react";
import toast, { Toaster } from "react-hot-toast";

function Page() {
  return (
    <div className="w-full flex flex-col px-8 bg-gray-100">
      <Toaster />
      <header className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">Pet Vaccines</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Search vaccines..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="btn btn-primary">Search</button>
          
        </div>
      </header>

      <main className="w-full">
        <ul className="space-y-4">
          <li className="w-full p-4 bg-white shadow-md rounded-lg flex items-start">
            
            <div className="flex-1">
            <p className="text-gray-700">
                <strong>Pet Owner:</strong> Dave
              </p>
              <p className="text-gray-700">
                <strong>Vaccine Name:</strong> Vaccine name
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
                  Verify Vaccine
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
