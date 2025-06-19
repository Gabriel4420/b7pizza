import { Product } from "@/generated/prisma";
import { CartItem } from "./cartItem";

export type CartStore = {
  cartItems: Array<CartItem>; // productId mapped to quantity
  addItem: (item: CartItem) => void;
  removeItem: (item: CartItem) => void;
  clearCart?: () => void;

  openCart: boolean;
  setOpenCart: (open: boolean) => void;
};

export type ProductStore = {
  products: Array<Product>;
  setProducts: (product: Product[]) => void;
};
