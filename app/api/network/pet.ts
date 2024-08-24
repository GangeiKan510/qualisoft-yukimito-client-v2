import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const getUserPets = async (userId: string) => {
  try {
    const response = await postWithFirebaseJwt("/web/pets/my-pets", {
      body: { userId: userId },
    });

    if (!response) {
      throw new Error("Failed to fetch user's pets");
    }

    const pets = await response;
    return pets;
  } catch (error) {
    console.error("Failed to fetch user's pets:", error);
    throw error;
  }
};
