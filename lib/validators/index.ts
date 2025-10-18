import { z } from "zod";

export const signInSchema = z.object({
  emailOrUsername: z
    .union([
      z.email("Enter valid email address"),
      z
        .string()
        .min(3, "Username must be at least 3 characters")
        .max(30, "Username must be at most 30 characters"),
    ])
    .refine((val) => val.trim() !== "", {
      error: "Email or Username cannot be empty",
    }),
  password: z
    .string()
    .min(6, "Enter at least 6 characters")
    .max(20, "Too long password")
    .refine((val) => val.trim() !== "", { error: "Password cannot be empty" }),
});

export const signUpSchema = z.object({
  name: z.string().max(50, "Name should not exceed 50 characters").nullable(),
  email: z
    .email("Enter valid email address")
    .refine((val) => val.trim() !== "", { error: "Email cannot be empty" }),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  password: z
    .string()
    .min(6, "Enter at least 6 characters")
    .max(20, "Too long password")
    .refine((val) => val.trim() !== "", { error: "Password cannot be empty" }),
  image: z.url("Invalid image URL").nullable(),
});

export const checkUsernameSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
});

export const messageSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(30, "Username must be at most 30 characters"),
  content: z
    .string()
    .min(2, "Message content cannot be empty")
    .max(500, "Message content must be at most 500 characters")
    .refine((val) => val.trim() !== "", {
      error: "Message content cannot be empty",
    }),
});

export type SignUp = z.infer<typeof signUpSchema>;
export type SignIn = z.infer<typeof signInSchema>;
export type CheckUsername = z.infer<typeof checkUsernameSchema>;
export type Message = z.infer<typeof messageSchema>;
