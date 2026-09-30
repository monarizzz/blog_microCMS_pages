import { createManagementClient } from "microcms-js-sdk";

export const managementClient = createManagementClient({
  serviceDomain: "1sdrqfaqhy",
  apiKey: process.env.API_KEY!,
});
