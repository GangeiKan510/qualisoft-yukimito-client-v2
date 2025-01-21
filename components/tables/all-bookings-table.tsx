import React, { useState } from "react";
import Spinner from "@/components/common/spinner";

interface BookingsTableProps {
  bookings: any[];
  onAction: (
    action: "accept" | "reject" | "delete" | "edit" | "checkIn" | "editPrice",
    id: string,
  ) => void;
  actionLoading: string | null;
  onDeleteClick: (id: string) => void;
  onEditPriceClick: (booking: any) => void;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onAction,
  actionLoading,
}) => {
  const [selectedActions, setSelectedActions] = useState<{
    [key: string]: string;
  }>({});

  const getStatusStyles = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-600 bg-green-100";
      case "rejected":
        return "text-red bg-[#FFD2D2]";
      default:
        return "text-yellow-600 bg-yellow-100";
    }
  };

  const handleActionChange = (action: string, bookingId: string) => {
    if (action === "") return; // Do nothing if no action is selected
    onAction(action as any, bookingId);

    // Reset the selected action for the booking
    setSelectedActions((prev) => ({
      ...prev,
      [bookingId]: "",
    }));
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Booking ID</th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Owner Name
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Service
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Check-in
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Check-out
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Total Bill
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Checked In
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Status
            </th>
            <th className="text-center p-4 font-semibold text-gray-600">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking, index) => (
            <tr
              key={booking.id}
              className={`border-t ${
                index % 2 === 0 ? "bg-gray-50" : "bg-white"
              } hover:bg-blue-50 transition`}
            >
              <td className="p-4">{booking.id}</td>
              <td className="p-4">{booking.pet_owner_name}</td>
              <td className="p-4">{booking.service}</td>
              <td className="p-4">
                {new Date(booking.check_in_date).toLocaleDateString()}
              </td>
              <td className="p-4">
                {new Date(booking.check_out_date).toLocaleDateString()}
              </td>
              <td className="p-4">₱{booking.total_bill}</td>
              <td className="p-4 text-center">
                {booking.pets_checked_in ? (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-green-600 bg-green-100">
                    Yes
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 rounded-full text-sm font-medium text-red bg-[#FFD2D2]">
                    No
                  </span>
                )}
              </td>
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                    booking.status,
                  )}`}
                >
                  {booking.status || "Pending"}
                </span>
              </td>
              <td className="p-4 text-center">
                <select
                  className="px-3 py-2 border rounded-md focus:ring focus:outline-none"
                  value={selectedActions[booking.id] || ""}
                  onChange={(e) =>
                    handleActionChange(e.target.value, booking.id)
                  }
                  disabled={actionLoading === booking.id}
                >
                  <option value="" disabled>
                    Select Action
                  </option>
                  {booking.status === "pending" && (
                    <>
                      <option value="accept">Accept</option>
                      <option value="reject">Reject</option>
                    </>
                  )}
                  <option value="edit">Edit Schedule</option>
                  {booking.status === "accepted" && (
                    <>
                      <option value="editPrice">Edit Price</option>
                      {!booking.pets_checked_in && (
                        <option value="checkIn">Check In</option>
                      )}
                    </>
                  )}
                  <option value="delete">Delete</option>
                </select>
                {actionLoading === booking.id && null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
