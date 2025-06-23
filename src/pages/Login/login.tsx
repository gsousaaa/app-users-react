import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { LoginForm } from '../../components/auth/LoginForm'
import { useState } from 'react'
import { type LoginType } from '../../schemas/loginSchema'
import { useAuth } from '../../contexts/AuthContext.tsx'
import { loginUser } from '../../clients/api.ts'

const Login = () => {
    const navigate = useNavigate()
    const { login, user } = useAuth()
    const [loading, setLoading] = useState(false)

    const handleLogin = async (data: LoginType) => {
        setLoading(true)

        try {
            const response = await loginUser(data.email, data.password)
         
            const token = response.accessToken
    
            if (!token) {
                toast.error('Token inválido na resposta.')
                return
            }

            login(token) // salva no contexto e cookies

            if (user?.role === 'user') {
                toast.success(`Login realizado com sucesso!, seja bem-vindo, ${user?.name}`)
                navigate('/profile')
            }

            if (user?.role === 'admin') {
                toast.success(`Seja bem-vindo a área do administrador`)
                navigate('/admin/users')
            }

        } catch (error: any) {
            toast.error(
                error?.response?.data?.message || 'Erro ao fazer login. Verifique suas credenciais.'
            )
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="p-10 rounded w-[90%] max-w-md">
                <LoginForm onLogin={handleLogin} />
            </div>
        </div>
    )
}

export default Login
