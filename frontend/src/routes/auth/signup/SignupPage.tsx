import { useActionState } from "react";
import { z } from "zod";

import { LoginForm as SignupForm } from "@/components/login-form";
import { toast } from "sonner";

const passwordSchema = z
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

const SignupSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: passwordSchema,
});

type ActionResult = {
  success: boolean;
  errors?: {
    email?: string;
    password?: string;
  };
};

export default function SignupPage() {
  const handleSignupForm = (
    prevData: ActionResult,
    formData: FormData,
  ): ActionResult => {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = SignupSchema.safeParse(rawData);

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      toast.error("Error Submitting Form", {
        position: "top-center",
      });
      return {
        success: false,
        errors: {
          email: fieldErrors.email?.[0],
          password: fieldErrors.password?.[0],
        },
      };
    }
    toast.success("Submit Successfully.", {
      position: "top-center",
    });

    return {
      success: true,
    };
  };

  const [message, formAction] = useActionState<ActionResult, FormData>(
    handleSignupForm,
    { success: false },
  );

  return (
    <SignupForm
      className="min-w-sm max-w-md"
      cardTitle="Signup to create your new  account"
      cardDescription="Enter your email below to create your new  account"
      buttonValue="Sign up"
      linkName="Login"
      formAction={formAction}
      errors={message.errors}
    />
  );
}
