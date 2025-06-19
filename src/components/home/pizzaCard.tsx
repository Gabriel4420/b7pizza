import Image from "next/image";
import { Button } from "@/components/ui/button";
import { decimalToMoney } from "@/lib/utils";
import { pizzaProps } from "@/types/props";
export const PizzaCard = ({
  data,
  handleAction,
}: {
  data: pizzaProps["data"];
  handleAction: () => Promise<void>;
}) => {
  return (
    <div className="text-sm bg-secondary p-4 rounded-md">
      <div className="flex flex-col items-center gap-4">
        <Image
          src={data.image}
          alt={data.name}
          width={200}
          height={200}
          className="w-full mb-3 rounded-md"
        />
        <h2 className="text-lg font-bold">{data.name}</h2>
        <p className="text-2xl font-extrabold text-primary mb-2">
          {decimalToMoney(data.price)}
          <span className="text-base font-medium text-muted-foreground ml-1">/unid.</span>
        </p>
        <ul className="mb-3 flex flex-wrap gap-1 justify-center">
          {data.ingredients && data.ingredients
            .split(",")
            .map((ingredient) => ingredient.trim())
            .filter(Boolean)
            .map((ingredient, idx) => (
              <li
          key={idx}
          className="bg-muted px-2 py-0.5 rounded text-xs text-muted-foreground"
              >
          ✅ {ingredient}
              </li>
            ))}
        </ul>
        <div className="text-center">
          <Button onClick={handleAction}>Adicionar ao Carrinho</Button>
        </div>
      </div>
    </div>
  );
};