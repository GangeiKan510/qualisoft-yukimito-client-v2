import React, { useState } from "react";

const BookingHistoryTable = ({ bookings }: any) => {
  const [expandedRows, setExpandedRows] = useState(new Set());

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

  return (
    <div className="w-full text-primary-dark">
      {/* Table Header */}
      <div className="flex justify-between font-semibold text-primary-dark bg-gray-100 p-4 rounded-t-lg border-b border-gray-200">
        <div className="w-1/6">ID</div>
        <div className="w-1/6">Service</div>
        <div className="w-1/6">Check-In</div>
        <div className="w-1/6">Check-Out</div>
        <div className="w-1/6">Pets</div>
        <div className="w-1/6">Status</div>
        <div className="w-1/6">Total</div>
      </div>

      {/* Table Rows */}
      {bookings.map((booking: any, index: number) => {
        const checkIn = formatDateTime(booking.check_in_date);
        const checkOut = formatDateTime(booking.check_out_date);

        return (
          <div
            key={booking.id}
            className={`py-10 flex justify-between text-gray-700 p-4 ${
              index === bookings.length - 1 ? "" : "border-b"
            } border-gray-200`}
          >
            {/* ID Column with Ellipsis */}
            <div className="w-1/6 relative px-1">
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

            {/* Service Column with Ellipsis */}
            <div className="w-1/6 relative px-1">
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

            {/* Check-In Date and Time */}
            <div className="w-1/6 px-1">
              <div>{checkIn.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkIn.time}</div>
              )}
            </div>

            {/* Check-Out Date and Time */}
            <div className="w-1/6 px-1">
              <div>{checkOut.date}</div>
              {booking.service !== "Home Care" && (
                <div className="text-sm text-gray-500">{checkOut.time}</div>
              )}
            </div>

            <div className="w-1/6 px-1">
              <div className="flex flex-wrap gap-1 overflow-hidden max-h-16">
                {booking.raw_pet_data.map((pet: any, petIndex: number) => (
                  <div
                    key={petIndex}
                    className="px-2 border bg-primary text-white border-primary rounded-full"
                  >
                    {pet.name}
                  </div>
                ))}
              </div>
            </div>

            <div className="w-1/6 px-1 text-secondary">
              <div className="inline-block px-3 border rounded-full border-secondary text-secondary">
                {booking.status || "pending"}
              </div>
            </div>

            <div className="w-1/6 px-1 font-bold">₱{booking.total_bill}</div>
          </div>
        );
      })}
    </div>
  );
};

export default BookingHistoryTable;
