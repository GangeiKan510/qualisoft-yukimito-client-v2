import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
} from "../firebase/requests-with-firebase";

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

export const updatePet = async (petData: {
  petId: string;
  name?: string;
  breed?: string;
  birth_date?: string;
  size?: string;
  vaccine_photo?: File | null;
}) => {
  try {
    const formData = new FormData();
    formData.append("petId", petData.petId);

    if (petData.name) formData.append("name", petData.name);
    if (petData.breed) formData.append("breed", petData.breed);
    if (petData.birth_date) formData.append("birth_date", petData.birth_date);
    if (petData.size) formData.append("size", petData.size);
    if (petData.vaccine_photo) {
      formData.append("vaccine_photo", petData.vaccine_photo);
    }

    const response = await postWithFirebaseJwt("/web/pets/update-pet", {
      body: formData,
    });

    if (!response.ok) {
      throw new Error("Failed to update pet");
    }

    return response;
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
};

export const deletePet = async (petId: string) => {
  try {
    const response = await deleteWithFirebaseJwt("/web/pets/delete-pet", {
      params: { petId },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Error deleting pet:", error);
    throw error;
  }
};
