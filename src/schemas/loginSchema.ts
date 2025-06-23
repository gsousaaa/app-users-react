import { z } from 'zod'

export const loginSchema = z.object({
    email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
    password: z.string().min(1, 'Senha obrigatória'),
})

export type LoginType = z.infer<typeof loginSchema>
