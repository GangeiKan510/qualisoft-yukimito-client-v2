"use client";

import React, { useState, useEffect } from "react";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  getUsersWithNonDefaultRole,
  modifyUserRole,
} from "@/network/network/admin/user";
import AddAdminModal from "@/components/modals/add-admin-modal";

function Page() {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    data: users = [],
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["non-default-role-users"],
    queryFn: getUsersWithNonDefaultRole,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      setFilteredUsers(users);
      toast.success("Users fetched successfully.");
    }
  }, [users, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch users.");
    }
  }, [isError]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    const filtered = users.filter((user: any) =>
      JSON.stringify(user).toLowerCase().includes(term),
    );
    setFilteredUsers(filtered);
  };

  const handleAddAdmin = async (adminData: { email: string; role: number }) => {
    setLoading(true);
    try {
      await modifyUserRole(adminData.email, adminData.role as number);
      toast.success(`Role updated for ${adminData.email}`);
      refetch();
    } catch (error: any) {
      console.error("Error modifying user role:", error);
      toast.error("Failed to modify user role.");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8 py-6">
      <Toaster />

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary-dark">
          User Management
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users by name, email, or phone..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add Admin Account
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredUsers.length ? (
          filteredUsers.map((user) => (
            <div
              key={user.id}
              className="p-6 bg-white rounded-lg shadow-md border hover:shadow-lg transition"
            >
              <div className="mb-4 flex items-center gap-4">
                <div className="w-12 h-12 flex items-center justify-center bg-primary-dark text-white rounded-full text-xl font-semibold">
                  {user.name ? user.name.charAt(0).toUpperCase() : "N"}
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {user.name || "No Name Provided"}
                  </h2>
                  <p className="text-sm text-gray-500">{user.email}</p>
                </div>
              </div>

              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  <strong>Phone:</strong> {user.phone || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Address:</strong> {user.address || "N/A"}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Role:</strong> {user.role}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Created At:</strong>{" "}
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() =>
                    toast(`Delete user feature for ${user.email} coming soon!`)
                  }
                  className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50"
                >
                  Delete User
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500 col-span-full">
            No users found.
          </div>
        )}
      </div>

      <AddAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddAdmin}
        loading={loading}
      />
    </div>
  );
}

export default Page;
