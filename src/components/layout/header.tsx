"use client";

import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart";
import Link from "next/link";

export const Header = () => {
  const cart = useCart();

  return (
    <header className="container mx-auto my-4 flex items-center justify-between p-5 bg-secondary rounded-md">
      <Link href="/">
        <h2 className="text-2xl font-bold">B7Pizzas</h2>
      </Link>
      <div className="flex gap-2">
        <Button>Login/Cadastro</Button>

        <Button className="relative" onClick={() => cart.setOpenCart(true)}>
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
            2
          </span>
          Carrinho
        </Button>
      </div>
    </header>
  );
};
