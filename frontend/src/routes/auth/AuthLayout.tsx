import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="h-screen flex justify-center items-center w-full">
      <Outlet />
    </div>
  );
}
