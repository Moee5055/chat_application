import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { type HTMLAttributes } from "react";
import { Link } from "react-router";

import PasswordField from "./passwordfield";
import { email } from "@/routes/auth/signup/SignupPage";
import MultipleLogin from "@/routes/auth/login/MultipleLogin";

interface LoginFormProps extends HTMLAttributes<HTMLDivElement> {
  cardTitle: string;
  cardDescription: string;
  buttonValue: string;
  linkName: string;
  formAction: (formData: FormData) => void | Promise<void>;
  emailFormAction?: (formData: FormData) => void | Promise<void>;
  errors?: {
    email?: string;
    password?: string;
    phone?: string;
  };
  verified?: boolean;
}

export function LoginForm({
  className,
  cardTitle,
  cardDescription,
  buttonValue,
  linkName,
  formAction,
  errors,
  emailFormAction,
  verified = false,
  ...props
}: LoginFormProps) {
  const isLogin = buttonValue.toLowerCase() === "login";
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>{cardTitle}</CardTitle>
          <CardDescription>{cardDescription}</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <div className="flex flex-col gap-6">
              {isLogin ? (
                <MultipleLogin errors={errors} />
              ) : (
                <div className="grid gap-3">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    defaultValue={email}
                    placeholder="m@example.com"
                    required
                  />
                </div>
              )}
              {buttonValue.toLowerCase() === "login" ? (
                <>
                  <PasswordField errors={errors} isLogin={isLogin} />
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full cursor-pointer">
                      {buttonValue}
                    </Button>
                  </div>
                </>
              ) : verified && buttonValue.toLowerCase() === "sign up" ? (
                <>
                  <PasswordField errors={errors} isLogin={isLogin} />
                  <div className="flex flex-col gap-3">
                    <Button type="submit" className="w-full cursor-pointer">
                      {buttonValue}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col gap-3 ">
                  <Button
                    formAction={emailFormAction}
                    className="cursor-pointer"
                  >
                    Next
                  </Button>
                </div>
              )}
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to={`/auth/${linkName.toLowerCase()}`}>
                <span className="underline underline-offset-4">{linkName}</span>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
