"use client";

import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  fetchAndActivate,
  getRemoteConfig,
  isSupported,
} from "firebase/remote-config";
import { firebaseApp } from "../helpers/config";
import firebaseRemoteConfig from "../utils/remote/remote-config";
import { FeatureFlags } from "../utils/types/feature-flags";

interface AppContextProps {
  featureFlags: FeatureFlags;
}
const AppContext = createContext<AppContextProps | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

  useEffect(() => {
    (async () => {
      try {
        if (typeof window !== "undefined" && (await isSupported())) {
          const remoteConfig = getRemoteConfig(firebaseApp);
          remoteConfig.settings.minimumFetchIntervalMillis = 3000;

          fetchAndActivate(remoteConfig)
            .then(async () => {
              const rawFeatureFlags =
                await firebaseRemoteConfig.getConfigJsonValue(
                  remoteConfig,
                  "feature_flags",
                );

              setFeatureFlags(rawFeatureFlags);
            })
            .catch((err) => {
              throw err;
            });
        } else {
          console.log(`Remote Config is not supported`);
        }
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  return (
    <AppContext.Provider
      value={{
        featureFlags,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useConfig = () => {
  const context = useContext(AppContext);

  return context;
};
