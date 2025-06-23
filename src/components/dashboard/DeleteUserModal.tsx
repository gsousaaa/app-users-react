interface DeleteProps {
    userName: string
    onConfirm: () => void
    onCancel: () => void
}

export const DeleteUserModal = ({ userName, onConfirm, onCancel }: DeleteProps) => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-sm text-center">
            <h2 className="text-xl font-semibold text-red-600 mb-4">Confirmar Exclusão</h2>
            <p className="mb-6">
                Tem certeza que deseja excluir <strong>{userName}</strong>?
            </p>
            <div className="flex justify-center gap-4">
                <button
                    onClick={onConfirm}
                    className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                    Sim, excluir
                </button>
                <button
                    onClick={onCancel}
                    className="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded"
                >
                    Cancelar
                </button>
            </div>
        </div>
    </div>
)