import { useActionState, useState } from "react";
import { useNavigate } from "react-router";

import { LoginForm as SignupForm } from "@/components/login-form";
import { toast } from "sonner";

import { type ActionResult, AuthSchema as SignupSchema } from "../utils";

export default function SignupPage() {
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleSignupForm = async (
    prevData: ActionResult,
    formData: FormData,
  ): Promise<ActionResult> => {
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
    //TODO: handle post request send user data to database

    toast.success("Submit Successfully.", {
      position: "top-center",
    });
    navigate("/auth/signup/verification");
    return {
      success: true,
    };
  };

  const [message, formAction] = useActionState<ActionResult, FormData>(
    handleSignupForm,
    { success: false },
  );
  console.log(message);
  return (
    <SignupForm
      className="min-w-sm max-w-md"
      cardTitle="Signup to create your new  account"
      cardDescription="Enter your email below to create your new  account"
      buttonValue="Sign up"
      linkName="Login"
      formAction={formAction}
      errors={message.errors}
      verified={emailVerified}
    />
  );
}
