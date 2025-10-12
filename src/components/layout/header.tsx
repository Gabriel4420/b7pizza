import { cookies } from "next/headers";
import Link from "next/link";
import { LoginAreaButton } from "../login/button/login-button";
import { CartHeaderButton } from "../cart/button";

export const Header = async () => {
  const cookieStore = await cookies();

  return (
    <header className="container mx-auto my-4 flex items-center justify-between p-5 bg-secondary rounded-md">
      <Link href="/">
        <h2 className="text-2xl font-bold">B7Pizzas</h2>
      </Link>
      <div className="flex gap-2">
        <LoginAreaButton
          initialState={cookieStore.get("token") ? true : false}
        />
        <CartHeaderButton />
      </div>
    </header>
  );
};
