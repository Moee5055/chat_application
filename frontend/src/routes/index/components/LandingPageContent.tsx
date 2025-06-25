import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";
import { useNavigate } from "react-router";

export default function LandingPageContent() {
  const navigate = useNavigate();
  return (
    <div className="px-6 flex items-center">
      <div className="mt-[-6rem] px-7">
        <div className="py-3">
          <h1 className="text-5xl font-bold text-[#1E293B]">
            Welcome to ChatWave
          </h1>
          <p className="text-sm text-[#1E293B]/80 font-semibold">{`Connect Chat Collaborate - anytime, anywhere.`}</p>
        </div>
        <div className="mt-2 space-x-4 flex items-center">
          <Button
            className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow hover:bg-blue-700 w-[110px]"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            <LogIn />
            Login
          </Button>
          <Button
            className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow hover:bg-blue-700 w-[110px]"
            onClick={() => {
              navigate("/auth/signup");
            }}
          >
            <User />
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
