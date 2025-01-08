import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
} from "@/network/firebase/requests-with-firebase";

export const getAllBookings = async () => {
  try {
    const response = await getWithFirebaseJwt("/web/admin/booking/bookings");

    if (!response.ok) {
      throw new Error("Failed to fetch bookings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error);
    throw error;
  }
};

export const acceptBooking = async (bookingId: string) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/booking/accept-booking",
      {
        body: { bookingId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to accept booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error accepting booking:", error);
    throw error;
  }
};

export const rejectBooking = async (bookingId: string) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/booking/reject-booking",
      {
        body: { bookingId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to reject booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error rejecting booking:", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/admin/booking/delete-booking",
      {
        params: { bookingId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete booking");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
