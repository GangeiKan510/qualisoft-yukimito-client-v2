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

export const deleteUser = async (userId: string) => {
  try {
    const response = await deleteWithFirebaseJwt(
      "/web/admin/user/delete-user",
      {
        params: { id: userId },
        headers: {
          "Content-Type": "application/json",
        },
      },
    );

    return response;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};
