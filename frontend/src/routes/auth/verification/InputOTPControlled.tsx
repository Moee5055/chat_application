import { useState } from "react";
import axios from "axios";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { UserLock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

export function InputOTPControlled() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");

  const handleVerifyCode = async () => {
    const email = localStorage.getItem("email");
    console.log("handleVerifycode");
    console.log(value);
    try {
      const response = await axios.post(`${backendUrl}/auth/verifyCode`, {
        email,
        verificationCode: value,
      });
      if (response.data?.status === "400") {
        toast.error(response.data?.error, {
          position: "top-center",
        });
        return;
      }
      navigate("/auth/signup/create-new-user");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const errorMessage =
          error.response?.data?.error || "Something went wrong";

        if (status === 500) {
          toast.error("Server error. Please try again later.");
        } else {
          toast.error(errorMessage);
        }
      } else {
        toast.error("Unknown error occurred");
        console.error(error);
      }
    }
  };

  const handleResendCode = async () => {};

  return (
    <Card>
      <div className="space-y-4 min-w-[400px]">
        <div className="pb-4 flex flex-col items-center justify-center">
          <UserLock className="" size={45} />
          <h2 className="font-extrabold text-xl tracking-wider">
            Email Verification
          </h2>
          <p className="text-sm text-gray-500">Enter 6-digit Code Below </p>
        </div>
        <CardContent className="flex justify-center pb-4">
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={2} />
              <InputOTPSlot index={3} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          <Button className="w-full cursor-pointer" onClick={handleVerifyCode}>
            Verify Code
          </Button>
          <Button
            variant="secondary"
            className="w-full cursor-pointer hover:bg-gray-200"
            onClick={handleResendCode}
          >
            Resend Code
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
