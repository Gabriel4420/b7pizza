"use client";

import { useAuth } from "@/stores/auth";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../ui/dialog";
import { useEffect, useState } from "react";
import { LoginAreaStep } from "@/types/auth";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { StepEmail } from "./step-email";

export const LoginAreaDialog = () => {
  const auth = useAuth();

  const [step, setStep] = useState<LoginAreaStep>("EMAIL");

  const [emailField, setEmailField] = useState("");

  const handleStepEmail = (email: string, hasEmail: boolean) => {
    setEmailField(email);
    return hasEmail ? setStep("SIGN_IN") : setStep("SIGN_UP");
  };

  return (
    <Dialog open={auth.open} onOpenChange={(open) => auth.setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center text-sm -mt-3.5 mb-5 gap-16 pr-32">
            {step === "EMAIL" ? (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setStep("EMAIL")}
                className="text-2xl font-bold mr-6"
              >
                <ArrowLeftIcon className="size-4" />
              </Button>
            ) : step === "SIGN_IN" ? (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setStep("SIGN_IN")}
              >
                <ArrowLeftIcon className="size-4" />
              </Button>
            ) : (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setStep("SIGN_UP")}
              >
                <ArrowLeftIcon className="size-4" />
              </Button>
            )}
            Login / Cadastro
          </DialogTitle>
        </DialogHeader>
        <div className="flex flex-col gap-4">
          {step === "EMAIL" && (
            <>
              <StepEmail onValidate={handleStepEmail} />
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
