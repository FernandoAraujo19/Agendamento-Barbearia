
import React, { useState } from 'react';

interface SecurityManagerProps {
    adminPassword: string;
    setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
}

export const SecurityManager: React.FC<SecurityManagerProps> = ({ adminPassword, setAdminPassword }) => {
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        if (currentPassword !== adminPassword) {
            setError('A senha atual está incorreta.');
            return;
        }

        if (newPassword.length < 6) {
            setError('A nova senha deve ter pelo menos 6 caracteres.');
            return;
        }

        if (newPassword !== confirmPassword) {
            setError('A nova senha e a confirmação não correspondem.');
            return;
        }

        setAdminPassword(newPassword);
        setSuccess('Senha alterada com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setTimeout(() => setSuccess(''), 3000);
    };

    return (
        <div className="bg-brand-dark p-8 rounded-lg max-w-lg mx-auto">
            <h3 className="text-2xl font-serif text-brand-primary mb-6 text-center">Alterar Senha de Acesso</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label htmlFor="currentPassword" a className="block text-sm font-medium text-gray-300 mb-1">Senha Atual</label>
                    <input
                        type="password"
                        id="currentPassword"
                        value={currentPassword}
                        onChange={(e) => setCurrentPassword(e.target.value)}
                        required
                        className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
                <div>
                    <label htmlFor="newPassword" a className="block text-sm font-medium text-gray-300 mb-1">Nova Senha</label>
                    <input
                        type="password"
                        id="newPassword"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                        className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
                <div>
                    <label htmlFor="confirmPassword" a className="block text-sm font-medium text-gray-300 mb-1">Confirmar Nova Senha</label>
                    <input
                        type="password"
                        id="confirmPassword"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
                    />
                </div>
                
                {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                {success && <p className="text-green-400 text-sm text-center">{success}</p>}

                <div className="pt-4 text-right">
                    <button type="submit" className="bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors w-full sm:w-auto">
                        Salvar Nova Senha
                    </button>
                </div>
            </form>
        </div>
    );
};
