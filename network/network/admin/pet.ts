import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
} from "@/network/firebase/requests-with-firebase";

export const getAllPets = async () => {
  try {
    const response = await getWithFirebaseJwt("/web/admin/pet/all-pets");
    return response;
  } catch (error) {
    console.error("Error fetching pets:", error);
    throw error;
  }
};

export const updatePetDetails = async (
  petId: string,
  updateData: Partial<{
    name: string;
    breed: string;
    birth_date: string;
    size: string;
    vaccine_photo: string;
  }>,
) => {
  try {
    const response = await postWithFirebaseJwt("/web/admin/pet/update-pet", {
      body: { id: petId, ...updateData },
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  } catch (error) {
    console.error("Error updating pet:", error);
    throw error;
  }
};

export const markPetAsVaccinated = async (petId: string) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/pet/mark-vaccinated",
      {
        body: { id: petId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
    return response;
  } catch (error) {
    console.error("Error marking pet as vaccinated:", error);
    throw error;
  }
};

export const deletePet = async (petId: string) => {
  try {
    const response = await deleteWithFirebaseJwt("/web/admin/pet/delete-pet", {
      params: { id: petId },
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
