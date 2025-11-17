
import React from 'react';
import type { Barber } from '../types';

interface BarberSelectorProps {
  barbers: Barber[];
  onSelectBarber: (barber: Barber) => void;
  onBack: () => void;
}

export const BarberSelector: React.FC<BarberSelectorProps> = ({ barbers, onSelectBarber, onBack }) => {
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {barbers.map((barber) => (
          <button
            key={barber.id}
            onClick={() => onSelectBarber(barber)}
            className="group flex flex-col items-center space-y-3 p-4 bg-brand-dark rounded-lg transition-all transform hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <img
              src={barber.imageUrl}
              alt={barber.name}
              className="w-32 h-32 rounded-full object-cover border-4 border-transparent group-hover:border-brand-primary transition-all"
            />
            <h3 className="text-lg font-semibold text-brand-light">{barber.name}</h3>
          </button>
        ))}
      </div>
       <div className="mt-8 text-center">
        <button
          onClick={onBack}
          className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors"
        >
          Voltar
        </button>
      </div>
    </div>
  );
};
