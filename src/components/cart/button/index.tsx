'use client'
import { Button } from "@/components/ui/button";
import { useCart } from "@/stores/cart"; 

export const CartHeaderButton = () => {
const cart = useCart();

 const totalItems = cart.cartItems.reduce(
   (total, item) => total + item.quantity,
   0
 );
  return (
    <Button className="relative" onClick={() => cart.setOpenCart(true)}>
      <span className="absolute -top-1 -right-1 flex items-center justify-center w-4 h-4 text-xs font-bold text-white bg-red-500 rounded-full">
        {totalItems}
      </span>
      Carrinho
    </Button>
  );
}