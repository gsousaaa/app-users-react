import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useState } from 'react'
import { useAuth } from '../../contexts/AuthContext.tsx'
import {  registerUser } from '../../clients/api.ts'
import { RegisterForm } from '../../components/auth/RegisterForm.tsx'
import type { RegisterType } from '../../schemas/registerSchema.ts'

const Register = () => {
    const navigate = useNavigate()
    const { login, user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleLogin = async (data: RegisterType) => {
        setLoading(true)

        try {
            const response = await registerUser(data.email, data.password, data.name)

            const token = response.accessToken

            if (!token) {
                toast.error('Token inválido na resposta.')
                return
            }

            login(token) // salva no contexto e cookies

            if (user?.role === 'user') {
                toast.success(`Cadastro realizado com sucesso!, seja bem-vindo, ${user?.name}`)
                navigate('/profile')
            }
        } catch (error: any) {
            toast.error(
                error.message || error.message[0] || 'Erro ao se cadastrar. Tente novamente mais tarde.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-10 rounded w-[90%] max-w-md">
                <RegisterForm onRegister={handleLogin} />
            </div>
        </div>
    )
}

export default Register
