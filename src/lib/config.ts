import * as CONFIG from "../config.json";
import * as CONFIG_PROD from "../config.prod.json";

type ConfigType = typeof CONFIG & typeof CONFIG_PROD;

/* Development or Production */
export const isDev = import.meta.env.DEV;

/**
 * Get a value from `config.json` (dev) or `config.prod.json` (prod, falling
 * back to `config.json` for any key missing in the prod file). Both files
 * must stay key-compatible.
 *
 * @param {string} key Config key
 * @returns mixed
 */
export const getConfig = (key: keyof ConfigType): any | null => {
  const result = isDev
    ? CONFIG[key]
    : CONFIG_PROD[key as keyof typeof CONFIG_PROD] || CONFIG[key];

  return result === undefined ? null : result;
};

export const isExperiment = (key: string | string[]): boolean => {
  const keys = typeof key === "string" ? [key] : key;
  const experiments: string[] = (getConfig("experiments" as any) as string[]) || [];

  return !!keys.find((item) => experiments.indexOf(item) >= 0);
};
