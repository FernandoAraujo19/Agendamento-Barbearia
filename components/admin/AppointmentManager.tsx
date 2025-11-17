import React from 'react';
import type { Appointment } from '../../types';
import { TrashIcon } from '../Icons';

interface AppointmentManagerProps {
    appointments: Appointment[];
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
}

export const AppointmentManager: React.FC<AppointmentManagerProps> = ({ appointments, setAppointments }) => {

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
            setAppointments(prev => prev.filter(app => app.id !== id));
        }
    };
    
    return (
        <div className="bg-brand-dark p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-brand-primary mb-6 text-center">Gerenciar Agendamentos</h3>
            {appointments.length > 0 ? (
                <div className="space-y-4">
                    {appointments.map(app => (
                        <div key={app.id} className="bg-brand-secondary p-4 rounded-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="flex items-center gap-4">
                                <img src={app.barber.imageUrl} alt={app.barber.name} className="w-12 h-12 rounded-full object-cover hidden sm:block"/>
                                <div>
                                    <p className="font-bold text-lg text-brand-light">{app.service.name}</p>
                                    <p className="text-sm text-gray-400">Cliente: {app.customerName} ({app.customerPhone})</p>
                                    <p className="text-sm text-gray-400">Barbeiro: {app.barber.name}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 w-full sm:w-auto">
                                <div className="text-left sm:text-right flex-grow">
                                     <p className="font-semibold text-brand-primary">
                                        {app.date.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}
                                        {' às '}
                                        {app.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </p>
                                </div>
                                <button 
                                    onClick={() => handleDelete(app.id)} 
                                    className="p-2 text-red-500 hover:text-red-400 bg-red-500/10 rounded-full hover:bg-red-500/20 transition-colors"
                                    aria-label="Cancelar agendamento"
                                >
                                    <TrashIcon className="w-5 h-5"/>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-12">
                    <h4 className="text-xl text-brand-light">Nenhum agendamento futuro.</h4>
                    <p className="text-gray-400 mt-2">A agenda está livre.</p>
                </div>
            )}
        </div>
    );
};
