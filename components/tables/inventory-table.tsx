import React from "react";

interface InventoryTableProps {
  items: any[];
  onEdit: (item: any) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ items, onEdit }) => {
  const getStatusStyles = (quantity: number) => {
    if (quantity > 20) return "text-green-600 bg-green-100";
    if (quantity > 0) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-sm overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Item ID</th>
            <th className="p-4 font-semibold text-gray-600">Item Name</th>
            <th className="p-4 font-semibold text-gray-600">Category</th>
            <th className="p-4 font-semibold text-gray-600">Quantity</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
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
              <td
                className={`p-4 font-semibold rounded ${getStatusStyles(
                  item.quantity,
                )}`}
              >
                {item.quantity > 20
                  ? "In Stock"
                  : item.quantity > 0
                  ? "Low Stock"
                  : "Out of Stock"}
              </td>
              <td className="p-4">
                <button
                  className="text-blue-500 hover:underline mr-3"
                  onClick={() => onEdit(item)}
                >
                  Edit
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
