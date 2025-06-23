// pages/AdminDashboard/AdminUsers.tsx
import { useEffect, useState } from 'react'
import { DeleteUserModal } from '../../components/dashboard/DeleteUserModal'
import { UserTable } from '../../components/dashboard/UserTable'
import { HeaderActions } from '../../components/dashboard/HeaderActions'
import { deleteUser, findAllUsers, update } from '../../clients/api'
import { EditUserModal } from '../../components/dashboard/EditUserModal'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([])
  const [editingUser, setEditingUser] = useState<User | null>(null)
  const [userToDelete, setUserToDelete] = useState<User | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'user',
  })

  useEffect(() => {
    findAllUsers().then(setUsers)
  }, [])

  const openEditModal = (user: User) => {
    setEditingUser(user)
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
    })
  }

  const closeEditModal = () => setEditingUser(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSave = async () => {
    if (!editingUser) return

    const updatedUser: User = {
      ...editingUser,
      ...formData,
    }

    await update(updatedUser.id, {email: updatedUser.email, name: updatedUser.name, role: updatedUser.role})
    setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)))
    closeEditModal()
  }

  const handleDeleteClick = (user: User) => {
    setUserToDelete(user)
  }

  const confirmDelete = async () => {
    if (!userToDelete) return
    await deleteUser(userToDelete.id)
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id))
    setUserToDelete(null)
  }

  const cancelDelete = () => setUserToDelete(null)

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <HeaderActions />
      <h1 className="text-3xl mb-6 font-bold">Admin - Usuários</h1>
      <UserTable users={users} onEdit={openEditModal} onDelete={handleDeleteClick} />

      {editingUser && (
        <EditUserModal
          name={formData.name}
          email={formData.email}
          role={formData.role}
          onChange={handleChange}
          onSave={handleSave}
          onClose={closeEditModal}
        />
      )}

      {userToDelete && (
        <DeleteUserModal
          userName={userToDelete.name}
          onConfirm={confirmDelete}
          onCancel={cancelDelete}
        />
      )}
    </div>
  )
}
