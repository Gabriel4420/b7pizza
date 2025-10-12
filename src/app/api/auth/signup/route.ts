import { createUser, createUserToken, hasEmail } from "@/app/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { name, email, password } = await request.json();
  if (!name || !email || !password) {
    return NextResponse.json(
      {
        error: "campos incompletos",
      },
      {
        status: 400,
      }
    );
  }

  const user = await hasEmail(email);
  if (user) {
    return NextResponse.json(
      {
        error: "email já existe",
      },
      {
        status: 400,
      }
    );
  }

  const newUser = await createUser({
    name,
    email,
    password,
  });
  if (!newUser) {
    return NextResponse.json(
      {
        error: "erro ao criar usuário",
      },
      {
        status: 400,
      }
    );
  }
  const token = await createUserToken(Number(newUser.id));
  if (!token) {
    return NextResponse.json(
      {
        error: "erro ao criar token",
      },
      {
        status: 400,
      }
    );
  }
  return NextResponse.json(
    {
      token,
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      },
    },
    {
      status: 201,
    }
  );
}