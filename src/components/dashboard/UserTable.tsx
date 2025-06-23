interface User {
    id: number
    name: string
    email: string
    role: string
}

interface Props {
    users: User[]
    onEdit: (user: User) => void
    onDelete: (user: User) => void
}

export const UserTable = ({ users, onEdit, onDelete }: Props) => {
    return (
        <table className="w-full border-collapse border border-gray-300">
            <thead>
                <tr className="bg-gray-100">
                    <th className="border border-gray-300 p-2 text-left">Nome</th>
                    <th className="border border-gray-300 p-2 text-left">Email</th>
                    <th className="border border-gray-300 p-2 text-left">Cargo</th>
                    <th className="border border-gray-300 p-2 text-left">Ações</th>
                </tr>
            </thead>
            <tbody>
                {users.map((user) => (
                    <tr key={user.id} className="hover:bg-gray-50">
                        <td className="border border-gray-300 p-2">{user.name}</td>
                        <td className="border border-gray-300 p-2">{user.email}</td>
                        <td className="border border-gray-300 p-2">{user.role}</td>
                        <td className="border border-gray-300 p-2 space-x-2">
                            <button
                                onClick={() => onEdit(user)}
                                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(user)}
                                className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                            >
                                Excluir
                            </button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}