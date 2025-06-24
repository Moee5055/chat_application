import { toast } from "sonner";
import { LoginForm } from "@/components/login-form";

import { type ActionResult, AuthSchema as LoginSchema } from "../utils";
import { useActionState } from "react";
import { useNavigate } from "react-router";

export default function LoginPage() {
  const navigate = useNavigate();

  const handleLoginForm = (
    prevData: ActionResult,
    formData: FormData,
  ): ActionResult => {
    const rawData = {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
    };

    const result = LoginSchema.safeParse(rawData);

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
    navigate("/");
    return {
      success: true,
    };
  };

  const [message, formAction] = useActionState<ActionResult, FormData>(
    handleLoginForm,
    { success: false },
  );

  return (
    <LoginForm
      className="min-w-sm max-w-md"
      cardTitle="Login to your account"
      cardDescription="Enter your email below to login to your account"
      linkName="Signup"
      buttonValue="Login"
      formAction={formAction}
      errors={message.errors}
    />
  );
}
