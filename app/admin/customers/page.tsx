"use client";

import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import { getAllUsersWithDetails } from "@/network/network/admin/user";
import Spinner from "@/components/common/spinner";
import UsersTable from "@/components/tables/users-table";

function Page() {
  const [filteredUsers, setFilteredUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const {
    data: users = [],
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["all-users"],
    queryFn: getAllUsersWithDetails,
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

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col px-8 bg-gray-100">
      <Toaster />
      <header className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">All Customers</h1>
        <div className="flex items-center gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search customers..."
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button className="p-2 text-sm bg-green-500 text-white rounded hover:bg-green-600">
            Add Customer
          </button>
        </div>
      </header>

      <main className="w-full bg-white rounded-xl shadow-lg p-6">
        {filteredUsers.length ? (
          <UsersTable users={filteredUsers} />
        ) : (
          <div className="text-center text-gray-500">No users found.</div>
        )}
      </main>
    </div>
  );
}

export default Page;
