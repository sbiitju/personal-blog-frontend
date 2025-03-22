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



export const userValidationSchema = z.object({
  password: z.string().trim().min(6, "Password needs to be at least 6 characters"),
  role: z.enum(["political", "admin", "technical"]).default("political"),  
  client: z.object({
    name: z.string().trim().min(1, "Name is required"),
    email: z.string().trim().email("Please enter a valid email"),
    phone: z.string().trim().min(10, "Phone number must be at least 10 digits"),
    dateOfBirth: z.string().trim().refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    }),
    bio: z.string().trim().optional(),
    socialLinks: z.object({
      facebook: z.string().trim().url("Invalid Facebook URL").optional(),
      youtube: z.string().trim().url("Invalid YouTube URL").optional(),
      instagram: z.string().trim().url("Invalid Instagram URL").optional(),
      twitter: z.string().trim().url("Invalid Twitter URL").optional(),
    }).partial(), // Allows missing fields
    domain: z.string().trim().min(1, "Domain is required"),
    position: z.string().trim().min(1, "Position is required"),
    address: z.string().trim().min(1, "Address is required"),
  }),
});


export const clientValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(1, "Phone number is required"),
  domain: z.string().min(1, "Domain is required"),
  position: z.string().min(1, "Position is required"),
  address: z.string().min(1, "Address is required"),
  bio: z.string().min(1, "Bio is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  facebook: z.string().optional(),
  youtube: z.string().optional(),
  instagram: z.string().optional(),
  twitter: z.string().optional(),
})
