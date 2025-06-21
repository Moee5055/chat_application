import { LoginForm as SignupForm } from "@/components/login-form";

export default function SignupPage() {
  return (
    <SignupForm
      className="min-w-sm max-w-md"
      cardTitle="Signup to create your new  account"
      cardDescription="Enter your email below to create your new  account"
      buttonValue="Sign up"
      linkName="Login"
    />
  );
}
