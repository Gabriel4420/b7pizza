"use client";

import { useAuth } from "@/stores/auth";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../ui/dialog";
import { useEffect, useState } from "react";
import { LoginAreaStep } from "@/types/auth";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { ArrowLeftIcon } from "lucide-react";
import { StepEmail } from "./step-email";

export const LoginAreaDialog = () => {
  const auth = useAuth();

  const [step, setStep] = useState<LoginAreaStep>("EMAIL");

  const [email, setEmail] = useState("");

  const handleStepEmail = (email: string, hasEmail: boolean) => {
    setEmail(email);
    if (hasEmail) {
      setStep("SIGN_IN");
    } else {
      setStep("SIGN_UP");
    }
  };

  return (
    <Dialog open={auth.open} onOpenChange={(open) => auth.setOpen(open)}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex justify-evenly items-center gap-2">
            Login / Cadastro
            {step === "EMAIL" ? (
              <Button
                variant={"ghost"}
                size={"icon"}
                onClick={() => setStep("EMAIL")}
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
