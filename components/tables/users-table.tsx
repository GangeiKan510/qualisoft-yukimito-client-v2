import React, { useState } from "react";
import ViewBookingsModal from "@/components/modals/view-bookings-modal";
import DeleteAccountModal from "@/components/modals/delete-account-modal-confirmation";
import { deleteUserAccount } from "@/network/network/admin/user";
import toast from "react-hot-toast";

interface UsersTableProps {
  users: any[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [confirmationEmail, setConfirmationEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any | null>(null);

  const handleViewBookings = (user: any) => {
    setSelectedUser(user);
  };

  const handleDeleteClick = (user: any) => {
    setUserToDelete(user);
    setIsDeleteModalOpen(true);
    setConfirmationEmail("");
  };

  const handleDeleteConfirm = async () => {
    if (!userToDelete) return;

    setLoading(true);
    try {
      await deleteUserAccount(userToDelete.id);
      toast.success(`User ${userToDelete.email} deleted successfully.`);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete user account:", error);
      toast.error("Failed to delete user account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Name</th>
            <th className="p-4 font-semibold text-gray-600">Email</th>
            <th className="p-4 font-semibold text-gray-600">Phone</th>
            <th className="p-4 font-semibold text-gray-600">Address</th>
            <th className="p-4 font-semibold text-gray-600">Bookings</th>
            <th className="p-4 font-semibold text-gray-600">Pets</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={user.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <td className="p-4">{user.name || "N/A"}</td>
              <td className="p-4">{user.email}</td>
              <td className="p-4">{user.phone || "N/A"}</td>
              <td className="p-4">{user.address || "N/A"}</td>
              <td className="p-4">
                <button
                  onClick={() => handleViewBookings(user)}
                  className="text-blue-600 hover:underline"
                >
                  {user.bookings.length} Booking
                  {user.bookings.length !== 1 && "s"}
                </button>
              </td>
              <td className="p-4">
                {user.pets.length} Pet{user.pets.length !== 1 && "s"}
              </td>
              <td className="p-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleDeleteClick(user)}
                    className="text-red hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selectedUser && (
        <ViewBookingsModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
        />
      )}

      {userToDelete && (
        <DeleteAccountModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDeleteConfirm}
          loading={loading}
          email={userToDelete.email}
          confirmationEmail={confirmationEmail}
          setConfirmationEmail={setConfirmationEmail}
        />
      )}
    </div>
  );
};

export default UsersTable;
