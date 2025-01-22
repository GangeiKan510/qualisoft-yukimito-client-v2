import { BookingData, RegularBookingData } from "@/utils/types/types";
import {
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
  postWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

export const getBookingAvailability = async () => {
  try {
    const response = await getWithFirebaseJwt("/web/booking/availability");

    if (!response) {
      throw new Error("Failed to get user details");
    }

    return response;
  } catch (error) {
    console.error("Failed to get user details:", error);
    throw error;
  }
};

export const createInstantBooking = async (bookingData: BookingData) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/booking/create-instant-booking",
      {
        body: bookingData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      throw new Error("Failed to create booking");
    }

    return response;
  } catch (error) {
    console.error("Failed to create booking:", error);
    throw error;
  }
};

export const createBooking = async (bookingData: RegularBookingData) => {
  try {
    const response = await postWithFirebaseJwt("/web/booking/create-booking", {
      body: bookingData,
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response) {
      throw new Error("Failed to create booking");
    }

    return response;
  } catch (error) {
    console.error("Failed to create booking:", error);
    throw error;
  }
};

export const updateBookingDates = async (
  bookingId: string,
  {
    checkInDate,
    checkOutDate,
  }: { checkInDate?: string; checkOutDate?: string },
) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/booking/update-booking-date",
      {
        body: {
          bookingId,
          check_in_date: checkInDate,
          check_out_date: checkOutDate,
        },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response) {
      throw new Error("Failed to update booking dates");
    }

    return response;
  } catch (error) {
    console.error("Failed to update booking dates:", error);
    throw error;
  }
};

export const deleteBooking = async (bookingId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/booking/delete-booking",
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

    return response;
  } catch (error) {
    console.error("Error deleting booking:", error);
    throw error;
  }
};
