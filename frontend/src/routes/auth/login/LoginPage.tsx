import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const handleLoginForm = () => {
    console.log("api request to /api/auth/login");
  };

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
