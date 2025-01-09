import React from 'react';

const InventoryTable: React.FC = () => {
  const inventoryItems = [
    { id: 1, name: 'Dog Food - Large Pack', category: 'Food', quantity: 50, status: 'In Stock' },
    { id: 2, name: 'Cat Litter', category: 'Supplies', quantity: 10, status: 'Low Stock' },
    { id: 3, name: 'Tick and Flea Shampoo', category: 'Medicine', quantity: 0, status: 'Out of Stock' },
  ];

  const getStatusStyles = (status: string) => {
    switch (status) {
      case 'In Stock':
        return 'text-green-600 bg-green-100';
      case 'Low Stock':
        return 'text-yellow-600 bg-yellow-100';
      case 'Out of Stock':
        return 'text-red-600 bg-red-100';
      default:
        return '';
    }
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
          {inventoryItems.map((item, index) => (
            <tr
              key={item.id}
              className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
            >
              <td className="p-4 text-gray-800">{item.id}</td>
              <td className="p-4 text-gray-800">{item.name}</td>
              <td className="p-4 text-gray-800">{item.category}</td>
              <td className="p-4 text-gray-800">{item.quantity}</td>
              <td className={`p-4 font-semibold rounded ${getStatusStyles(item.status)}`}>
                {item.status}
              </td>
              <td className="p-4">
                <button className="text-blue-500 hover:underline mr-3">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default InventoryTable;
