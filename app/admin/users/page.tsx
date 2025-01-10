"use client";

import React, { useState, useEffect } from "react";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import {
  getUsersWithNonDefaultRole,
  modifyUserRole,
  deleteUserAccount,
} from "@/network/network/admin/user";
import AddAdminModal from "@/components/modals/add-admin-modal";
import DeleteAccountModal from "@/components/modals/delete-account-modal-confirmation";

function Page() {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [confirmationEmail, setConfirmationEmail] = useState("");
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

  const handleOpenDeleteModal = (user: any) => {
    setSelectedUser(user);
    setConfirmationEmail("");
    setIsDeleteModalOpen(true);
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;

    setLoading(true);
    try {
      await deleteUserAccount(selectedUser.id);
      toast.success(`User ${selectedUser.email} deleted successfully.`);
      refetch();
    } catch (error: any) {
      console.error("Error deleting user account:", error);
      toast.error("Failed to delete user account.");
    } finally {
      setLoading(false);
      setIsDeleteModalOpen(false);
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
    <div className="w-full flex flex-col px-8">
      <Toaster />

      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">
          User Management
        </h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search users..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
          >
            Add | Edit Admin
          </button>
        </div>
      </div>

      <div className="w-full bg-white rounded-xl shadow-md p-6">
        {filteredUsers.length ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
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

                <div className="flex justify-start">
                  <button
                    onClick={() => handleOpenDeleteModal(user)}
                    className="text-red rounded-md hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500">No users found.</div>
        )}
      </div>

      <AddAdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleAddAdmin}
        loading={loading}
      />

      <DeleteAccountModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDeleteUser}
        loading={loading}
        email={selectedUser?.email || ""}
        confirmationEmail={confirmationEmail}
        setConfirmationEmail={setConfirmationEmail}
      />
    </div>
  );
}

export default Page;
