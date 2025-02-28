import { z } from "zod";

// Define a schema for login validation
export const LoginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

// Define a schema for registration validation
export const RegisterSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type State = {
  status: "idle" | "success" | "error";
  message?: string;
};
