"use client";

import React, { useState, useEffect } from "react";
import {
  acceptBooking,
  rejectBooking,
  deleteBooking,
  getAllBookings,
  updateBookingDates,
  checkInPets,
  addAdditionalService,
  removeAdditionalService,
} from "@/network/network/admin/booking";
import Spinner from "@/components/common/spinner";
import toast, { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import BookingsTable from "@/components/tables/all-bookings-table";
import DeleteBookingConfirmationModal from "@/components/modals/delete-booking-confirmation-modal";
import EditBookingModal from "@/components/modals/edit-booking-modal";
import EditPriceModal from "@/components/modals/edit-price-modal";
import AddServiceModal from "@/components/modals/add-service-modal";
import RemoveServiceModal from "@/components/modals/remove-service-modal";

function Page() {
  const [filteredBookings, setFilteredBookings] = useState<any[]>([]);
  const [actionLoading, setActionLoading] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string>("");
  const [confirmationInput, setConfirmationInput] = useState<string>("");

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<any | null>(null);
  const [isEditPriceModalOpen, setIsEditPriceModalOpen] = useState(false);
  const [isAddServiceModalOpen, setIsAddServiceModalOpen] = useState(false);
  const [isRemoveServiceModalOpen, setIsRemoveServiceModalOpen] =
    useState(false);

  const handleEditPriceClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsEditPriceModalOpen(true);
  };

  const handleSaveNewPrice = (bookingId: string, newPrice: number) => {
    toast.success(`Updated price for booking ${bookingId} to ₱${newPrice}`);
    setIsEditPriceModalOpen(false);
  };

  const handleAddServiceClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsAddServiceModalOpen(true);
  };

  const handleAddService = async (service: string) => {
    setActionLoading(selectedBookingId);

    try {
      await addAdditionalService(selectedBookingId, service);
      toast.success(`Added ${service} to booking ${selectedBookingId}`);
      setIsAddServiceModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to add additional service:", error);
      toast.error("Failed to add additional service. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleRemoveServiceClick = (booking: any) => {
    setSelectedBooking(booking);
    setIsRemoveServiceModalOpen(true);
  };

  const handleRemoveService = async (serviceId: string) => {
    if (!selectedBooking) return;
    setActionLoading(serviceId);

    try {
      await removeAdditionalService(selectedBooking.id, serviceId);
      toast.success("Service removed successfully.");
      setIsRemoveServiceModalOpen(false);
      refetch();
    } catch (error) {
      console.error("Failed to remove additional service:", error);
      toast.error("Failed to remove service. Please try again.");
    } finally {
      setActionLoading(null);
    }
  };

  const {
    data: bookings = { regularBookings: [], instantBookings: [] },
    isLoading,
    isError,
    isSuccess,
    refetch,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: getAllBookings,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (isSuccess) {
      const allBookings = [
        ...bookings.regularBookings,
        ...bookings.instantBookings,
      ];
      setFilteredBookings(allBookings);
      toast.success("Bookings fetched successfully.");
    }
  }, [bookings, isSuccess]);

  useEffect(() => {
    if (isError) {
      toast.error("Failed to fetch bookings.");
    }
  }, [isError]);

  const handleAction = async (
    action:
      | "accept"
      | "reject"
      | "delete"
      | "edit"
      | "checkIn"
      | "editPrice"
      | "addService"
      | "removeService",
    bookingId: string,
  ) => {
    if (action === "edit") {
      const booking = filteredBookings.find((b) => b.id === bookingId);
      setSelectedBooking(booking);
      setIsEditModalOpen(true);
      return;
    }

    if (action === "editPrice") {
      const booking = filteredBookings.find((b) => b.id === bookingId);
      setSelectedBooking(booking);
      setIsEditPriceModalOpen(true);
      return;
    }

    if (action === "addService") {
      handleAddServiceClick(bookingId);
      return;
    }

    setActionLoading(bookingId);
    try {
      if (action === "accept") {
        await acceptBooking(bookingId);
        toast.success("Booking accepted successfully.");
      } else if (action === "reject") {
        await rejectBooking(bookingId);
        toast.success("Booking rejected successfully.");
      } else if (action === "delete") {
        await deleteBooking(bookingId);
        toast.success("Booking deleted successfully.");
      } else if (action === "checkIn") {
        await checkInPets(bookingId);
        toast.success("Pets checked in successfully.");
      }

      refetch();
    } catch (error) {
      console.error(`Failed to ${action} booking:`, error);
      toast.error(`Failed to ${action} booking.`);
    } finally {
      setActionLoading(null);
    }
  };

  const handleSaveEdit = async (checkInDate: string, checkOutDate?: string) => {
    setActionLoading(selectedBooking.id);

    try {
      await updateBookingDates(selectedBooking.id, {
        checkInDate,
        checkOutDate,
      });
      toast.success("Booking updated successfully.");
      setIsEditModalOpen(false);
      refetch();
    } catch (error: any) {
      console.error("Failed to update booking:", error);
      toast.error(error.message || "Failed to update booking.");
    } finally {
      setActionLoading(null);
    }
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value.toLowerCase();
    setSearchTerm(term);

    setFilteredBookings(
      bookings.regularBookings
        .concat(bookings.instantBookings)
        .filter((booking: any) =>
          JSON.stringify(booking).toLowerCase().includes(term),
        ),
    );
  };

  const handleDeleteClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setConfirmationInput("");
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    setActionLoading(selectedBookingId);
    try {
      await deleteBooking(selectedBookingId);
      toast.success("Booking deleted successfully.");
      setFilteredBookings((prev) =>
        prev.filter((booking) => booking.id !== selectedBookingId),
      );
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete booking:", error);
      toast.error("Failed to delete booking.");
    } finally {
      setActionLoading(null);
      refetch();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner type="primary" />
      </div>
    );
  }

  function handleSave(updatedBooking: any): void {
    throw new Error("Function not implemented.");
  }

  console.log(filteredBookings);

  return (
    <div className="w-full flex flex-col px-8">
      <Toaster />
      <div className="w-full flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-primary-dark">All Bookings</h1>
        <div className="flex items-center space-x-4">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearch}
            placeholder="Search bookings..."
            className="px-4 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          />
        </div>
      </div>
      <div className="w-full bg-white rounded-xl shadow-md p-6">
        {filteredBookings.length ? (
          <BookingsTable
            bookings={filteredBookings}
            onAction={(action, bookingId) => {
              if (action === "removeService") {
                const booking = filteredBookings.find(
                  (b) => b.id === bookingId,
                );
                handleRemoveServiceClick(booking);
              } else {
                handleAction(action, bookingId);
              }
            }}
            actionLoading={actionLoading}
            onDeleteClick={handleDeleteClick}
            onEditPriceClick={handleEditPriceClick}
          />
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}
      </div>

      <DeleteBookingConfirmationModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        loading={!!actionLoading}
        bookingId={selectedBookingId}
        confirmationInput={confirmationInput}
        setConfirmationInput={setConfirmationInput}
      />

      {selectedBooking && (
        <EditBookingModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onSave={handleSaveEdit}
          booking={selectedBooking}
          loading={!!actionLoading}
        />
      )}
      {selectedBooking && (
        <EditPriceModal
          isOpen={isEditPriceModalOpen}
          onClose={() => setIsEditPriceModalOpen(false)}
          bookingId={selectedBooking.id}
          currentPrice={selectedBooking.total_bill}
          onSave={handleSaveNewPrice}
        />
      )}

      <AddServiceModal
        isOpen={isAddServiceModalOpen}
        onClose={() => setIsAddServiceModalOpen(false)}
        onAdd={handleAddService}
        loading={!!actionLoading}
      />
      <RemoveServiceModal
        isOpen={isRemoveServiceModalOpen}
        onClose={() => setIsRemoveServiceModalOpen(false)}
        additionalServices={selectedBooking?.additionalServices || []}
        onRemove={handleRemoveService}
        loading={!!actionLoading}
      />
    </div>
  );
}

export default Page;
