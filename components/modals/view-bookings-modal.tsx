import React from "react";

interface ViewBookingsModalProps {
  user: any;
  onClose: () => void;
}

const ViewBookingsModal: React.FC<ViewBookingsModalProps> = ({
  user,
  onClose,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg w-4/5 p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-2 right-3 text-gray hover:text-[#8c8c8c]"
        >
          ✕
        </button>
        <div className="mt-3">
          <h2 className="text-lg font-semibold text-black mb-4">
            Booking Transactions for {user.name || "N/A"}
          </h2>

          {user.bookings.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-white rounded-xl shadow-lg overflow-hidden">
                <thead>
                  <tr className="bg-gray-50 text-left">
                    <th className="p-4 font-semibold text-gray-600">Service</th>
                    <th className="p-4 font-semibold text-gray-600">Status</th>
                    <th className="p-4 font-semibold text-gray-600">
                      Check-in
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Check-out
                    </th>
                    <th className="p-4 font-semibold text-gray-600">
                      Total Bill (₱)
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {user.bookings.map((booking: any, index: number) => (
                    <tr
                      key={booking.id}
                      className={`border-t ${
                        index % 2 === 0 ? "bg-gray-50" : "bg-white"
                      } hover:bg-blue-50 transition`}
                    >
                      <td className="p-4">{booking.service}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            booking.status === "accepted"
                              ? "bg-green-100 text-green-600"
                              : booking.status === "rejected"
                              ? "bg-[#ffd3d3] text-red"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {booking.status}
                        </span>
                      </td>
                      <td className="p-4">
                        {new Date(booking.check_in_date).toLocaleDateString()}
                      </td>
                      <td className="p-4">
                        {new Date(booking.check_out_date).toLocaleDateString()}
                      </td>
                      <td className="p-4">₱{booking.total_bill}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-sm text-gray-500 mt-4">No bookings found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewBookingsModal;
