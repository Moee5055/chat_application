import { useActionState, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

import { LoginForm as SignupForm } from "@/components/login-form";
import { toast } from "sonner";

import { type ActionResult, AuthSchema as SignupSchema } from "../utils";

export let email = "";

export default function SignupPage() {
  const [emailVerified, setEmailVerified] = useState(false);
  const navigate = useNavigate();

  const handleEmailCheck = async (formData: FormData): Promise<void> => {
    email = formData.get("email") as string;

    const result = SignupSchema.pick({ email: true }).safeParse({ email });
    if (!result.success) {
      const emailError = result.error.flatten().fieldErrors.email?.[0];
      toast.error(emailError || "Invalid email");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/user_exist",
        {
          email,
        },
      );
      if (data.error) {
        toast.error("User with this email already Exits");
        return;
      }
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const status = err.response?.status;
        const errorMessage =
          err.response?.data?.message || "Something went wrong";

        if (status === 400) {
          toast.error("Email is required");
        } else if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Unknown error occurred");
        console.error(err);
      }
    }
    setEmailVerified(true);
  };

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

    localStorage.setItem("email", rawData.email);
    localStorage.setItem("password", rawData.password);

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
      emailFormAction={handleEmailCheck}
    />
  );
}
