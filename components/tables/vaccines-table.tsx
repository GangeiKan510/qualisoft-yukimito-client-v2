import React from "react";
import Spinner from "@/components/common/spinner";

interface VaccinesTableProps {
  vaccines: any[];
  onUpdate: (vaccine: any) => void;
  onDelete: (id: string) => void;
  actionLoading: string | null;
}

const VaccinesTable: React.FC<VaccinesTableProps> = ({
  vaccines,
  onUpdate,
  onDelete,
  actionLoading,
}) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Vaccine Name</th>
            <th className="p-4 font-semibold text-gray-600">Manufacturer</th>
            <th className="p-4 font-semibold text-gray-600">Batch Number</th>
            <th className="p-4 font-semibold text-gray-600">Expiry Date</th>
            <th className="p-4 font-semibold text-gray-600">
              Date Administered
            </th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.map((vaccine, index) => (
            <tr
              key={vaccine.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <td className="p-4">{vaccine.name}</td>
              <td className="p-4">{vaccine.manufacturer}</td>
              <td className="p-4">{vaccine.batch_number}</td>
              <td className="p-4">
                {new Date(vaccine.expiry_date).toLocaleDateString()}
              </td>
              <td className="p-4">
                {new Date(vaccine.date_administered).toLocaleDateString()}
              </td>
              <td className="p-4 flex gap-4">
                <button
                  onClick={() => onUpdate(vaccine)}
                  disabled={actionLoading === vaccine.id}
                  className="text-blue-500 hover:underline disabled:opacity-50"
                >
                  {actionLoading === vaccine.id ? <Spinner /> : "Edit"}
                </button>
                <button
                  onClick={() => onDelete(vaccine.id)}
                  disabled={actionLoading === vaccine.id}
                  className="text-red hover:underline disabled:opacity-50"
                >
                  {actionLoading === vaccine.id ? <Spinner /> : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VaccinesTable;
