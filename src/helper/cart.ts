import { CartItem } from "@/types/cartItem";
import { CartStore, ProductStore } from "@/types/stores";

export const calculateSubtotal = ({cart, products}:{cart:CartStore, products:ProductStore}) => {
  let sub = 0;
  for (let item of cart.cartItems) {
    const prod = products.products.find((pitem) => pitem.id === item.productId);
    if (prod) sub += item.quantity * parseFloat(prod.price.toString());
  }
  return sub;
};


export const getCartItem = ({cart, item}:{cart:CartStore, item:CartItem}) => {

  return cart.cartItems.find(
    (cartItem) => cartItem.productId === item.productId
  );
}

export const handleMinusClick = ({cart, item, setQt, qt}:{cart:CartStore, item:CartItem, setQt:(qt:number) => void, qt:number}) => {
  qt <= 1
    ? cart.removeItem(item)
    : cart.addItem({ productId: item.productId, quantity: -1 });
  setQt(qt - 1);
};

export const handlePlusClick = ({cart, item, setQt, qt}:{cart:CartStore, item:CartItem, setQt:(qt:number) => void, qt:number}) => {
  cart.addItem({ productId: item.productId, quantity: 1 });
  setQt(qt + 1);
};