// components/HeaderActions.tsx
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export const HeaderActions = () => {
  const navigate = useNavigate()
  const { logout } = useAuth()

  return (
    <div className="flex justify-end items-center mb-6 space-x-4">
      <button
        onClick={() => navigate('/profile')}
        className="bg-gray-300 hover:bg-gray-400 text-gray-900 px-4 py-2 rounded"
      >
        Meu Perfil
      </button>
      <button
        onClick={() => {
          logout()
          navigate('/login')
        }}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  )
}