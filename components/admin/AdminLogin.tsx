
import React, { useState } from 'react';

interface AdminLoginProps {
  onSuccess: () => void;
  onCancel: () => void;
  adminPassword?: string;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onCancel, adminPassword }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === adminPassword) {
      onSuccess();
    } else {
      setError('Senha incorreta. Tente novamente.');
      setPassword('');
    }
  };

  return (
    <div className="max-w-md mx-auto bg-brand-secondary p-8 rounded-2xl shadow-2xl shadow-black/30">
      <h2 className="text-3xl font-serif text-brand-primary text-center mb-6">Acesso Restrito</h2>
      <p className="text-center text-gray-400 mb-6">Por favor, insira a senha de administrador para continuar.</p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="sr-only">Senha</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value);
                setError('');
            }}
            required
            placeholder="Senha"
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-3 px-4 text-white focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
        {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-brand-primary text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors"
          >
            Entrar
          </button>
        </div>
      </form>
    </div>
  );
};
