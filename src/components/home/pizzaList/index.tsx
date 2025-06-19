"use client";

import { Product } from "@/generated/prisma";
import { GridPizzaArea } from "../pizzaItem";
import { useProductsStore } from "@/stores/products";
import { useEffect } from "react";

type Props = {
  pizzas: Product[];
};

export const PizzaList = ({ pizzas }: Props) => {
  const products = useProductsStore();

  useEffect(() => {
    products.setProducts(pizzas);
  }, []);

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {pizzas.map((item: Product) => (
        <GridPizzaArea key={item.id} data={item} />
      ))}
    </div>
  );
};
