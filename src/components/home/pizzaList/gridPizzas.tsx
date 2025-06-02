import { pizzasListProps } from "@/types/props";
import { HeadingPizzaGrid } from "./atom/headingPizzaGrid";
import { ImageGridPizza } from "./atom/imageGridPizza";
import { ButtonsAreaPizzaGrid } from "./mol/buttonsArea";

export const GridPizzas = ({ pizzas }: pizzasListProps) => {
  return (
    <>
      {pizzas.map((pizza) => (
        <div key={pizza.id} className="border text-sm rounded-lg p-4">
          <ImageGridPizza pizza={pizza} />
          <HeadingPizzaGrid pizza={pizza} />
          <p className="text-gray-700 truncate mb-3">{pizza.ingredients}</p>
          <ButtonsAreaPizzaGrid
            pizza={pizza}
            handleAddToCart={() => {}}
          />
        </div>
      ))}
    </>
  );
};
