import { createUserToken, validateUser } from "@/app/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      {
        error: "campos incompletos",
      },
      {
        status: 400,
      }
    );
  }

  const user = await validateUser({
    email,
    password,
  });
  if (!user) {
    return NextResponse.json(
      {
        error: "email ou senha inválidos",
      },
      {
        status: 400,
      }
    );
  }

  const token = await createUserToken(Number(user.id));
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
        id: user.id,
        name: user.name,
        email: user.email,
      },
    },
    {
      status: 201,
    }
  );
}