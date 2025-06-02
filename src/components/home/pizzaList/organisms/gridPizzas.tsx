import { pizzasListProps } from "@/types/props";
import * as pizza2 from "@/components/home/pizzaList/atom";
import { ButtonsAreaPizzaGrid } from "@/components/home/pizzaList/mol/buttonsArea";

export const GridPizzas = ({ pizzas }: pizzasListProps) => {
  return (
    <>
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="border text-sm rounded-lg p-4">
          <pizza2.ImageGridPizza pizza={pizza} />
          <pizza2.HeadingPizzaGrid pizza={pizza} />
          <p className="text-gray-700 truncate mb-3">{pizza.ingredients}</p>
          <ButtonsAreaPizzaGrid pizza={pizza} handleAddToCart={() => {}} />
        </div>
      ))}
    </>
  );
};
