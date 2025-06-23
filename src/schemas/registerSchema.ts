import { z } from 'zod'

export const registerSchema = z.object({
    name: z.string().min(1, 'Nome obrigatório'),
    email: z.string().min(1, 'E-mail obrigatório').email('E-mail inválido'),
    password: z.string().min(1, 'Senha obrigatória'),
})

export type RegisterType = z.infer<typeof registerSchema>
