import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { UserLock } from "lucide-react";

export function InputOTPControlled() {
  const [value, setValue] = useState("");

  return (
    <div className="space-y-4 shadow-lg p-5 min-w-[400px] rounded-lg">
      <div className="pb-8 flex flex-col items-center justify-center">
        <UserLock className="" size={45} />
        <h2 className="font-extrabold text-xl tracking-wider">
          Email Verification
        </h2>
        <p className="text-sm text-gray-500">Enter 6-digit Code Below </p>
      </div>
      <div className="flex justify-center">
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
      </div>
      <Button className="bg-blue-500 text-white mt-5 w-full hover:bg-blue-700 cursor-pointer">
        Verify Code
      </Button>
      <Button
        variant="secondary"
        className="w-full cursor-pointer hover:bg-gray-200"
      >
        Resend Code
      </Button>
    </div>
  );
}
