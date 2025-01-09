"use client"

import React, { useState } from 'react';
import UserTable from './users-table';

const AdminUserManagement: React.FC = () => {
  const [users, setUsers] = useState([
    { id: 1, name: 'Admin User', email: 'admin@example.com', role: 'Admin'},
    { id: 2, name: 'John Doe', email: 'john.doe@example.com', role: 'User'},
    { id: 3, name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Moderator'}
  ]);

  const handleEdit = (user: any) => {
    console.log('Edit user:', user);
  };

  const handleDelete = (userId: number) => {
    setUsers(users.filter((user) => user.id !== userId));
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">User Management</h1>
      <div className="flex justify-end mb-4">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md px-6 py-3 shadow-sm transition">
          + Add User
        </button>
      </div>
      <div className="bg-white rounded-xl shadow-md p-6">
        <div className="overflow-x-auto">
          <UserTable users={users} handleEdit={handleEdit} handleDelete={handleDelete} />
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
