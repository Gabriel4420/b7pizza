import { Prisma } from "@/generated/prisma";

export type CartItem = { 
  productId: number;
  quantity: number ;
};