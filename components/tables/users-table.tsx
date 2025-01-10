import React, { useState } from "react";
import ViewBookingsModal from "@/components/modals/view-bookings-modal";

interface UsersTableProps {
  users: any[];
}

const UsersTable: React.FC<UsersTableProps> = ({ users }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  const handleViewBookings = (user: any) => {
    setSelectedUser(user);
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
                  <button className="text-red hover:underline">Delete</button>
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
    </div>
  );
};

export default UsersTable;
