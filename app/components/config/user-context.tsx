"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { auth } from "../helpers/config";
import { UserDetails } from "../utils/types/user";
import { getMe } from "@/app/api/user";
import { useConfig } from "./app-context";

const UserContext = createContext<{
  user: UserDetails | null;
  updateUser: (userData: UserDetails | null) => void;
  refetchMe: () => void;
}>({
  user: null,
  updateUser: () => {},
  refetchMe: () => {},
});

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const configs = useConfig();
  const [user, setUser] = useState<UserDetails | null>(null);

  const updateUser = useCallback((userData: UserDetails | null) => {
    setUser(userData);
  }, []);

  const refetchMe = async () => {
    const userInfo = await getMe();
    updateUser({
      ...user,
      userInfo: userInfo,
    } as any);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser: any) => {
      if (firebaseUser) {
        const userInfo = await getMe();
        updateUser({
          displayName: firebaseUser.displayName,
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          refreshToken: firebaseUser.refreshToken,
          userInfo: userInfo,
        });
      } else {
        updateUser(null);
      }
    });

    return () => unsubscribe();
  }, [configs, updateUser]);

  return (
    <UserContext.Provider
      value={{
        user,
        updateUser,
        refetchMe,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUser must be used within a UserConfigProvider");
  }

  return context;
};
