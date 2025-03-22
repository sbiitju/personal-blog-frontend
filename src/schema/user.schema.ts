import { z } from "zod";

export const adminValidationSchema = z.object({
  password: z.string().trim().min(6, "Password needs to be at least 6 characters"),
  admin: z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Please enter a valid email"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
    domain: z.string().trim().min(1, "Domain is required"),
  }),
});
