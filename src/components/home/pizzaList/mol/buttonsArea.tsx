import { decimalToMoney } from "@/lib/utils";

export const ButtonsAreaPizzaGrid = ({ pizza, handleAddToCart }: any) => (
  <div className="flex justify-between items-center mt-4">
    <span className="text-lg font-semibold text-gray-800">
      {decimalToMoney(pizza.price)}
    </span>
    <button
      onClick={() => handleAddToCart(pizza)}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
    >
      Adicionar ao carrinho
    </button>
  </div>
);