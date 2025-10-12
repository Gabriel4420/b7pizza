"use client";
import { useCart } from "@/stores/cart";
import { Drawer, DrawerContent, DrawerTitle } from "../ui/drawer";
import { useProductsStore } from "@/stores/products";
import { useEffect, useState } from "react";
import { decimalToMoney } from "@/lib/utils";
import { CartProduct } from "./list";
import { LucideShoppingBasket, X } from "lucide-react";
import { calculateSubtotal } from "@/helper/cart";

export const Cart = () => {
  const cart = useCart();
  const products = useProductsStore();
  const [subtotal, setSubtotal] = useState(0);
  const [shippingCont, _setShippingCont] = useState(10);

  useEffect(() => {
    setSubtotal(calculateSubtotal({ cart, products }));
  }, [cart]);

  return (
    <Drawer
      direction="right"
      open={cart.openCart}
      onOpenChange={(open) => cart.setOpenCart(open)}
    >
      <DrawerContent className="p-4">
        <DrawerTitle className="flex justify-between items-center gap-2 pb-10">
          <span className="inline-flex">
            <LucideShoppingBasket
              aria-autocomplete="both"
              className="h-6 w-6 text-red-500"
            />
          </span>
          Carrinho
          <button
            className=" bg-red-400 text-white py-1 rounded-full hover:bg-red-600 pl-1 flex items-center justify-between cursor-pointer"
            onClick={() => cart.setOpenCart(false)}
          >
            <X className="inline mr-2" />
          </button>
        </DrawerTitle>
        {cart.cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Seu carrinho está vazio.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {cart.cartItems.map((item) => (
                <CartProduct key={item.productId} item={item} />
              ))}
            </ul>
            <div className="my-4 text-right">
              <div>Sub-total: {decimalToMoney(subtotal)}</div>
              <div>Frete: {decimalToMoney(shippingCont)}</div>
              <div className="font-bold">
                Total: {decimalToMoney(subtotal + shippingCont)}
              </div>
            </div>
          </>
        )}
      </DrawerContent>
    </Drawer>
  );
};
