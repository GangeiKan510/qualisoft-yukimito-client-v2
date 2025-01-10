import React, { useState } from "react";

interface PetVaccinesTableProps {
  pets: any[];
}

const PetVaccinesTable: React.FC<PetVaccinesTableProps> = ({ pets }) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);

  const handleToggleImage = (imageUrl: string | null) => {
    setExpandedImage(imageUrl);
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Pet ID</th>
            <th className="p-4 font-semibold text-gray-600">Pet Name</th>
            <th className="p-4 font-semibold text-gray-600">Breed</th>
            <th className="p-4 font-semibold text-gray-600">Size</th>
            <th className="p-4 font-semibold text-gray-600">Birth Date</th>
            <th className="p-4 font-semibold text-gray-600">Owner</th>
            <th className="p-4 font-semibold text-gray-600">
              Vaccination Status
            </th>
            <th className="p-4 font-semibold text-gray-600">Vaccine Photo</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {pets.map((pet, index) => (
            <tr
              key={pet.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <td className="p-4">{pet.serial}</td>
              <td className="p-4">{pet.name}</td>
              <td className="p-4">{pet.breed}</td>
              <td className="p-4">{pet.size}</td>
              <td className="p-4">
                {new Date(pet.birth_date).toLocaleDateString()}
              </td>
              <td className="p-4">{pet.User?.name || "Unknown"}</td>
              <td className="p-4">
                {pet.is_vaccinated ? (
                  <span className="px-2 py-1 text-sm text-green-600 bg-green-100 rounded-full">
                    Vaccinated
                  </span>
                ) : (
                  <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded-full">
                    Not Vaccinated
                  </span>
                )}
              </td>
              <td className="p-4">
                {pet.vaccine_photo ? (
                  <button
                    onClick={() => handleToggleImage(pet.vaccine_photo)}
                    className="text-blue-500 hover:underline"
                  >
                    View Vaccine
                  </button>
                ) : (
                  <span className="text-gray-500">No Photo</span>
                )}
              </td>
              <td className="p-4 flex gap-4">
                {!pet.is_vaccinated && (
                  <button
                    className="text-green-500 hover:underline"
                    onClick={() => alert(`Verifying vaccine for ${pet.name}`)}
                  >
                    Verify Vaccine
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => handleToggleImage(null)}
        >
          <div className="relative">
            <img
              src={expandedImage}
              alt="Vaccine"
              className="max-w-full max-h-full rounded-lg shadow-lg"
            />
            <button
              onClick={() => handleToggleImage(null)}
              className="absolute top-2 right-2 text-white text-2xl"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PetVaccinesTable;
