import { Label } from "./ui/label";
import { Input } from "./ui/input";

export default function PasswordField({
  errors,
}: {
  errors?: { password?: string };
}) {
  return (
    <div className="grid gap-3">
      <div className="flex items-center">
        <Label htmlFor="password">Password</Label>
        <a
          href="#"
          className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
        >
          Forgot your password?
        </a>
      </div>
      <Input id="password" type="password" name="password" required />
      {errors?.password && (
        <span className="text-sm text-red-500">{errors.password}</span>
      )}
    </div>
  );
}
