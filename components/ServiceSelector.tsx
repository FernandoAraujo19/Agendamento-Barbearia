import React from 'react';
import type { Service } from '../types';
import { ICON_MAP } from './Icons';

interface ServiceSelectorProps {
  services: Service[];
  onSelectService: (service: Service) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ services, onSelectService }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {services.map((service) => {
        const Icon = ICON_MAP[service.icon] || (() => null);
        return (
          <button
            key={service.id}
            onClick={() => onSelectService(service)}
            className="bg-brand-dark p-6 rounded-lg text-left transition-transform transform hover:scale-105 hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-brand-primary"
          >
            <div className="flex items-center space-x-4">
              <div className="bg-brand-primary/10 p-3 rounded-full">
                  <Icon className="w-8 h-8 text-brand-primary" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-light">{service.name}</h3>
                <p className="text-brand-primary font-semibold">
                  R$ {service.price.toFixed(2)}
                </p>
                <p className="text-gray-400 text-sm">{service.duration} minutos</p>
              </div>
            </div>
          </button>
        );
        })}
    </div>
  );
};