import { Button } from "@/components/ui/button";
import { LogIn, User } from "lucide-react";

export default function LandingPageContent() {
  return (
    <div className="px-6 flex items-center">
      {/*<div className="flex justify-between items-center">
        <h2 className="font-extrabold text-3xl tracking-wider uppercase font-serif text-shadow-2xs">
          ChatWave
        </h2>
        <div className="space-x-3">
          <Button>Login</Button>
          <Button>SignUp</Button>
        </div>
      </div>
      */}
      <div className="mt-[-5rem]">
        <div className="py-3">
          <h1 className="text-5xl font-bold text-[#1E293B]">
            Welcome to ChatWave
          </h1>
          <p className="text-sm text-[#1E293B]/80 font-semibold">{`Connect Chat Collaborate - anytime, anywhere.`}</p>
        </div>
        <div className="mt-2 space-x-4 flex items-center">
          <Button className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow">
            <LogIn />
            Login
          </Button>
          <Button className="bg-[#3B82F6] cursor-pointer shadow-lg transition-all hover:transition-shadow">
            <User />
            SignUp
          </Button>
        </div>
      </div>
    </div>
  );
}
