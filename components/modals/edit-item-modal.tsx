import React, { useState } from "react";
import { updateProduct } from "@/network/network/admin/product";
import toast from "react-hot-toast";

interface EditItemModalProps {
  item: any;
  onClose: () => void;
  onSuccess: () => void;
}

const EditItemModal: React.FC<EditItemModalProps> = ({
  item,
  onClose,
  onSuccess,
}) => {
  const [name, setName] = useState(item.name);
  const [category, setCategory] = useState(item.category);
  const [quantity, setQuantity] = useState(item.quantity);
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      await updateProduct({
        id: item.id,
        name,
        category,
        quantity: parseInt(quantity, 10),
      });
      toast.success("Product updated successfully.");
      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error updating product:", error);
      toast.error("Failed to update product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg p-6 shadow-md w-96">
        <h2 className="text-2xl font-bold mb-4">Edit Item</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Item Name
            </label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Item Name"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Category
            </label>
            <select
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="food">Food</option>
              <option value="supply">Supply</option>
              <option value="health">Health</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              className="w-full p-2 border rounded"
              placeholder="Quantity"
              min="0"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
            onClick={onClose}
            disabled={loading}
          >
            Cancel
          </button>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded"
            onClick={handleSave}
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditItemModal;
