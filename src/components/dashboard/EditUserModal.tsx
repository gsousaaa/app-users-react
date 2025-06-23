import { ChangeEvent } from 'react'

interface Props {
  name: string
  email: string
  role: string
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
  onSave: () => void
  onClose: () => void
}

export const EditUserModal = ({ name, email, role, onChange, onSave, onClose }: Props) => (
  <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div className="bg-white rounded-lg p-6 w-full max-w-md">
      <h2 className="text-xl font-semibold mb-4">Editar Usuário</h2>

      <label className="block mb-2 font-medium">Nome</label>
      <input
        name="name"
        value={name}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        type="text"
      />

      <label className="block mb-2 font-medium">Email</label>
      <input
        name="email"
        value={email}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
        type="email"
      />

      <label className="block mb-2 font-medium">Cargo</label>
      <select
        name="role"
        value={role}
        onChange={onChange}
        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
      >
        <option value="user">Usuário</option>
        <option value="admin">Administrador</option>
      </select>

      <div className="flex justify-end space-x-3">
        <button
          onClick={onSave}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Salvar
        </button>
        <button
          onClick={onClose}
          className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  </div>
)
