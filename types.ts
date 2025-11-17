import type React from 'react';

export interface Service {
  id: number;
  name: string;
  price: number;
  duration: number; // in minutes
  icon: string; // Icon name identifier
}

export interface Barber {
  id: number;
  name: string;
  imageUrl: string;
}

export interface Appointment {
  id: number;
  service: Service;
  barber: Barber;
  date: Date;
  customerName: string;
  customerPhone: string;
}

export interface BookingState {
  service?: Service;
  barber?: Barber;
  date?: Date;
  customerName?: string;
  customerPhone?: string;
}

export interface SiteContent {
  logoName: string;
  aboutText: string;
  footerAddress: string;
  footerPhone: string;
  footerEmail: string;
  socialLinks: {
    instagram: string;
    facebook: string;
    whatsapp: string;
  };
}

export interface DayHours {
  dayOfWeek: number; // 0: Dom, 1: Seg, ..., 6: Sáb
  isOpen: boolean;
  opening: number;
  closing: number;
  lunchStart: number;
  lunchEnd: number;
}
