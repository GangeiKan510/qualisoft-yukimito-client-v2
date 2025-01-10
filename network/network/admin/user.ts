import {
  postWithFirebaseJwt,
  deleteWithFirebaseJwt,
  getWithFirebaseJwt,
} from "@/network/firebase/requests-with-firebase";

export const getUsersWithNonDefaultRole = async () => {
  try {
    const response = await getWithFirebaseJwt(
      "/web/admin/user/non-default-role-users",
    );

    return response;
  } catch (error) {
    console.error("Error fetching users with non-default role:", error);
    throw error;
  }
};

export const modifyUserRole = async (email: string, newRole: number) => {
  try {
    const response = await postWithFirebaseJwt(
      "/web/admin/user/modify-user-role",
      {
        body: { email, newRole },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error modifying user role:", error);
    throw error;
  }
};

export const getAllUsersWithDetails = async () => {
  try {
    const response = await getWithFirebaseJwt(
      "/web/admin/user/get-all-users-with-details",
    );
    return response;
  } catch (error) {
    console.error("Error fetching all users with details:", error);
    throw error;
  }
};

export const deleteUserAccount = async (userId: string) => {
  try {
    const response = await deleteWithFirebaseJwt("/web/users/delete-user", {
      params: { userId },
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error) {
    console.error("Failed to delete user account:", error);
    throw error;
  }
};
