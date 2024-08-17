import { getWithFirebaseJwt } from "./firebase/requests-with-firebase";

export const getMe = async () => {
  try {
    return await getWithFirebaseJwt("/web/users/me")
      .then((res) => {
        return res;
      })
      .catch((err) => {
        console.error(err);
      });
  } catch (error) {
    throw "Failed to get user details:" + error;
  }
};
