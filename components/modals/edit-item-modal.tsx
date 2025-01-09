import React, { useState } from 'react';

interface EditItemModalProps {
  item: any;
  onClose: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({ item, onClose }) => {
  const [name, setName] = useState(item.name);
  const [quantity, setQuantity] = useState(item.quantity);
  const [status, setStatus] = useState(item.status);

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Saves the changes made to the item and closes the modal.
   * @todo Call the API to update the item in the database.
   */
/******  aac84f73-ecf2-4534-a178-4e721544c5d9  *******/  const handleSave = () => {
    // Update the item with the new values
    const updatedItem = { ...item, name, quantity, status };
    // Call the API or update the state with the updated item
    console.log(updatedItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
        <div className="space-y-4">
          <input
            type="text"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Item Name"
          />
          <input
            type="number"
            name="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Quantity"
          />
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Out of Stock">Out of Stock</option>
          </select>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;