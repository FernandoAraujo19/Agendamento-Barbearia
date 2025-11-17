import React, { useState, useEffect } from 'react';
import { ClockIcon } from '../Icons';
// FIX: The DayHours type is exported from `../../types`, not `../../App`.
import type { DayHours } from '../../types';

interface SettingsManagerProps {
    schedule: DayHours[];
    setSchedule: React.Dispatch<React.SetStateAction<DayHours[]>>;
}

const WEEK_DAYS = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

export const SettingsManager: React.FC<SettingsManagerProps> = ({ schedule, setSchedule }) => {
    const [localSchedule, setLocalSchedule] = useState(schedule);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setLocalSchedule(schedule);
    }, [schedule]);
    
    const handleDayUpdate = (dayIndex: number, field: keyof DayHours, value: any) => {
        setLocalSchedule(prev => prev.map(day => 
            day.dayOfWeek === dayIndex ? { ...day, [field]: value } : day
        ));
        setSaved(false);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSchedule(localSchedule);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000); // Hide message after 2 seconds
    };

    const hourOptions = Array.from({ length: 24 }, (_, i) => {
        const hour = String(i).padStart(2, '0');
        return <option key={i} value={i}>{`${hour}:00`}</option>;
    });

    return (
        <div className="bg-brand-dark p-8 rounded-lg max-w-4xl mx-auto">
            <div className="text-center mb-8">
                <ClockIcon className="w-12 h-12 text-brand-primary mx-auto mb-4" />
                <h3 className="text-2xl font-serif text-brand-primary mb-2">Configurações de Horário</h3>
                <p className="text-gray-400">Defina o expediente para cada dia da semana.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                    {WEEK_DAYS.map((dayName, index) => {
                        const dayConfig = localSchedule.find(d => d.dayOfWeek === index);
                        if (!dayConfig) return null;

                        return (
                            <div key={index} className="bg-brand-secondary p-4 rounded-lg">
                                <div className="flex justify-between items-center mb-4">
                                    <h4 className="text-xl font-semibold text-brand-light">{dayName}</h4>
                                    <div className="flex items-center gap-3">
                                        <span className={`text-sm font-medium ${dayConfig.isOpen ? 'text-green-400' : 'text-gray-500'}`}>
                                            {dayConfig.isOpen ? 'Aberto' : 'Fechado'}
                                        </span>
                                        <button
                                            type="button"
                                            onClick={() => handleDayUpdate(index, 'isOpen', !dayConfig.isOpen)}
                                            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${dayConfig.isOpen ? 'bg-brand-primary' : 'bg-gray-600'}`}
                                        >
                                            <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${dayConfig.isOpen ? 'translate-x-6' : 'translate-x-1'}`} />
                                        </button>
                                    </div>
                                </div>
                                {dayConfig.isOpen && (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 border-t border-gray-700 pt-4">
                                        {/* Horário de Atendimento */}
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-300">Atendimento</p>
                                            <div className="flex items-center gap-2">
                                                <select name="opening" value={dayConfig.opening} onChange={(e) => handleDayUpdate(index, 'opening', parseInt(e.target.value))} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary">
                                                    {hourOptions}
                                                </select>
                                                <span>às</span>
                                                <select name="closing" value={dayConfig.closing} onChange={(e) => handleDayUpdate(index, 'closing', parseInt(e.target.value))} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary">
                                                    {hourOptions}
                                                </select>
                                            </div>
                                        </div>
                                        {/* Horário de Almoço */}
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-gray-300">Almoço</p>
                                            <div className="flex items-center gap-2">
                                                 <select name="lunchStart" value={dayConfig.lunchStart} onChange={(e) => handleDayUpdate(index, 'lunchStart', parseInt(e.target.value))} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary">
                                                    {hourOptions}
                                                </select>
                                                <span>às</span>
                                                <select name="lunchEnd" value={dayConfig.lunchEnd} onChange={(e) => handleDayUpdate(index, 'lunchEnd', parseInt(e.target.value))} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary">
                                                    {hourOptions}
                                                </select>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )
                    })}
                </div>
                
                <div className="pt-4 text-right">
                    <button type="submit" className="bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors w-full sm:w-auto">
                        Salvar Todas as Configurações
                    </button>
                </div>
                 {saved && <p className="text-green-400 text-center mt-4">Configurações salvas com sucesso!</p>}
            </form>
        </div>
    );
};