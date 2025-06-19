import { Product } from "@/generated/prisma";

export type pizzasListProps = {
  pizzas: Product[];
};

export type pizzaProps = {
  data: Product;
};
