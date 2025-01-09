import React, { useState } from "react";
import CancelConfirmationModal from "../modals/cancel-booking-confirmation";
import { deleteBooking } from "@/network/network/booking";
import Spinner from "../common/spinner";
import { toast } from "react-hot-toast";
import { useUser } from "../config/user-context";

const BookingHistoryTable = ({ bookings }: any) => {
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

      {/* Table Header for larger screens */}
      <div className="hidden md:flex font-semibold bg-[#D2EAE7] text-primary-dark p-4 border-y border-gray-200">
        <div className="flex-1 px-1">ID</div>
        <div className="flex-1 px-1">Service</div>
        <div className="flex-1 px-1">Check-In</div>
        <div className="flex-1 px-1">Check-Out</div>
        <div className="flex-1 px-1">Pets</div>
        <div className="flex-1 px-1">Status</div>
        <div className="flex-1 px-1">Total</div>
        <div className="flex-1 px-1"></div>
      </div>

      {/* Table Rows */}
      {bookings.map((booking: any, index: number) => {
        const checkIn = formatDateTime(booking.check_in_date);
        const checkOut = formatDateTime(booking.check_out_date);

        return (
          <div
            key={booking.id}
            className={`md:flex items-center text-gray-700 p-4 ${
              index === bookings.length - 1 ? "" : "border-b"
            } border-gray-200`}
          >
            {/* Desktop View as Table Layout */}
            <div className="hidden md:flex flex-1 px-1">
              <span
                className={`cursor-pointer ${
                  expandedRows.has(booking.id)
                    ? "whitespace-normal"
                    : "truncate"
                }`}
                onClick={() => toggleExpandRow(booking.id)}
                style={{
                  display: expandedRows.has(booking.id)
                    ? "block"
                    : "-webkit-box",
                  WebkitLineClamp: expandedRows.has(booking.id) ? "none" : 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {expandedRows.has(booking.id)
                  ? booking.id
                  : `${booking.id.slice(0, 10)}...`}
              </span>
            </div>
            <div className="hidden md:flex flex-1 px-1">
              <span
                className={`cursor-pointer ${
                  expandedRows.has(booking.id)
                    ? "whitespace-normal"
                    : "truncate"
                }`}
                onClick={() => toggleExpandRow(booking.id)}
                style={{
                  display: expandedRows.has(booking.id)
                    ? "block"
                    : "-webkit-box",
                  WebkitLineClamp: expandedRows.has(booking.id) ? "none" : 1,
                  WebkitBoxOrient: "vertical",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {expandedRows.has(booking.id)
                  ? booking.service
                  : `${booking.service.slice(0, 10)}...`}
              </span>
            </div>
            <div className="hidden md:flex flex-1 px-1 flex-col">
              <div>{checkIn.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkIn.time}</div>
              )}
            </div>
            <div className="hidden md:flex flex-1 px-1 flex-col">
              <div>{checkOut.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkOut.time}</div>
              )}
            </div>
            <div className="hidden md:flex flex-1 px-1">
              <div className="flex flex-wrap gap-1 max-h-16 overflow-hidden">
                {booking.raw_pet_data.map((pet: any, petIndex: number) => (
                  <div
                    key={petIndex}
                    className="px-2 py-1 border bg-primary text-white border-primary rounded-full text-sm"
                  >
                    {pet.name}
                  </div>
                ))}
              </div>
            </div>
            <div className="hidden md:flex flex-1 px-1">
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
            <div className="hidden md:flex flex-1 px-1 font-bold">
              ₱{booking.total_bill}
            </div>
            <div className="hidden md:flex flex-1 px-1 justify-center">
              <button
                onClick={() => handleCancelClick(booking.id)}
                className="border px-3 py-1 bg-red-500 text-red rounded-full"
                disabled={loading}
              >
                {loading && selectedBookingId === booking.id ? (
                  <Spinner type="primary" />
                ) : (
                  "Cancel"
                )}
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingHistoryTable;
