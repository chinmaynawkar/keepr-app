"use client";

import React, { useState } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Image from "next/image";
import { Button } from "../ui/button";
import { sendEmailOTP, verifyEmail } from "@/lib/actions/user.actions";
import { useRouter } from "next/navigation";

const OtpModel = ({
  email,
  accountId,
}: {
  email: string;
  accountId: string;
}) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(true);
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsLoading(true);

    console.log({ accountId, otp });

    try {
      // TODo ; CALL VERIFY OTP API
      const sessionId = await verifyEmail({ accountId, otp });

      if (sessionId) router.push("/");
    } catch (error) {
      console.log("Failed to verify OTP", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    // TODo ; CALL RESEND OTP API
    await sendEmailOTP({ email });
  };

  return (
    <div>
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogContent className="shad-alert-dialog">
          <AlertDialogHeader className="relative flex justify-center">
            <AlertDialogTitle className="h2 text-center">
              Enter OTP
              <Image
                src="/icons/close-dark.svg"
                alt="close"
                width={20}
                height={20}
                onClick={() => setIsOpen(false)}
                className="otp-close-button"
              />
            </AlertDialogTitle>
            <AlertDialogDescription className="subtitle-2 text-center text-light-100">
              Enter the OTP sent to {email}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <InputOTP maxLength={6} value={otp} onChange={setOtp}>
            <InputOTPGroup className="shad-otp">
              <InputOTPSlot index={0} className="shad-otp-slot" />
              <InputOTPSlot index={1} className="shad-otp-slot" />
              <InputOTPSlot index={2} className="shad-otp-slot" />
              <InputOTPSlot index={3} className="shad-otp-slot" />
              <InputOTPSlot index={4} className="shad-otp-slot" />
              <InputOTPSlot index={5} className="shad-otp-slot" />
            </InputOTPGroup>
          </InputOTP>

          <AlertDialogFooter>
            <div className="flex w-full flex-col gap-3">
              <AlertDialogAction
                className="shad-submit-btn h-12"
                type="button"
                onClick={handleSubmit}
              >
                Submit
                {isLoading && (
                  <Image
                    src="/icons/loader.svg"
                    alt="loader"
                    width={24}
                    height={24}
                    className="ml-2 animate-spin"
                  />
                )}
              </AlertDialogAction>
              <div className="subtitle-2 mt-2 text-center text-light-100">
                Didn&apos;t receive OTP?
                <Button
                  type="button"
                  variant="link"
                  className="pl-1 text-brand"
                  onClick={handleResendOtp}
                >
                  Click here to resend
                </Button>
              </div>
            </div>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default OtpModel;
