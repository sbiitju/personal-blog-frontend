import { z } from "zod";
export const bioGraphValidationSchema = z.object({
  shortDescription: z.string().trim().min(1, "Short Description is required"),
  domain: z.string().trim().min(1, "Domain is required"),
});
