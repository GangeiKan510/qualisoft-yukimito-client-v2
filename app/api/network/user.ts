import { CreateUserData } from "@/app/components/utils/types/create-user-type";
import { postWithFirebaseJwt } from "../firebase/requests-with-firebase";

export const createUser = async (userData: CreateUserData) => {
  try {
    const response = await postWithFirebaseJwt("/web/users/create-user", {
      body: userData,
    });

    console.log(response);

    if (!response) {
      throw new Error(`Error creating user: ${response.statusText}`);
    }

    const newUser = await response.json();
    return newUser;
  } catch (error) {
    console.error("Failed to create user", error);
    throw error;
  }
};
