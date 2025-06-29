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

export const LoginSchema = z.object({
  email: z.string().optional(),
  phone: z
    .string()
    .regex(/^\d{10}$/, "Invalid mobile number")
    .optional()
    .nullable(),
  password: passwordSchema,
});

export const SignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
});

export type ActionResult = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
    phone?: string;
  };
};

export const countries = [
  { code: "+977", flag: "🇳🇵" },
  { code: "+91", flag: "🇮🇳" },
  { code: "+880", flag: "🇧🇩" },
  { code: "+92", flag: "🇵🇰" },
  { code: "+94", flag: "🇱🇰" },
  { code: "+960", flag: "🇲🇻" },
  { code: "+975", flag: "🇧🇹" },
  { code: "+65", flag: "🇸🇬" },
  { code: "+1", flag: "🇺🇸" },
];
