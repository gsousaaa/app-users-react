import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { passwordSchema, type PasswordFormType } from "../../schemas/changePasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { update, resetPassword } from "../../clients/api"; // importe as funções
import { toast } from "react-toastify";

const Profile = () => {
    const navigate = useNavigate();
    const { user, logout, setUser } = useAuth(); // setUser para atualizar contexto após update

    const [editModalOpen, setEditModalOpen] = useState(false);
    const [passwordModalOpen, setPasswordModalOpen] = useState(false);

    const [name, setName] = useState(user?.name ?? "");
    const [email, setEmail] = useState(user?.email ?? "");

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<PasswordFormType>({
        resolver: zodResolver(passwordSchema),
    });

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    // Função que chama a API para atualizar nome/email
    const handleEditSave = async () => {
        if (!user) return;

        try {
            const updatedUser = await update(Number(user.id), { name, email });
            setUser(updatedUser); // Atualiza contexto
            setEditModalOpen(false);
        } catch (error) {
            toast.error("Erro ao atualizar usuário");
        }
    };

    // Função que chama a API para resetar a senha
    const onChangePassword = async (data: PasswordFormType) => {
        if (!user) return;

        try {
            await resetPassword(data.password);
            toast.success("Senha alterada com sucesso!");
            reset();
            setPasswordModalOpen(false);
        } catch (error) {
            toast.error("Erro ao alterar a senha");
        }
    };

    return (
        <div className="relative h-screen flex items-center justify-center bg-gray-100">
            <button
                onClick={handleLogout}
                className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
                Logout
            </button>
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Perfil</h2>

                <p className="mb-2">
                    <strong>Nome:</strong> {user?.name}
                </p>
                <p className="mb-4">
                    <strong>Email:</strong> {user?.email}
                </p>

                <button
                    onClick={() => setEditModalOpen(true)}
                    className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 mb-4"
                >
                    Editar Cadastro
                </button>

                <button
                    onClick={() => setPasswordModalOpen(true)}
                    className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700"
                >
                    Alterar Senha
                </button>
            </div>

            {/* Modal: Editar Cadastro */}
            {editModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h3 className="text-xl font-semibold mb-4 text-center">Editar Cadastro</h3>

                        <label className="block text-sm font-medium mb-1">Nome</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full px-3 py-2 border rounded mb-3"
                        />

                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border rounded mb-4"
                        />

                        <div className="flex justify-between">
                            <button
                                onClick={handleEditSave}
                                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                            >
                                Salvar
                            </button>
                            <button
                                onClick={() => setEditModalOpen(false)}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
                            >
                                Cancelar
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Modal: Alterar Senha */}
            {passwordModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm">
                        <h3 className="text-xl font-semibold mb-4 text-center">Alterar Senha</h3>

                        <form onSubmit={handleSubmit(onChangePassword)}>
                            <label className="block text-sm font-medium mb-1">Nova Senha</label>
                            <input
                                type="password"
                                {...register("password")}
                                className="w-full px-3 py-2 border rounded mb-1"
                            />
                            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

                            <label className="block text-sm font-medium mb-1 mt-4">Confirmar Senha</label>
                            <input
                                type="password"
                                {...register("confirmPassword")}
                                className="w-full px-3 py-2 border rounded mb-1"
                            />
                            {errors.confirmPassword && (
                                <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>
                            )}

                            <div className="flex justify-between mt-5">
                                <button
                                    type="submit"
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                                >
                                    Confirmar
                                </button>
                                <button
                                    type="button"
                                    onClick={() => {
                                        reset();
                                        setPasswordModalOpen(false);
                                    }}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-gray-400"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Profile;
