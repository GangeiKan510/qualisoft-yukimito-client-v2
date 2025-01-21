import React from "react";
import Spinner from "@/components/common/spinner";

interface BookingsTableProps {
  bookings: any[];
  onAction: (
    action: "accept" | "reject" | "delete" | "edit" | "checkIn",
    id: string,
  ) => void;
  actionLoading: string | null;
  onDeleteClick: (id: string) => void;
  onEditPriceClick: (booking: any) => void; // New prop for edit price
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onAction,
  actionLoading,
  onDeleteClick,
  onEditPriceClick, // Destructure the new prop
}) => {
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
              <td className="p-10">
                <div className="flex gap-4 items-center">
                  {booking.status === "pending" && (
                    <>
                      <button
                        onClick={() => onAction("accept", booking.id)}
                        disabled={actionLoading === booking.id}
                        className="text-green-600 hover:underline disabled:opacity-50"
                      >
                        {actionLoading === booking.id ? <Spinner /> : "Accept"}
                      </button>
                      <button
                        onClick={() => onAction("reject", booking.id)}
                        disabled={actionLoading === booking.id}
                        className="text-yellow-600 hover:underline disabled:opacity-50"
                      >
                        {actionLoading === booking.id ? <Spinner /> : "Reject"}
                      </button>
                    </>
                  )}
                  <button
                    onClick={() => onAction("edit", booking.id)}
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onEditPriceClick(booking)} // Handle edit price click
                    className="text-blue-600 hover:underline"
                  >
                    Edit Price
                  </button>
                  <button
                    onClick={() => onDeleteClick(booking.id)}
                    disabled={actionLoading === booking.id}
                    className="text-red hover:underline disabled:opacity-50"
                  >
                    {actionLoading === booking.id ? <Spinner /> : "Delete"}
                  </button>
                  {booking.status === "accepted" &&
                    !booking.pets_checked_in && (
                      <button
                        onClick={() => onAction("checkIn", booking.id)}
                        disabled={actionLoading === booking.id}
                        className="text-purple-600 hover:underline disabled:opacity-50"
                      >
                        {actionLoading === booking.id ? (
                          <Spinner />
                        ) : (
                          "Check In"
                        )}
                      </button>
                    )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
