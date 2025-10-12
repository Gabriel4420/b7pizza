import { hasEmail } from "@/app/services/auth";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email } = await request.json();

  if (!email) return NextResponse.json({ exists: false }, { status: 400 });

  const user = await hasEmail(email);

  if (!user) {
    return NextResponse.json(
      {
        exists: false,
      },
      {
        status: 409,
      }
    );
  }
  return Response.json(
    {
      exists: true,
    },
    {
      status: 200,
    }
  );
}
