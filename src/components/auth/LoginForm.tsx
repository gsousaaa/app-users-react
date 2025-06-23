// src/components/auth/LoginForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { loginSchema, type LoginType } from '../../schemas/loginSchema'
import { useNavigate } from 'react-router-dom'


interface Props {
    onLogin: (data: LoginType) => void
}

export const LoginForm = ({ onLogin }: Props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginType>({
        resolver: zodResolver(loginSchema),
    })

    const navigate = useNavigate()

    const handleRegister = () => {
        navigate('/register')
    }

    return (
        <form onSubmit={handleSubmit(onLogin)} className="bg-white px-8 py-12 rounded-3xl shadow-2xl font-sans">
            <h1 className="text-2xl font-semibold text-center text-gray-800 mb-6">Login</h1>
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
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-3"
            >
                Entrar
            </button>

             <p className='flex justify-center mb-2 text-blue-500'>Não tem uma conta?</p>

            <button onClick={handleRegister}
                type="button"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Registre-se
            </button>
        </form>
    )
}
