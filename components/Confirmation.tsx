
import React, { useState } from 'react';
import type { BookingState } from '../types';

interface ConfirmationProps {
  booking: Required<BookingState>;
  onConfirm: (customerName: string, customerPhone: string) => void;
  onBack: () => void;
}

export const Confirmation: React.FC<ConfirmationProps> = ({ booking, onConfirm, onBack }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && phone) {
      onConfirm(name, phone);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-brand-dark p-6 rounded-lg mb-6 shadow-lg">
        <h3 className="text-2xl font-serif text-brand-primary mb-4">Resumo do Agendamento</h3>
        <div className="space-y-3 text-brand-light">
          <p><strong>Serviço:</strong> {booking.service.name}</p>
          <p><strong>Barbeiro:</strong> {booking.barber.name}</p>
          <p><strong>Data:</strong> {booking.date.toLocaleDateString()}</p>
          <p><strong>Hora:</strong> {booking.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
          <p className="text-xl font-bold text-brand-primary pt-2 border-t border-gray-700 mt-3">
            Total: R$ {booking.service.price.toFixed(2)}
          </p>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Seu Nome</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-gray-300">Seu Telefone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"
          />
        </div>
        <div className="flex items-center justify-between pt-4">
          <button
            type="button"
            onClick={onBack}
            className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
          >
            Voltar
          </button>
          <button
            type="submit"
            className="bg-brand-primary text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors disabled:bg-gray-500"
            disabled={!name || !phone}
          >
            Confirmar Agendamento
          </button>
        </div>
      </form>
    </div>
  );
};
