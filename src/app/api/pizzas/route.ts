import { getAllProducts } from "@/app/services/product";

export async function GET() {
  let pizzas = await getAllProducts();
 
  if (Array.isArray(pizzas)) {
    pizzas = pizzas.map((pizza) => ({
      ...pizza,
      image: `${process.env.NEXT_PUBLIC_BASE_URL}/images/pizzas/${pizza.image}`,
    }));
    return new Response(JSON.stringify(pizzas), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    return new Response(
      JSON.stringify({ error: (pizzas as Error).message || "Unknown error" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}

