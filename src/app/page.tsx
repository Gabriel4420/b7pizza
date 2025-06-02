import { api } from "@/lib/axios";
import { Header } from "@/components/layout/header";
import { PizzaList } from "@/components/home/pizzaList/listPizzas";

export default async function Home() {
  const pizzas = await api.get("/pizzas");
  const pizzaList = pizzas.data ?? [];

  return (
    <div>
      <Header />
      <main className="container mx-auto mb-10">
        <PizzaList pizzas={pizzaList} />
      </main>
    </div>
  );
}
