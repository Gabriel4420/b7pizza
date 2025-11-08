# 🍕 b7pizza

Bem-vindo ao **b7pizza**!  
Um sistema completo de pizzaria online, desenvolvido com **Next.js**, **Supabase Auth (SSR)** e **Bootstrap**.  
Aqui você encontra uma solução moderna para pedidos, autenticação segura e uma interface responsiva para clientes e administradores.

---
<p align="center">
   <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/Gabriel4420/b7pizza">

  <img alt="GitHub top language" src="https://img.shields.io/github/languages/top/Gabriel4420/b7pizza?logo=html">

  <img alt="GitHub repo size in bytes" src="https://img.shields.io/github/repo-size/Gabriel4420/b7pizza?color=green">

  <br>
  
  <a href="https://www.codacy.com/manual/Gabriel4420/b7pizza?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=Gabriel4420/b7pizza&amp;utm_campaign=Badge_Grade">
    <img src="https://app.codacy.com/project/badge/Grade/6dd6b46abeb14e99935a2b9ac5c6ede2"/>
  </a>
  
  <img alt="GitHub code size in bytes" src="https://img.shields.io/github/last-commit/Gabriel4420/b7pizza">

  <a href="https://www.linkedin.com/in/gabriel-rodrigues-perez-2069b072/">
    <img alt="Made by Gabriel" src="https://img.shields.io/badge/made%20by-Gabriel-%2304D361">
  </a>
</p>
---

## 🚀 Sobre o Projeto

O **b7pizza** é uma aplicação web para pizzarias que desejam gerenciar pedidos online, autenticação de usuários e administração de produtos de forma simples e eficiente.  
O projeto foi criado para demonstrar as melhores práticas de autenticação SSR com Supabase, integração com Next.js e estilização com Bootstrap.

---

## 🛠️ Tecnologias Utilizadas

- ⚡ [Next.js](https://nextjs.org/) — Framework React para aplicações web modernas
- 🔐 [Supabase Auth SSR](https://supabase.com/docs/guides/auth/server-side) — Autenticação segura com cookies e SSR
- 🎨 [Bootstrap](https://getbootstrap.com/) — Interface responsiva e elegante

---

## 🔑 Autenticação com Supabase (SSR)

A autenticação é feita via Supabase, utilizando Server-Side Rendering (SSR) para máxima segurança e persistência de sessão.  
**Cookies são manipulados apenas com os métodos recomendados para evitar problemas de sessão.**

---

## ⚙️ Como Configurar

### 1️⃣ Instale as dependências

```bash
npm install @supabase/supabase-js @supabase/ssr
```

### 2️⃣ Configure as variáveis de ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
```

---

## 🧩 Utilitários Supabase

### 🌐 Cliente Browser

```typescript
import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
```

### 🖥️ Cliente Server

```typescript
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const cookieStore = await cookies()

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            )
          } catch {
            // Ignorar em Server Component
          }
        },
      },
    }
  )
}
```

---

## 🛡️ Middleware para Refresh de Sessão

```typescript
import { createServerClient } from '@supabase/ssr'
import { NextResponse, type NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => request.cookies.set(name, value))
          supabaseResponse = NextResponse.next({
            request,
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (
    !user &&
    !request.nextUrl.pathname.startsWith('/login') &&
    !request.nextUrl.pathname.startsWith('/auth')
  ) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
```

---

## ▶️ Como rodar o projeto

```bash
npm install
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador para ver o sistema em funcionamento.

---

## 👨‍💻 Autor

<h4 align="center">
  Feito com ❤️ por Gabriel Rodrigues 👋️ <a href="mailto:gabriel_rodrigues_perez@hotmail.com">Entre em contato!</a>
</h4>

<p align="center">

  <a href="https://www.linkedin.com/in/gabriel-rodrigues-perez-2069b072/">
    <img alt="Gabriel Rodrigues Perez" src="https://img.shields.io/badge/LinkedIn-Gabriel_Rodrigues-0e76a8?style=flat&logoColor=white&logo=linkedin">
  </a>
  <a href="https://www.facebook.com/gabriel.rodrigues.perez">
    <img alt="Gabriel Rodrigues Perez" src="https://img.shields.io/badge/Facebook-Gabriel_Rodrigues-1778F2?style=flat&logoColor=white&logo=facebook">
  </a>
  <a href="https://www.instagram.com/gabriel_rodrigues_perez/">
    <img alt="Gabriel Rodrigues Perez" src="https://img.shields.io/badge/Instagram-@gabriel4420-833AB4?style=flat&logoColor=white&logo=instagram">
  </a>
  
</p>

---

🍕 **b7pizza** — Sua pizzaria online, simples e moderna!
### Endpoint: `POST /api/auth/validate_email`

- Objetivo: verificar se um e-mail já está cadastrado.
- Request Body: `{ email: string }`
- Query Param opcional `mode`:
  - `detect` (padrão): sempre retorna `200` com `{ exists: boolean, message }`.
  - `signup`: retorna `409` se o e-mail já existe (conflito ao cadastrar).
  - `signin`: retorna `409` se o e-mail não existe (conflito ao autenticar).

Exemplos de Resposta:

```
// 200
{ "exists": true, "message": "E-mail cadastrado" }

// 409 (signup)
{ "exists": true, "message": "E-mail já cadastrado" }

// 409 (signin)
{ "exists": false, "message": "E-mail não encontrado" }
```

Notas de Implementação:
- Adicionada validação de payload com `zod` e logs de servidor para facilitar diagnóstico.
- Melhorado o tratamento de erros no cliente (toast) para exibir mensagens claras.
