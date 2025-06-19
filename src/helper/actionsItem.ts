import { useCart } from "@/stores/cart";
import { CartItem } from "@/types/cartItem";
import { pizzaProps, pizzasListProps } from "@/types/props";
import { CartStore } from "@/types/stores";

export const validateItem = ({
  item,
  state,
}: {
  item: CartItem;
  state: CartStore;
}) => {
  // Check if the item already exists in the cart
  if (!item || !item.productId || item.quantity <= 0) {
    throw new Error("Invalid item");
  }

  // Check if the item already exists in the cart
  const existingItem = state.cartItems.find(
    (cartItem) => cartItem.productId === item.productId
  );

  return existingItem;
};

export const filterCartItems = ({
  item,
  state,
}: {
  item: CartItem;
  state: CartStore;
}) => {
  // Filter out the item from the cart
  return state.cartItems.filter(
    (cartItem) => cartItem.productId !== item.productId
  );
};

export const handleAddToCart = async ({
  cart,
  data,
}: {
  cart: CartStore;
  data: pizzaProps['data'];
}) => {
  cart.addItem({
    productId: data?.id,
    quantity: 1,
  });
  cart.setOpenCart(true);
};
