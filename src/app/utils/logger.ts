import { envVars } from "../config/env";
export const logger = {
  log: (...args: unknown[]) => {
    if (envVars.NODE_ENV === "development") {
      console.log(...args);
    }
  },
};

