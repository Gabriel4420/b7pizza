"use client";

import { useCart } from "@/stores/cart";
import { pizzaProps } from "@/types/props";
import { FC } from "react";
import { handleAddToCart } from "@/helper/actionsItem";
import { PizzaCard } from "../pizzaCard";

export const GridPizzaArea: FC<pizzaProps> = ({ data }: pizzaProps) => {
  const cart = useCart();

  const handleAction = () => handleAddToCart({ cart, data });

  return (
    <div className="text-sm bg-secondary p-4 rounded-md">
      <PizzaCard handleAction={handleAction} data={data} />
    </div>
  );
};
