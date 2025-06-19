import { ProductStore } from "@/types/stores";
import { create } from "zustand";

export const useProductsStore = create<ProductStore>()((set) => ({
  products: [],
  // ✅ Correção: comparar se os produtos são diferentes antes de atualizar
  setProducts: (products) =>
    set((state) => {
      if (JSON.stringify(state.products) === JSON.stringify(products)) {
        return state;
      }
      return { products };
    }),
}));
