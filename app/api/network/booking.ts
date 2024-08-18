import { getWithFirebaseJwt } from "../firebase/requests-with-firebase";

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
