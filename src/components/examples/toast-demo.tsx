"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";

export const ToastDemo = () => {
  const { show } = useToast();

  return (
    <div className="flex gap-2">
      <Button
        onClick={() =>
          show({
            title: "Sucesso",
            message: "Pizza adicionada ao carrinho!",
            variant: "success",
          })
        }
      >
        Mostrar sucesso
      </Button>
      <Button
        variant="destructive"
        onClick={() =>
          show({
            title: "Erro",
            message: "Falha ao processar o pedido.",
            variant: "error",
          })
        }
      >
        Mostrar erro
      </Button>
    </div>
  );
};