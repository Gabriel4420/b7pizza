import { CartItem } from "@/types/cartItem";
import { CartStore } from "@/types/stores";
import { create } from "zustand";



export const useCart = create<CartStore>()((set) => ({
  openCart: false,
  setOpenCart: (open) => set((state) => ({ ...state, openCart: open })),
  cartItems: [],
  addItem: (item) =>
    set((state) => {
      let cloneItems = [...state.cartItems];
      const existing = state.cartItems.find(
        (i) => i.productId === item.productId
      );

      if (existing) {
        for (let key in cloneItems) {
          if (cloneItems[key].productId === item.productId) {
            cloneItems[key].quantity += item.quantity;
          }
        }
      } else {
        cloneItems.push(item);
      }

      return { ...state, cartItems: cloneItems };
    }),
  removeItem: (cartItem) =>
    set((state) => ({
      ...state,
      cartItems: state.cartItems.filter(
        (item) => item.productId !== cartItem.productId
      ),
    })),
}));
