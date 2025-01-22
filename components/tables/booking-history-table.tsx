import React, { useState } from "react";
import CancelConfirmationModal from "../modals/cancel-booking-confirmation";
import { deleteBooking } from "@/network/network/booking";
import Spinner from "../common/spinner";
import { toast } from "react-hot-toast";
import { useUser } from "../config/user-context";

const BookingHistoryTable = ({ bookings, onEditClick }: any) => {
  const { refetchMe } = useUser();
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBookingId, setSelectedBookingId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(false);

  const toggleExpandRow = (rowId: string) => {
    setExpandedRows((prevExpandedRows) => {
      const newExpandedRows = new Set(prevExpandedRows);
      if (newExpandedRows.has(rowId)) {
        newExpandedRows.delete(rowId);
      } else {
        newExpandedRows.add(rowId);
      }
      return newExpandedRows;
    });
  };

  const formatDateTime = (dateString: string) => {
    const date = new Date(dateString);
    return {
      date: date.toLocaleDateString(),
      time: date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };
  };

  const handleCancelClick = (bookingId: string) => {
    setSelectedBookingId(bookingId);
    setIsModalOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedBookingId) return;

    setLoading(true);
    try {
      await deleteBooking(selectedBookingId);
      toast.error("Failed to cancel booking");
    } catch (error) {
      console.error("Failed to cancel booking:", error);
      toast.success("Booking successfully canceled");
    } finally {
      setLoading(false);
      setIsModalOpen(false);
      setSelectedBookingId(null);
      refetchMe();
    }
  };

  return (
    <div className="w-full text-primary-dark">
      {/* Cancel Confirmation Modal */}
      <CancelConfirmationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleConfirmCancel}
        loading={loading}
      />

      {/* Table Header */}
      <div className="hidden md:grid grid-cols-9 font-semibold bg-[#D2EAE7] text-primary-dark p-4 border-y border-gray-200">
        <div className="col-span-1 text-center">ID</div>
        <div className="col-span-1 text-center">Service</div>
        <div className="col-span-1 text-center">Check-In</div>
        <div className="col-span-1 text-center">Check-Out</div>
        <div className="col-span-2 text-center">Pets</div>
        <div className="col-span-1 text-center">Status</div>
        <div className="col-span-1 text-center">Total</div>
        <div className="col-span-1 text-center">Actions</div>
      </div>

      {/* Table Rows */}
      {bookings.map((booking: any, index: number) => {
        const checkIn = formatDateTime(booking.check_in_date);
        const checkOut = formatDateTime(booking.check_out_date);

        return (
          <div
            key={booking.id}
            className={`md:grid grid-cols-9 items-center text-gray-700 p-4 ${
              index === bookings.length - 1 ? "" : "border-b"
            } border-gray-200`}
          >
            <div className="col-span-1 text-center truncate">
              <span
                className="cursor-pointer"
                onClick={() => toggleExpandRow(booking.id)}
              >
                {expandedRows.has(booking.id)
                  ? booking.id
                  : `${booking.id.slice(0, 10)}...`}
              </span>
            </div>
            <div className="col-span-1 text-center">{booking.service}</div>
            <div className="col-span-1 text-center">
              <div>{checkIn.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkIn.time}</div>
              )}
            </div>
            <div className="col-span-1 text-center">
              <div>{checkOut.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkOut.time}</div>
              )}
            </div>
            <div className="col-span-2 flex flex-wrap gap-1 justify-center">
              {booking.raw_pet_data.map((pet: any, petIndex: number) => (
                <div
                  key={petIndex}
                  className="px-2 py-1 border bg-primary text-white border-primary rounded-full text-sm"
                >
                  {pet.name}
                </div>
              ))}
            </div>
            <div className="col-span-1 text-center">
              <div
                className={`inline-block px-3 py-1 border rounded-full text-sm font-medium ${
                  booking.status === "accepted"
                    ? "bg-green-100 text-green-600 border-green-400"
                    : booking.status === "rejected"
                    ? "bg-[#ffd2d2] text-red border-red-400"
                    : "bg-yellow-100 text-yellow-600 border-yellow-400"
                }`}
              >
                {booking.status || "pending"}
              </div>
            </div>
            <div className="col-span-1 text-center font-bold">
              ₱{booking.total_bill}
            </div>
            <div className="col-span-1 flex justify-center gap-2">
              {booking.status !== "accepted" &&
                booking.status !== "rejected" && (
                  <button
                    onClick={() => onEditClick(booking)}
                    className="border px-3 py-1 bg-blue-500 text-white rounded-full"
                    disabled={loading}
                  >
                    Edit
                  </button>
                )}
              <button
                onClick={() => handleCancelClick(booking.id)}
                className="border px-3 py-1 bg-red-500 text-red rounded-full"
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingHistoryTable;
