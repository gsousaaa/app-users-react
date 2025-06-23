import axios, { AxiosError } from "axios";
import Cookies from 'js-cookie'

export const api = axios.create({
    baseURL: import.meta.env.BASE_URL,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
})

api.interceptors.request.use(config => {
    const token = Cookies.get('token')
    if (token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, error => {
    return Promise.reject(error)
})

// api.ts
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response.status === 401) {
            // só lança o erro, não navega aqui
            return Promise.reject({ ...error, unauthorized: true })
        }
        return Promise.reject(error)
    }
)


export const loginUser = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', {
            email: email,
            password: password
        })

        return response.data
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 400) {
                throw new Error('Email e/ou senha incorretos!')
            }
            throw new Error('Erro ao fazer login')
        }

        throw err
    }
}

export const registerUser = async (email: string, password: string, name: string) => {
    try {
        const response = await api.post('/auth/register', {
            email: email,
            password: password,
            name
        })

        return response.data
    } catch (err) {
        if (err instanceof AxiosError) {
            if (err.response?.status === 400 && err.response.data.message && Array.isArray(err.response.data.message)) {
                throw new Error(err.response.data.message[0])
            }


            if (err.response?.status === 400 && err.response.data.message) {
                throw new Error(err.response.data.message)
            }


            throw new Error('Erro ao fazer cadastro')
        }

        throw err
    }
}

export const findAllUsers = async () => {
    try {
        const response = await api.get('/users')

        return response.data
    } catch (err) {
        throw new Error('Erro ao buscar users')
    }
}

export const update = async (id: number, data: { email?: string, name?: string, role?: string }) => {
    try {
        const response = await api.patch(`/users/${id}`, data)

        return response.data
    } catch (err) {
        throw new Error('Erro ao atualizar usuario')
    }
}

export const deleteUser = async (id: number) => {
    try {
        const response = await api.delete(`/users/${id}`)

        return response.data
    } catch (err) {
        throw new Error('Erro ao deletar usuario')
    }
}

export const resetPassword = async (password: string) => {
    try {
        const response = await api.patch(`/users/password-reset`, {
            password
        })

        return response.data
    } catch (err) {
        throw new Error('Erro ao alterar senha')
    }
}