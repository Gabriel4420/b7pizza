"use client";

import { useEffect, useState } from "react";
import { Button } from "../../ui/button";
import Link from "next/link";
import { X } from "lucide-react";
import { useAuth } from "@/stores/auth";
import { LoginAreaButtonAttributes } from "@/types/auth";



export const LoginAreaButton = ({ initialState }: LoginAreaButtonAttributes) => {
  const auth = useAuth();
  const [authState, setAuthState] = useState(initialState);

  useEffect(() => setAuthState(auth.token ? true : false),[auth]);

  const handleLogout = () => auth.setToken(null);

  return authState ? (
    <>
      <Link href="/logout">
        <Button>Meus pedidos</Button>
      </Link>
      <Button onClick={handleLogout}>
        <X />
      </Button>
    </>
  ) : (
    <Button onClick={() => auth.setOpen(true)}>
      {initialState ? "Logout" : "Login/Cadastro"}
    </Button>
  );
};
