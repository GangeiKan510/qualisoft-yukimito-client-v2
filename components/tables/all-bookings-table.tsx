import React from "react";
import Spinner from "@/components/common/spinner";

interface BookingsTableProps {
  bookings: any[];
  onAction: (action: "accept" | "reject" | "delete", id: string) => void;
  actionLoading: string | null;
}

const BookingsTable: React.FC<BookingsTableProps> = ({
  bookings,
  onAction,
  actionLoading,
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
      <table className="w-full border-collapse bg-white rounded-xl border shadow-lg overflow-hidden">
        <thead>
          <tr className="bg-gray-50 text-left">
            <th className="p-4 font-semibold text-gray-600">Booking ID</th>
            <th className="p-4 font-semibold text-gray-600">Owner Name</th>
            <th className="p-4 font-semibold text-gray-600">Service</th>
            <th className="p-4 font-semibold text-gray-600">Check-in</th>
            <th className="p-4 font-semibold text-gray-600">Check-out</th>
            <th className="p-4 font-semibold text-gray-600">Total Bill</th>
            <th className="p-4 font-semibold text-gray-600">Status</th>
            <th className="p-4 font-semibold text-gray-600">Actions</th>
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
              <td className="p-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getStatusStyles(
                    booking.status,
                  )}`}
                >
                  {booking.status || "Pending"}
                </span>
              </td>
              <td className="p-4 flex gap-4">
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
                  onClick={() => onAction("delete", booking.id)}
                  disabled={actionLoading === booking.id}
                  className="flex items-center text-red hover:underline disabled:opacity-50"
                >
                  {actionLoading === booking.id ? <Spinner /> : "Delete"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BookingsTable;
