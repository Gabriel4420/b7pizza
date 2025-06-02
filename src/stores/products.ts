import { Product } from "@/generated/prisma";
import { create } from "zustand";

type Store = {
  products: Array<Product>;
  setProducts: (product: Product[]) => void;
};

export const useProductsStore = create<Store>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
}));
