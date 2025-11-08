"use client";

import { CustomInput } from "@/components/layout/custom-input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { AttribuitesStepEmail } from "@/types/auth";
import { LoginStepEmailSchema } from "@/types/schemasZod";
import { ChangeEvent, useState } from "react";

export const StepEmail = ({ onValidate }: AttribuitesStepEmail) => {
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailField, setEmailField] = useState<string>("");
  const handleSubmit = async () => {
    setErrors(null);
    const validData = LoginStepEmailSchema.safeParse({ email: emailField });
    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return;
    }

    try {
      setLoading(true);
      const emailReq = await api.post("/auth/validate_email", {
        email: validData.data.email,
      });
      setLoading(false);
      onValidate(validData.data.email, emailReq.data.exists ? true : false);
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 flex flex-col">
        <h2 className="text-2xl mb-4 font-bold">Verifique seu Email</h2>
        <CustomInput
          name="email"
          errors={errors}
          labelText="Email"
          type="email"
          disabled={loading}
          value={emailField}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setEmailField(e.target.value)
          }
          placeholder="Digite seu Email"
        />
      </div>
      <div className="flex justify-end">
        <Button type="submit" disabled={loading} onClick={handleSubmit}>
          Proximo
        </Button>
      </div>
    </>
  );
};
