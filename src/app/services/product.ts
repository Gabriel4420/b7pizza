import prisma from "@/lib/prisma";

export const getAllProducts = async () => {
  try {
    return await prisma.product.findMany();
  } catch (error) {
    console.error("Error fetching products:", error);
    return  Error("Failed to fetch products");
  }
};
