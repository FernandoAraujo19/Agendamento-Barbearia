
import React from 'react';
import type { Appointment } from '../types';

interface AppointmentListProps {
  appointments: Appointment[];
  onCancel: (id: number) => void;
  onNew: () => void;
}

export const AppointmentList: React.FC<AppointmentListProps> = ({ appointments, onCancel, onNew }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-serif text-brand-primary">Meus Agendamentos</h2>
        <button 
          onClick={onNew}
          className="bg-brand-primary text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors"
        >
            Novo Agendamento
        </button>
      </div>

      {appointments.length > 0 ? (
        <div className="space-y-4">
          {appointments.map((app) => (
            <div key={app.id} className="bg-brand-secondary p-5 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg shadow-black/20">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                  <img src={app.barber.imageUrl} alt={app.barber.name} className="w-16 h-16 rounded-full object-cover"/>
                  <div>
                    <p className="font-bold text-xl text-brand-light">{app.service.name}</p>
                    <p className="text-gray-400">com {app.barber.name}</p>
                    <p className="text-brand-primary font-semibold">
                      {app.date.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long' })}
                      {' às '}
                      {app.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
              </div>
              <div className="flex items-center gap-4 w-full md:w-auto">
                <div className="text-right flex-grow">
                    <p className="text-sm text-gray-300">{app.customerName}</p>
                    <p className="text-xs text-gray-500">{app.customerPhone}</p>
                </div>
                <button
                  onClick={() => onCancel(app.id)}
                  className="bg-red-800/50 text-red-300 text-xs font-bold py-2 px-3 rounded-md hover:bg-red-800 hover:text-white transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center bg-brand-secondary py-12 px-6 rounded-lg">
          <h3 className="text-xl text-brand-light">Nenhum agendamento encontrado.</h3>
          <p className="text-gray-400 mt-2">Que tal agendar seu próximo corte agora?</p>
        </div>
      )}
    </div>
  );
};
