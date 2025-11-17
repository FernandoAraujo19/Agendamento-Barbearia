import type { Service, Barber, Appointment, SiteContent, DayHours } from './types';

export const SERVICES: Service[] = [
  { id: 1, name: 'Corte de Cabelo', price: 50, duration: 45, icon: 'cut' },
  { id: 2, name: 'Barba', price: 35, duration: 30, icon: 'beard' },
  { id: 3, name: 'Corte e Barba', price: 80, duration: 75, icon: 'shave' },
  { id: 4, name: 'Pezinho', price: 20, duration: 15, icon: 'cut' },
];

export const BARBERS: Barber[] = [
  { id: 1, name: 'Ricardo', imageUrl: 'https://picsum.photos/seed/ricardo/400/400' },
  { id: 2, name: 'Fernando', imageUrl: 'https://picsum.photos/seed/fernando/400/400' },
  { id: 3, name: 'Júnior', imageUrl: 'https://picsum.photos/seed/junior/400/400' },
];

const today = new Date();
export const INITIAL_APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    service: SERVICES[1],
    barber: BARBERS[0],
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 10, 0),
    customerName: 'Carlos Silva',
    customerPhone: '11987654321',
  },
  {
    id: 2,
    service: SERVICES[2],
    barber: BARBERS[1],
    date: new Date(today.getFullYear(), today.getMonth(), today.getDate(), 14, 30),
    customerName: 'Bruno Costa',
    customerPhone: '21912345678',
  },
];

export const initialSchedule: DayHours[] = [
  { dayOfWeek: 0, isOpen: false, opening: 9, closing: 18, lunchStart: 12, lunchEnd: 13 }, // Dom
  { dayOfWeek: 1, isOpen: true, opening: 9, closing: 19, lunchStart: 12, lunchEnd: 13 }, // Seg
  { dayOfWeek: 2, isOpen: true, opening: 9, closing: 19, lunchStart: 12, lunchEnd: 13 }, // Ter
  { dayOfWeek: 3, isOpen: true, opening: 9, closing: 19, lunchStart: 12, lunchEnd: 13 }, // Qua
  { dayOfWeek: 4, isOpen: true, opening: 9, closing: 19, lunchStart: 12, lunchEnd: 13 }, // Qui
  { dayOfWeek: 5, isOpen: true, opening: 9, closing: 19, lunchStart: 12, lunchEnd: 13 }, // Sex
  { dayOfWeek: 6, isOpen: true, opening: 10, closing: 16, lunchStart: 12, lunchEnd: 13 }, // Sáb
];

export const initialSiteContent: SiteContent = {
    logoName: "Barber Shop",
    aboutText: "Fundada em 2010, nossa barbearia combina a tradição da velha escola com técnicas modernas para oferecer uma experiência única. Nossos barbeiros são mestres em seus ofícios, dedicados a proporcionar cortes de cabelo e barbas impecáveis. Usamos apenas produtos da mais alta qualidade em um ambiente relaxante e acolhedor. Venha nos visitar e saia sentindo-se renovado e confiante.",
    footerAddress: "Rua da Barbearia, 123\nCentro, Cidade, UF\nCEP: 12345-678",
    footerPhone: "(11) 98765-4321",
    footerEmail: "contato@barbershop.com",
    socialLinks: {
        instagram: "https://instagram.com",
        facebook: "https://facebook.com",
        whatsapp: "https://wa.me/5511987654321",
    }
};

export const initialAdminPassword = 'fernando1984';
