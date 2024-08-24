import { CreateUserData } from "@/app/components/utils/types/create-user-type";
import {
  getWithFirebaseJwt,
  postWithFirebaseJwt,
} from "../firebase/requests-with-firebase";
import { UpdateUserData } from "@/app/components/utils/types/update-user-type";

export const getMe = async (email: string) => {
  try {

    const response = await postWithFirebaseJwt("/web/users/get-me", {
      body: { email: email },
    });

    if (!response) {
      throw new Error("Failed to get user details");
    }

    return response;
  } catch (error) {
    console.error("Failed to get user details:", error);
    throw error;
  }
};

export const createUser = async (userData: CreateUserData) => {
  try {
    const response = await postWithFirebaseJwt("/web/users/create-user", {
      body: userData,
    });

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

export const updateUserByEmail = async (userData: UpdateUserData) => {
  try {
    const response = await postWithFirebaseJwt("/web/users/update-user", {
      body: userData,
    });

    if (!response.ok) {
      throw new Error("Failed to update user details");
    }

    const updatedUser = await response.json();
    return updatedUser;
  } catch (error) {
    console.error("Failed to update user details:", error);
    throw error;
  }
};
