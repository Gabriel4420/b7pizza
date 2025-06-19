"use client";
import { useCart } from "@/stores/cart";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";

export const Cart = () => {
  const cart = useCart();

  // This component is used to display the cart drawer
  // It will be opened when the user adds an item to the cart
  // and will show the items in the cart

  return (
    <Drawer direction="right" open={cart.openCart} onOpenChange={open => cart.setOpenCart(open)}>
      <DrawerContent>
        <DrawerTitle>Seu Carrinho</DrawerTitle>
        ...
      </DrawerContent>
    </Drawer>
  );
};
