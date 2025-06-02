"use client";
import { pizzasListProps } from "@/types/props";
import { FC, useEffect } from "react";
import { useProductsStore } from "@/stores/products";
import { GridPizzas } from "./gridPizzas";

export const PizzaList: FC<pizzasListProps> = ({ pizzas }: pizzasListProps) => {
  const handleAddToCart = () => {
    // Implement the logic to add the pizza to the cart
  };

  const products = useProductsStore();
  useEffect(() => products.setProducts(pizzas), []);

  return !pizzas || pizzas.length === 0 ? (
    <p className="text-center">Nenhuma pizza encontrada.</p>
  ) : (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <GridPizzas pizzas={pizzas} />
    </div>
  );
};
