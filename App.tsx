
import React, { useState, useCallback, useEffect } from 'react';
import type { Service, Barber, Appointment, BookingState, SiteContent, DayHours } from './types';
import { ServiceSelector } from './components/ServiceSelector';
import { BarberSelector } from './components/BarberSelector';
import { DateTimePicker } from './components/DateTimePicker';
import { Confirmation } from './components/Confirmation';
import { AppointmentList } from './components/AppointmentList';
import { Header } from './components/Header';
import { AdminPanel } from './components/admin/AdminPanel';
import { AdminLogin } from './components/admin/AdminLogin';
import { About } from './components/About';
import { Footer } from './components/Footer';
import { AppointmentLogin } from './components/AppointmentLogin';
import { loadDatabase, saveDatabase, Database } from './db';

type View = 'booking' | 'list' | 'admin' | 'admin-login' | 'list-login';

const App: React.FC = () => {
  const [db, setDb] = useState<Database>(loadDatabase);

  useEffect(() => {
    saveDatabase(db);
  }, [db]);

  const { services, barbers, appointments, schedule, siteContent, adminPassword } = db;
  
  const [view, setView] = useState<View>('booking');
  const [step, setStep] = useState(1);
  const [currentBooking, setCurrentBooking] = useState<BookingState>({});

  const setServices = (updater: React.SetStateAction<Service[]>) => 
    setDb(prev => ({ ...prev, services: typeof updater === 'function' ? updater(prev.services) : updater }));
  
  const setBarbers = (updater: React.SetStateAction<Barber[]>) => 
    setDb(prev => ({ ...prev, barbers: typeof updater === 'function' ? updater(prev.barbers) : updater }));

  const setAppointments = (updater: React.SetStateAction<Appointment[]>) => 
    setDb(prev => ({ ...prev, appointments: typeof updater === 'function' ? updater(prev.appointments) : updater }));
  
  const setSchedule = (updater: React.SetStateAction<DayHours[]>) => 
    setDb(prev => ({ ...prev, schedule: typeof updater === 'function' ? updater(prev.schedule) : updater }));
  
  const setSiteContent = (updater: React.SetStateAction<SiteContent>) => 
    setDb(prev => ({ ...prev, siteContent: typeof updater === 'function' ? updater(prev.siteContent) : updater }));
  
  const setAdminPassword = (updater: React.SetStateAction<string>) => 
    setDb(prev => ({ ...prev, adminPassword: typeof updater === 'function' ? updater(prev.adminPassword) : updater }));

  const restartBooking = useCallback(() => {
    setStep(1);
    setCurrentBooking({});
    setView('booking');
  }, []);

  const handleSelectService = (service: Service) => {
    setCurrentBooking(prev => ({ ...prev, service }));
    setStep(2);
  };

  const handleSelectBarber = (barber: Barber) => {
    setCurrentBooking(prev => ({ ...prev, barber }));
    setStep(3);
  };

  const handleSelectDateTime = (date: Date) => {
    setCurrentBooking(prev => ({ ...prev, date }));
    setStep(4);
  };
  
  const handleConfirmBooking = (customerName: string, customerPhone: string) => {
    if (currentBooking.service && currentBooking.barber && currentBooking.date) {
      const newAppointment: Appointment = {
        id: Date.now(),
        service: currentBooking.service,
        barber: currentBooking.barber,
        date: currentBooking.date,
        customerName,
        customerPhone,
      };
      setAppointments(prev => [...prev, newAppointment].sort((a,b) => a.date.getTime() - b.date.getTime()));
      restartBooking();
      setView('list');
    }
  };

  const handleCancelAppointment = (id: number) => {
    setAppointments(prev => prev.filter(app => app.id !== id));
  };
  
  const goBack = () => {
    if (step > 1) {
      setStep(prev => prev - 1);
    }
  };

  const renderBookingStep = () => {
    switch (step) {
      case 1:
        return <ServiceSelector services={services} onSelectService={handleSelectService} />;
      case 2:
        return <BarberSelector barbers={barbers} onSelectBarber={handleSelectBarber} onBack={goBack} />;
      case 3:
        if (!currentBooking.service || !currentBooking.barber) return null;
        return (
          <DateTimePicker 
            serviceDuration={currentBooking.service.duration} 
            barber={currentBooking.barber}
            appointments={appointments}
            onSelectDateTime={handleSelectDateTime} 
            onBack={goBack}
            schedule={schedule}
          />
        );
      case 4:
        if (!currentBooking.service || !currentBooking.barber || !currentBooking.date) return null;
        return (
          <Confirmation 
            booking={currentBooking as Required<BookingState>} 
            onConfirm={handleConfirmBooking}
            onBack={goBack}
          />
        );
      default:
        return <ServiceSelector services={services} onSelectService={handleSelectService} />;
    }
  };
  
  const getStepTitle = () => {
    switch (step) {
        case 1: return "Escolha um Serviço";
        case 2: return "Escolha um Barbeiro";
        case 3: return "Escolha Data e Hora";
        case 4: return "Confirme seus Dados";
        default: return "Agendamento";
    }
  };

  const renderContent = () => {
    switch(view) {
        case 'booking':
            return (
                <>
                    <div className="max-w-4xl mx-auto bg-brand-secondary p-6 rounded-2xl shadow-2xl shadow-black/30">
                        <h2 className="text-3xl font-serif text-brand-primary text-center mb-6">{getStepTitle()}</h2>
                        {renderBookingStep()}
                    </div>
                    {step === 1 && <About aboutText={siteContent.aboutText} />}
                </>
            );
        case 'list':
            return <AppointmentList appointments={appointments} onCancel={handleCancelAppointment} onNew={restartBooking}/>;
        case 'list-login':
             return <AppointmentLogin 
                onSuccess={() => setView('list')}
                onCancel={() => setView('booking')}
                adminPassword={adminPassword}
            />;
        case 'admin-login':
             return <AdminLogin 
                onSuccess={() => setView('admin')}
                onCancel={() => setView('booking')}
                adminPassword={adminPassword}
            />;
        case 'admin':
            return <AdminPanel 
                services={services}
                setServices={setServices}
                barbers={barbers}
                setBarbers={setBarbers}
                schedule={schedule}
                setSchedule={setSchedule}
                siteContent={siteContent}
                setSiteContent={setSiteContent}
                appointments={appointments}
                setAppointments={setAppointments}
                adminPassword={adminPassword}
                setAdminPassword={setAdminPassword}
            />;
    }
  }

  return (
    <div className="min-h-screen bg-brand-dark text-brand-light flex flex-col">
      <Header currentView={view} setView={setView} logoName={siteContent.logoName} />
      <main className="container mx-auto p-4 md:p-8 flex-grow">
        {renderContent()}
      </main>
      <Footer content={siteContent} />
    </div>
  );
};

export default App;
