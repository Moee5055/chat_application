import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

export default function LandingPageContent() {
  return (
    <div className="px-6 flex items-center">
      <div className="mt-[-5rem]">
        <div className="py-3">
          <h1 className="text-5xl font-bold text-[#1E293B]">
            Welcome to ChatWave
          </h1>
          <p className="text-sm text-[#1E293B]/80 font-semibold">{`Connect Chat Collaborate - anytime, anywhere.`}</p>
        </div>
        <div className="mt-2 space-x-4 flex items-center">
          <Button className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow hover:bg-blue-700 w-[110px]">
            <LogIn />
            Login
          </Button>
          <Button className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow hover:bg-blue-700 w-[110px]">
            <User />
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
