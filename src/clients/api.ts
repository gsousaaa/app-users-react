import axios, { AxiosError } from 'axios'
import Cookies from 'js-cookie'

// Exibe a URL base para debug
console.log(import.meta.env.VITE_API_URL)

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Intercepta requisições para adicionar o token JWT
api.interceptors.request.use(
  (config) => {
    const token = Cookies.get('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Intercepta respostas para tratar erros globais
api.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    // Erro de rede (ex: servidor caiu, CORS, timeout etc.)
    if (!error.response) {
      console.error('Erro de rede:', error.message)
      return Promise.reject(new Error('Erro de conexão com o servidor'))
    }

    // Erro 401: não autorizado
    if (error.response.status === 401) {
      return Promise.reject({ ...error, unauthorized: true })
    }

    return Promise.reject(error)
  }
)



export const loginUser = async (email: string, password: string) => {
  try {
    const response = await api.post('/auth/login', { email, password })
    return response.data
  } catch (err: any) {
    const error = err as AxiosError
    if (error.response?.status === 400) {
      throw new Error('Email e/ou senha incorretos!')
    }
    throw new Error('Erro ao fazer login')
  }
}

export const registerUser = async (email: string, password: string, name: string) => {
  try {
    const response = await api.post('/auth/register', { email, password, name })
    return response.data
  } catch (err: any) {
    const error = err as AxiosError

    const msg = error.response?.data?.message
    if (error.response?.status === 400) {
      if (Array.isArray(msg)) {
        throw new Error(msg[0])
      }
      if (typeof msg === 'string') {
        throw new Error(msg)
      }
    }

    throw new Error('Erro ao fazer cadastro')
  }
}

export const findAllUsers = async () => {
  try {
    const response = await api.get('/users')
    return response.data
  } catch (err: any) {
    throw new Error('Erro ao buscar usuários')
  }
}

export const update = async (
  id: number,
  data: { email?: string; name?: string; role?: string }
) => {
  try {
    const response = await api.patch(`/users/${id}`, data)
    return response.data
  } catch (err: any) {
    const error = err as AxiosError
    const msg = error.response?.data?.message

    if (error.response?.status === 400) {
      if (Array.isArray(msg)) throw new Error(msg[0])
      if (typeof msg === 'string') throw new Error(msg)
    }

    throw new Error('Erro ao atualizar usuário')
  }
}

export const deleteUser = async (id: number) => {
  try {
    const response = await api.delete(`/users/${id}`)
    return response.data
  } catch (err: any) {
    const error = err as AxiosError
    const msg = error.response?.data?.message

    if (error.response?.status === 400) {
      if (Array.isArray(msg)) throw new Error(msg[0])
      if (typeof msg === 'string') throw new Error(msg)
    }

    throw new Error('Erro ao deletar usuário')
  }
}

export const resetPassword = async (password: string) => {
  try {
    const response = await api.patch('/users/password-change', { password })
    return response.data
  } catch (err: any) {
    const error = err as AxiosError
    const msg = error.response?.data?.message

    if (error.response?.status === 400) {
      if (Array.isArray(msg)) throw new Error(msg[0])
      if (typeof msg === 'string') throw new Error(msg)
    }

    throw new Error('Erro ao alterar senha')
  }
}
