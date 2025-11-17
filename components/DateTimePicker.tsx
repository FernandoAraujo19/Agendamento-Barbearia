import React, { useState, useMemo } from 'react';
// FIX: The DayHours type is exported from `../types`, not `../App`.
import type { Appointment, Barber, DayHours } from '../types';
import { CalendarIcon, ClockIcon } from './Icons';

interface DateTimePickerProps {
  serviceDuration: number;
  barber: Barber;
  appointments: Appointment[];
  onSelectDateTime: (date: Date) => void;
  onBack: () => void;
  schedule: DayHours[];
}

const WEEK_DAYS = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const DateTimePicker: React.FC<DateTimePickerProps> = ({ serviceDuration, barber, appointments, onSelectDateTime, onBack, schedule }) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysInMonth = useMemo(() => {
    const date = new Date(currentYear, currentMonth, 1);
    const days = [];
    while (date.getMonth() === currentMonth) {
      days.push(new Date(date));
      date.setDate(date.getDate() + 1);
    }
    return days;
  }, [currentMonth, currentYear]);

  const startDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const availableTimeSlots = useMemo(() => {
    if (!selectedDate) return [];
    
    const dayConfig = schedule.find(d => d.dayOfWeek === selectedDate.getDay());
    if (!dayConfig || !dayConfig.isOpen) return [];

    const barberAppointments = appointments.filter(
        app => app.barber.id === barber.id &&
        app.date.toDateString() === selectedDate.toDateString()
    );

    const slots = [];
    const { opening, closing, lunchStart, lunchEnd } = dayConfig;
    const startTime = opening * 60; // in minutes
    const endTime = closing * 60; // in minutes
    const slotInterval = 30; // 30 minutes
    
    for (let time = startTime; time <= endTime - serviceDuration; time += slotInterval) {
      const slotStart = new Date(selectedDate);
      slotStart.setHours(Math.floor(time / 60), time % 60, 0, 0);
      
      const slotEnd = new Date(slotStart.getTime() + serviceDuration * 60000);

      const isOverlappingAppointment = barberAppointments.some(app => {
        const appStart = app.date.getTime();
        const appEnd = appStart + app.service.duration * 60000;
        return (slotStart.getTime() < appEnd && slotEnd.getTime() > appStart);
      });
      
      const lunchStartTime = new Date(selectedDate);
      lunchStartTime.setHours(lunchStart, 0, 0, 0);

      const lunchEndTime = new Date(selectedDate);
      lunchEndTime.setHours(lunchEnd, 0, 0, 0);

      const isDuringLunch = slotStart.getTime() < lunchEndTime.getTime() && slotEnd.getTime() > lunchStartTime.getTime();

      const now = new Date();
      if (!isOverlappingAppointment && !isDuringLunch && slotStart > now) {
        slots.push(slotStart);
      }
    }
    return slots;
  }, [selectedDate, appointments, barber.id, serviceDuration, schedule]);
  
  const handleDateClick = (day: Date) => {
    const dayConfig = schedule.find(d => d.dayOfWeek === day.getDay());
    if (day < today || !dayConfig || !dayConfig.isOpen) return;
    setSelectedDate(day);
  };

  const changeMonth = (offset: number) => {
    const newDate = new Date(currentYear, currentMonth + offset, 1);
    setCurrentMonth(newDate.getMonth());
    setCurrentYear(newDate.getFullYear());
    setSelectedDate(null);
  };

  return (
    <div className="flex flex-col md:flex-row gap-8 relative pb-16">
      <div className="flex-1 bg-brand-dark p-4 rounded-lg">
        <div className="flex items-center justify-between mb-4">
          <button onClick={() => changeMonth(-1)} className="p-2 rounded-full hover:bg-gray-700">&lt;</button>
          <h3 className="font-bold text-lg text-brand-light">
            {new Date(currentYear, currentMonth).toLocaleString('pt-BR', { month: 'long', year: 'numeric' })}
          </h3>
          <button onClick={() => changeMonth(1)} className="p-2 rounded-full hover:bg-gray-700">&gt;</button>
        </div>
        <div className="grid grid-cols-7 gap-1 text-center text-xs text-gray-400 mb-2">
          {WEEK_DAYS.map(day => <div key={day}>{day}</div>)}
        </div>
        <div className="grid grid-cols-7 gap-1">
          {Array.from({ length: startDayOfMonth }).map((_, i) => <div key={`empty-${i}`}></div>)}
          {daysInMonth.map(day => {
            const isToday = day.toDateString() === new Date().toDateString();
            const isSelected = selectedDate?.toDateString() === day.toDateString();
            const isPast = day < today;
            const dayConfig = schedule.find(d => d.dayOfWeek === day.getDay());
            const isWorkDay = dayConfig?.isOpen ?? false;
            const isDisabled = isPast || !isWorkDay;

            return (
              <button
                key={day.toString()}
                disabled={isDisabled}
                onClick={() => handleDateClick(day)}
                className={`p-2 rounded-full text-sm aspect-square transition-colors
                  ${isDisabled ? 'text-gray-600 cursor-not-allowed' : 'hover:bg-brand-primary/20'}
                  ${isSelected ? 'bg-brand-primary text-brand-dark font-bold' : ''}
                  ${isToday && !isSelected && !isDisabled ? 'border border-brand-primary' : ''}
                `}
              >
                {day.getDate()}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full md:w-1/3">
        <h3 className="text-xl font-bold text-brand-primary mb-4 flex items-center gap-2">
            <ClockIcon/> Horários disponíveis
        </h3>
        {selectedDate ? (
          <div className="grid grid-cols-3 gap-2 max-h-64 overflow-y-auto pr-2">
            {availableTimeSlots.length > 0 ? availableTimeSlots.map(slot => (
              <button
                key={slot.getTime()}
                onClick={() => onSelectDateTime(slot)}
                className="bg-brand-dark p-2 text-center rounded-md hover:bg-brand-primary hover:text-brand-dark transition-colors"
              >
                {slot.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </button>
            )) : <p className="text-gray-400 col-span-3">Nenhum horário disponível para esta data.</p>}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-center bg-brand-dark p-6 rounded-lg h-full">
            <CalendarIcon className="w-12 h-12 text-gray-600 mb-4"/>
            <p className="text-gray-400">Selecione uma data no calendário para ver os horários.</p>
          </div>
        )}
      </div>
      <div className="w-full absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
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