import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex justify-center items-center w-full">
      <Outlet />
    </div>
  );
}
