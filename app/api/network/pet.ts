import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const addPet = async (petData: {
  userId: string;
  name: string;
  breed: string;
  birth_date: string;
  size: string;
  vaccine_photo: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("userId", petData.userId);
    formData.append("name", petData.name);
    formData.append("breed", petData.breed);
    formData.append("birth_date", petData.birth_date);
    formData.append("size", petData.size);

    if (petData.vaccine_photo) {
      formData.append("vaccine_photo", petData.vaccine_photo);
    }

    const response = await postWithFirebaseJwt("/web/pets/add-pet", {
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to add pet");
    }

    return response;
  } catch (error) {
    console.error("Error adding pet:", error);
    throw error;
  }
};
