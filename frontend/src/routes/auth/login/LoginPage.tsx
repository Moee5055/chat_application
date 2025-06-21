import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <LoginForm
      className="min-w-sm max-w-md"
      cardTitle="Login to your account"
      cardDescription="Enter your email below to login to your account"
      linkName="Signup"
      buttonValue="Login"
    />
  );
}
