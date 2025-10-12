"use client";

import { decimalToMoney } from "@/lib/utils";
import { useProductsStore } from "@/stores/products";
import { CartProductAttributes } from "@/types/cartItem";
import Image from "next/image";
import { Button } from "../../ui/button";
import { useState, useEffect } from "react";
import { useCart } from "@/stores/cart";
import { getCartItem, handleMinusClick, handlePlusClick } from "@/helper/cart";



export const CartProduct = ({ item }: CartProductAttributes) => {
  const [qt, setQt] = useState(item.quantity);

  const cart = useCart();

  const products = useProductsStore();

  // Sincroniza o estado local com o estado global do carrinho
  useEffect(() => {
    
    if (getCartItem({cart, item})) {
      setQt(getCartItem({cart, item})?.quantity || 0);
    }
  }, [cart.cartItems, item.productId]);

  let product = products.products.find((item2) => item2.id === item.productId);

  if (!product) return null;

  

  return (
    <li className="flex items-center gap-3">
      <div className="w-10">
        <Image
          alt={product.name}
          src={product.image}
          width={100}
          height={100}
          className="w-full rounded-full h-auto object-cover"
        />
      </div>
      <div className="flex-1">
        <div>{product.name}</div>
        <div className="text-sm">{decimalToMoney(product.price)}</div>
      </div>
      <div className="flex items-center bg-secondary p-2 rounded-md">
        <Button
          onClick={() => handleMinusClick({cart, item, setQt, qt})}
          size={"sm"}
          variant={"ghost"}
          className="border-r rounded-none"
        >
          -
        </Button>
        <div className="mx-3">{qt}</div>
        <Button
          onClick={() => handlePlusClick({cart, item, setQt, qt})}
          size={"sm"}
          variant={"ghost"}
          className="border-l rounded-none"
        >
          +
        </Button>
      </div>
    </li>
  );
};
