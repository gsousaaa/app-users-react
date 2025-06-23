// src/components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { registerSchema, type RegisterType } from '../../schemas/registerSchema'


interface Props {
    onRegister: (data: RegisterType) => void
}

export const RegisterForm = ({ onRegister }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterType>({
        resolver: zodResolver(registerSchema),
    })

    return (
        <form onSubmit={handleSubmit(onRegister)} className="bg-white px-8 py-12 rounded-3xl shadow-2xl font-sans">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Cadastre-se</h1>
            <div className='mb-5'>
                <label className="block text-sm font-medium">Name</label>
                <input
                    type="text"
                    {...register('name')}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div className='mb-5'>
                <label className="block text-sm font-medium">E-mail</label>
                <input
                    type="email"
                    {...register('email')}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                )}
            </div>

            <div className='mb-5'>
                <label className="block text-sm font-medium">Senha</label>
                <input
                    type="password"
                    {...register('password')}
                    className="w-full px-3 py-2 border rounded"
                />
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                )}
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
            >
                Entrar
            </button>
        </form>
    )
}
