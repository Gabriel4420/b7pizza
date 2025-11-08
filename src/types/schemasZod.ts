import z from 'zod'
export const LoginStepEmailSchema = z.object({
  email: z.string().email('E-mail Inválido'),
});