import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
} from "@/network/firebase/requests-with-firebase";

export const createVaccine = async (vaccineData: {
  name: string;
  manufacturer: string;
  batch_number: string;
  expiry_date: string;
  date_administered: string;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/vaccine/create-vaccine",
      {
        body: vaccineData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error creating vaccine:", error);
    throw error;
  }
};

export const updateVaccine = async (vaccineData: {
  id: string;
  name?: string;
  manufacturer?: string;
  batch_number?: string;
  expiry_date?: string;
  date_administered?: string;
}) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/vaccine/update-vaccine",
      {
        body: vaccineData,
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to update vaccine");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating vaccine:", error);
    throw error;
  }
};

export const getAllVaccines = async () => {
  try {
    const response = await getWithFirebaseJwt(
      "/web/admin/vaccine/all-vaccines",
    );

    return response;
  } catch (error) {
    console.error("Error fetching vaccines:", error);
    throw error;
  }
};

export const deleteVaccine = async (vaccineId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/admin/vaccine/delete-vaccine",
      {
        params: { id: vaccineId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      throw new Error("Failed to delete vaccine");
    }

    return response;
  } catch (error) {
    console.error("Error deleting vaccine:", error);
    throw error;
  }
};
