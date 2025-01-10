import React from "react";
import Spinner from "@/components/common/spinner";

interface InventoryTableProps {
  items: any[];
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  actionLoading: string | null;
}

const InventoryTable: React.FC<InventoryTableProps> = ({
  items,
  onEdit,
  onDelete,
  actionLoading,
}) => {
  const getStatusStyles = (quantity: number) => {
    if (quantity > 20) return "text-green-600 bg-green-100";
    if (quantity > 0) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getStatusText = (quantity: number) => {
    if (quantity > 15) return "In Stock";
    if (quantity > 0) return "Low Stock";
    return "Out of Stock";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Item ID</th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Item Name
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Category
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Quantity
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Status
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr
              key={item.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <td className="p-4 text-gray-800">{item.id}</td>
              <td className="p-4 text-gray-800">{item.name}</td>
              <td className="p-4 text-gray-800">{item.category}</td>
              <td className="p-4 text-gray-800">{item.quantity}</td>
              <td className={`p-4`}>
                <div
                  className={`font-semibold rounded px-2 text-center ${getStatusStyles(
                    item.quantity,
                  )}`}
                >
                  {getStatusText(item.quantity)}
                </div>
              </td>
              <td className="p-4 flex gap-4">
                <button
                  className="text-blue-500 hover:underline"
                  onClick={() => onEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="text-red hover:underline"
                  onClick={() => onDelete(item.id)}
                  disabled={actionLoading === item.id}
                >
                  {actionLoading === item.id ? <Spinner /> : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
