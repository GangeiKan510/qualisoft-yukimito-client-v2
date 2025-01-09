import React from 'react';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

interface UserTableProps {
  users: User[];
  handleEdit: (user: User) => void;
  handleDelete: (userId: number) => void;
}

const UserTable: React.FC<UserTableProps> = ({ users, handleEdit, handleDelete }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="bg-gray-50 text-left">
          <th className="p-4 font-semibold text-gray-600">User ID</th>
          <th className="p-4 font-semibold text-gray-600">Name</th>
          <th className="p-4 font-semibold text-gray-600">Email</th>
          <th className="p-4 font-semibold text-gray-600">Role</th>
          <th className="p-4 font-semibold text-gray-600">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map((user, index) => (
          <tr
            key={user.id}
            className={`border-t ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'} hover:bg-blue-50 transition`}
          >
            <td className="p-4">{user.id}</td>
            <td className="p-4">{user.name}</td>
            <td className="p-4">{user.email}</td>
            <td className="p-4">{user.role}</td>
            <td className="p-4 flex gap-2">
              <button
                className="text-blue-500 hover:underline"
                onClick={() => handleEdit(user)}
              >
                Edit
              </button>
              <button
                className="text-red-500 hover:underline"
                onClick={() => handleDelete(user.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserTable;