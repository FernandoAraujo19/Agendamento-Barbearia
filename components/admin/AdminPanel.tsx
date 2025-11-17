

import React, { useState } from 'react';
// FIX: The DayHours type is exported from `../../types`, not `../../App`.
import type { Service, Barber, SiteContent, Appointment, DayHours } from '../../types';
import { ServiceManager } from './ServiceManager';
import { BarberManager } from './BarberManager';
import { SettingsManager } from './SettingsManager';
import { ContentManager } from './ContentManager';
import { AppointmentManager } from './AppointmentManager';
import { SecurityManager } from './SecurityManager';

interface AdminPanelProps {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
    barbers: Barber[];
    setBarbers: React.Dispatch<React.SetStateAction<Barber[]>>;
    schedule: DayHours[];
    setSchedule: React.Dispatch<React.SetStateAction<DayHours[]>>;
    siteContent: SiteContent;
    setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
    appointments: Appointment[];
    setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>;
    adminPassword: string;
    setAdminPassword: React.Dispatch<React.SetStateAction<string>>;
}

type AdminTab = 'services' | 'barbers' | 'settings' | 'content' | 'appointments' | 'security';

export const AdminPanel: React.FC<AdminPanelProps> = ({ 
    services, setServices, 
    barbers, setBarbers, 
    schedule, setSchedule, 
    siteContent, setSiteContent,
    appointments, setAppointments,
    adminPassword, setAdminPassword
}) => {
    const [activeTab, setActiveTab] = useState<AdminTab>('services');

    const tabItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-brand-primary text-brand-dark";
    const inactiveClasses = "text-brand-light hover:bg-brand-secondary";
    
    const renderTabContent = () => {
        switch(activeTab) {
            case 'services':
                return <ServiceManager services={services} setServices={setServices} />;
            case 'barbers':
                return <BarberManager barbers={barbers} setBarbers={setBarbers} />;
            case 'settings':
                return <SettingsManager schedule={schedule} setSchedule={setSchedule} />;
            case 'content':
                return <ContentManager siteContent={siteContent} setSiteContent={setSiteContent} />;
            case 'appointments':
                return <AppointmentManager appointments={appointments} setAppointments={setAppointments} />;
            case 'security':
                return <SecurityManager adminPassword={adminPassword} setAdminPassword={setAdminPassword} />;
            default:
                return null;
        }
    };

    return (
        <div className="max-w-6xl mx-auto bg-brand-secondary p-6 rounded-2xl shadow-2xl shadow-black/30">
            <h2 className="text-3xl font-serif text-brand-primary text-center mb-6">Painel de Administração</h2>
            <div className="flex items-center justify-center flex-wrap gap-2 bg-brand-dark p-1 rounded-lg mb-8">
                 <button
                    onClick={() => setActiveTab('services')}
                    className={`${tabItemClasses} ${activeTab === 'services' ? activeClasses : inactiveClasses}`}
                >
                    Serviços
                </button>
                <button
                    onClick={() => setActiveTab('barbers')}
                    className={`${tabItemClasses} ${activeTab === 'barbers' ? activeClasses : inactiveClasses}`}
                >
                    Barbeiros
                </button>
                <button
                    onClick={() => setActiveTab('settings')}
                    className={`${tabItemClasses} ${activeTab === 'settings' ? activeClasses : inactiveClasses}`}
                >
                    Horários
                </button>
                 <button
                    onClick={() => setActiveTab('content')}
                    className={`${tabItemClasses} ${activeTab === 'content' ? activeClasses : inactiveClasses}`}
                >
                    Conteúdo
                </button>
                <button
                    onClick={() => setActiveTab('appointments')}
                    className={`${tabItemClasses} ${activeTab === 'appointments' ? activeClasses : inactiveClasses}`}
                >
                    Agendamentos
                </button>
                 <button
                    onClick={() => setActiveTab('security')}
                    className={`${tabItemClasses} ${activeTab === 'security' ? activeClasses : inactiveClasses}`}
                >
                    Segurança
                </button>
            </div>
            
            <div>{renderTabContent()}</div>
        </div>
    );
};