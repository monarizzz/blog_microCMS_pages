import { createClient } from "microcms-js-sdk";

import { microCMSEnv } from "./env";

export const client = createClient({
  serviceDomain: microCMSEnv.serviceDomain,
  apiKey: microCMSEnv.apiKey,
});
