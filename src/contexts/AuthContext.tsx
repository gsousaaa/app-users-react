import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import Cookies from 'js-cookie'
import { jwtDecode } from 'jwt-decode'

interface User {
    id: string
    name: string
    email: string
    role: string
    exp: number
    iat: number
}

interface AuthContextProps {
    user: User | null
    token: string | null
    login: (token: string) => void
    logout: () => void
    isAuthenticated: boolean,
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const logout = () => {
        Cookies.remove('token')
        setToken(null)
        setUser(null)
    }

    const login = (newToken: string) => {
        const decoded: User = jwtDecode(newToken)

        Cookies.set('token', newToken, { expires: 1 / 24 })

        setToken(newToken)
        setUser(decoded)
    }

    useEffect(() => {
        const storedToken = Cookies.get('token')
        if (storedToken) {
            try {
                const decoded: User = jwtDecode(storedToken)
                setToken(storedToken)
                setUser(decoded)
            } catch {
                logout()
            }
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, token, login, logout, isAuthenticated: !!token, setUser }}> {children} </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
