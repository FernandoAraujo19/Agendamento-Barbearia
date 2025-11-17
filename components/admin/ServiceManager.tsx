import React, { useState, useEffect } from 'react';
import type { Service } from '../../types';
import { ICON_NAMES, ICON_MAP, EditIcon, TrashIcon } from '../Icons';

interface ServiceManagerProps {
    services: Service[];
    setServices: React.Dispatch<React.SetStateAction<Service[]>>;
}

const initialFormState: Omit<Service, 'id'> = {
    name: '',
    price: 0,
    duration: 30,
    icon: ICON_NAMES[0],
};

export const ServiceManager: React.FC<ServiceManagerProps> = ({ services, setServices }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingService, setEditingService] = useState<Service | null>(null);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingService) {
            setFormData({
                name: editingService.name,
                price: editingService.price,
                duration: editingService.duration,
                icon: editingService.icon,
            });
            setIsFormOpen(true);
        } else {
            setFormData(initialFormState);
        }
    }, [editingService]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: name === 'price' || name === 'duration' ? Number(value) : value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingService) {
            setServices(services.map(s => s.id === editingService.id ? { ...s, ...formData } : s));
        } else {
            setServices([...services, { id: Date.now(), ...formData }]);
        }
        closeForm();
    };

    const handleEdit = (service: Service) => {
        setEditingService(service);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            setServices(services.filter(s => s.id !== id));
        }
    };

    const openForm = () => {
        setEditingService(null);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingService(null);
        setFormData(initialFormState);
    };

    return (
        <div>
            {!isFormOpen && (
                 <div className="text-right mb-4">
                    <button onClick={openForm} className="bg-brand-primary text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">
                        Adicionar Serviço
                    </button>
                </div>
            )}
           
            {isFormOpen && (
                <div className="bg-brand-dark p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-serif text-brand-primary mb-4">{editingService ? 'Editar Serviço' : 'Novo Serviço'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome do Serviço" required className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                        <input name="price" value={formData.price} onChange={handleInputChange} type="number" placeholder="Preço" required className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                        <input name="duration" value={formData.duration} onChange={handleInputChange} type="number" placeholder="Duração (min)" required className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                        <select name="icon" value={formData.icon} onChange={handleInputChange} className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary">
                            {ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                        </select>
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
                            <button type="button" onClick={closeForm} className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                            <button type="submit" className="bg-brand-primary text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors">Salvar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {services.map(service => {
                    const Icon = ICON_MAP[service.icon];
                    return (
                        <div key={service.id} className="bg-brand-dark p-4 rounded-lg flex justify-between items-center">
                            <div className="flex items-center gap-4">
                                {Icon && <Icon className="w-8 h-8 text-brand-primary"/>}
                                <div>
                                    <p className="font-bold text-lg text-brand-light">{service.name}</p>
                                    <p className="text-sm text-gray-400">R$ {service.price.toFixed(2)} - {service.duration} min</p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button onClick={() => handleEdit(service)} className="p-2 text-blue-400 hover:text-blue-300"><EditIcon className="w-5 h-5"/></button>
                                <button onClick={() => handleDelete(service.id)} className="p-2 text-red-500 hover:text-red-400"><TrashIcon className="w-5 h-5"/></button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
