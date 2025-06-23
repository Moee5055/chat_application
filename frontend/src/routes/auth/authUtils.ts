import { z } from "zod";

export const passwordSchema = z
  .string()
  .min(6, "Password must be at least 6 characters")
  .refine((val) => /[a-z]/.test(val), {
    message: "Password must contain at least one lowercase letter",
  })
  .refine((val) => /[A-Z]/.test(val), {
    message: "Password must contain at least one uppercase letter",
  })
  .refine((val) => /[^A-Za-z0-9]/.test(val), {
    message: "Password must contain at least one special character",
  });

export const AuthSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
});

export type ActionResult = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
};
