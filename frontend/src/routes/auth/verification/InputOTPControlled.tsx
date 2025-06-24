import { useState } from "react";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { UserLock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

export function InputOTPControlled() {
  const [value, setValue] = useState("");

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
          <Button className="w-full cursor-pointer">Verify Code</Button>
          <Button
            variant="secondary"
            className="w-full cursor-pointer hover:bg-gray-200"
          >
            Resend Code
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
}
