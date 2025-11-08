import { Prisma } from "@/generated/prisma";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const decimalToMoney = (value: string | number | Prisma.Decimal) => {
  return parseFloat(value.toString()).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const checkFieldError = (errors: any, fieldName: string) => {
  return errors === null
    ? false
    : !errors[fieldName]
    ? false
    : errors[fieldName][0];
};
