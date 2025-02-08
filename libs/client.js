import { createClient } from "microcms-js-sdk";

export const client = createClient({
  serviceDomain: "1sdrqfaqhy",
  apiKey: process.env.API_KEY,
});
