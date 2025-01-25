import React, { useState } from "react";
import Spinner from "@/components/common/spinner";
import VerifyVaccineModal from "@/components/modals/verify-vaccine-modal";
import { markPetAsVaccinated } from "@/network/network/admin/pet";
import { toast } from "react-hot-toast";

interface PetVaccinesTableProps {
  pets: any[];
  refetch: () => void;
}

const PetVaccinesTable: React.FC<PetVaccinesTableProps> = ({
  pets,
  refetch,
}) => {
  const [expandedImage, setExpandedImage] = useState<string | null>(null);
  const [selectedPet, setSelectedPet] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [imageLoading, setImageLoading] = useState<boolean>(false);

  const handleToggleImage = (imageUrl: string | null) => {
    setExpandedImage(imageUrl);
    if (imageUrl) setImageLoading(true);
  };

  const handleImageLoad = () => setImageLoading(false);

  const openModal = (pet: any) => {
    setSelectedPet(pet);
    setIsModalOpen(true);
  };

  const handleVerifyVaccine = async () => {
    if (!selectedPet) return;

    setActionLoading(true);
    try {
      const pet = await markPetAsVaccinated(selectedPet.id);
      if (pet) {
        toast.success(`Pet ${selectedPet.name} marked as vaccinated.`);
      }
    } catch (error) {
      console.error("Error marking pet as vaccinated:", error);
      toast.error("Failed to mark pet as vaccinated.");
    } finally {
      setActionLoading(false);
      setIsModalOpen(false);
      refetch();
    }
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
            <th className="p-4 font-semibold text-gray-600 text-white">
              Actions
            </th>
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
                    Verified
                  </span>
                ) : (
                  <span className="px-2 py-1 text-sm text-red-600 bg-red-100 rounded-full">
                    Not Verified
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
                    onClick={() => openModal(pet)}
                    className="text-green-500 hover:underline"
                  >
                    Verify Vaccine
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <VerifyVaccineModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleVerifyVaccine}
        loading={actionLoading}
      />

      {expandedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70"
          onClick={() => handleToggleImage(null)}
        >
          {imageLoading && (
            <div className="absolute">
              <Spinner />
            </div>
          )}
          <div className="relative">
            <img
              src={expandedImage}
              alt="Vaccine"
              className="max-w-full max-h-full rounded-lg shadow-lg"
              onLoad={handleImageLoad}
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
