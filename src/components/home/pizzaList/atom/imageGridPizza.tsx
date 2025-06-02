import Image from "next/image";
export const ImageGridPizza = ({ pizza }: any) => (
  <Image
    src={pizza.image}
    alt={pizza.name}
    width={300}
    height={200}
    className="w-full h-32 object-cover rounded-t-lg"
  />
);
