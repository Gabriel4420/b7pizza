"use client";

import { CustomInput } from "@/components/layout/custom-input";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/axios";
import { AttribuitesStepEmail } from "@/types/auth";
import { LoginStepEmailSchema } from "@/types/schemasZod";
import { ChangeEvent, useState } from "react";
import { useToast } from "@/components/ui/toast";

export const StepEmail = ({ onValidate }: AttribuitesStepEmail) => {
  const [errors, setErrors] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [emailField, setEmailField] = useState<string>("");
  const { show } = useToast();
  const handleSubmit = async () => {
    setErrors(null);
    const validData = LoginStepEmailSchema.safeParse({ email: emailField });
    if (!validData.success) {
      setErrors(validData.error.flatten().fieldErrors);
      return false;
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
      const status = (error as any)?.response?.status;
      const message = (error as any)?.response?.data?.message || "Falha ao validar e-mail";
      if (status === 409) {
        show({ title: "Conflito", message, variant: "warning" });
      } else if (status === 400) {
        show({ title: "Requisição inválida", message, variant: "error" });
      } else {
        show({ title: "Erro", message, variant: "error" });
      }
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
