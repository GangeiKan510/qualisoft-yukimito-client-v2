import merge from "deepmerge";
import { getString } from "firebase/remote-config";
import "firebase/remote-config";

const BASE_CONFIG = "default";
const DEFAULT_CONFIG = {};

const getRemoteConfigJsonValue = (remoteConfig: any, key: string) => {
  try {
    const value = getString(remoteConfig, key);
    if (!key) {
      console.error("Key is required to get remote config value");
      return {};
    }
    return JSON.parse(value);
  } catch (err) {
    console.error(
      `Error in getting JSON value of key ${key} from remote config`,
      err,
    );
    return {};
  }
};

const combineMerge = (target: any, source: any, options: any) => {
  const destination = target.slice();

  source.forEach((item: any, index: number) => {
    if (typeof destination[index] === "undefined") {
      destination[index] = options.cloneUnlessOtherwiseSpecified(item, options);
    } else if (options.isMergeableObject(item)) {
      destination[index] = merge(target[index], item, options);
    } else if (target.indexOf(item) === -1) {
      destination.push(item);
    }
  });
  return destination;
};

export const resolveRemoteConfig = async (remoteConfig: any) => {
  const wrappedConfig: any = {};
  const remoteBaseConfig = getRemoteConfigJsonValue(remoteConfig, BASE_CONFIG);
  const overrides =
    getRemoteConfigJsonValue(
      remoteConfig,
      process.env.NEXT_PUBLIC_FIREBASE_CONFIG_ENV!,
    ) ?? {};

  if (remoteBaseConfig) {
    wrappedConfig[BASE_CONFIG] = remoteBaseConfig;
  }

  const partiallyMergedConfig = merge(
    DEFAULT_CONFIG,
    wrappedConfig[BASE_CONFIG],
    {
      arrayMerge: combineMerge,
    },
  ) as typeof overrides;

  const mergedConfig = merge(partiallyMergedConfig, overrides, {
    arrayMerge: combineMerge,
  }) as typeof partiallyMergedConfig;
  return mergedConfig;
};

export const getConfigJsonValue = async (remoteConfig: any, key: string) => {
  const config = await resolveRemoteConfig(remoteConfig);
  return config[key];
};

const firebaseRemoteConfig = {
  getConfigJsonValue,
};

export default firebaseRemoteConfig;
