import { BookingData } from "@/app/components/utils/types/types";
import {
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
