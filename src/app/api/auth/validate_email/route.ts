import { hasEmail } from "@/app/services/auth";
import { NextResponse } from "next/server";
import { z } from "zod";

// Schema simples para validar formato de e-mail
const EmailSchema = z.object({ email: z.string().email("E-mail inválido") });

export async function POST(request: Request) {
  try {
    const url = new URL(request.url);
    const mode = url.searchParams.get("mode") || "detect"; // detect | signup | signin

    const body = await request.json().catch(() => ({}));
    const parsed = EmailSchema.safeParse(body);

    if (!parsed.success) {
      console.warn("[validate_email] payload inválido", parsed.error.flatten());
      return NextResponse.json(
        { exists: false, message: parsed.error.flatten().formErrors[0] || "E-mail obrigatório" },
        { status: 400 }
      );
    }

    const email = parsed.data.email.toLowerCase();

    const exists = await hasEmail(email);

    // Regras de conflito opcionais por modo
    if (mode === "signup" && exists) {
      return NextResponse.json(
        { exists, message: "E-mail já cadastrado" },
        { status: 409 }
      );
    }
    if (mode === "signin" && !exists) {
      return NextResponse.json(
        { exists, message: "E-mail não encontrado" },
        { status: 409 }
      );
    }

    // Comportamento padrão: sempre 200 com exists
    return NextResponse.json(
      { exists, message: exists ? "E-mail cadastrado" : "E-mail disponível" },
      { status: 200 }
    );
  } catch (err) {
    console.error("[validate_email] erro inesperado", err);
    return NextResponse.json(
      { exists: false, message: "Erro interno ao validar e-mail" },
      { status: 500 }
    );
  }
}
