import { useEffect, useState } from "react";
import { useConfig } from "../config/app-context";
import { FeatureFlags } from "./types/feature-flags";

export const FEATURE_OAUTH_GOOGLE = "feature_oauth_google";
export const FEATURE_OAUTH_PHONE = "feature_oauth_phone";
export const FEATURE_OAUTH_EMAIL = "feature_oauth_email";

export const useFeatureFlags = () => {
  const [featureFlags, setFeatureFlags] = useState<FeatureFlags>({});

  const configs = useConfig();

  useEffect(() => {
    if (configs?.featureFlags) {
      setFeatureFlags(configs?.featureFlags);
    }
  }, [configs]);

  const isFeatureEnabled = (key: string): boolean => {
    return !!featureFlags[key as string];
  };

  return { featureFlags, isFeatureEnabled };
};
