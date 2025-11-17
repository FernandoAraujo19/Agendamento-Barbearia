import React, { useState, useEffect } from 'react';
import type { Barber } from '../../types';
import { EditIcon, TrashIcon } from '../Icons';

interface BarberManagerProps {
    barbers: Barber[];
    setBarbers: React.Dispatch<React.SetStateAction<Barber[]>>;
}

const initialFormState: Omit<Barber, 'id'> = {
    name: '',
    imageUrl: '',
};

export const BarberManager: React.FC<BarberManagerProps> = ({ barbers, setBarbers }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingBarber, setEditingBarber] = useState<Barber | null>(null);
    const [formData, setFormData] = useState(initialFormState);

    useEffect(() => {
        if (editingBarber) {
            setFormData({
                name: editingBarber.name,
                imageUrl: editingBarber.imageUrl,
            });
            setIsFormOpen(true);
        } else {
            setFormData(initialFormState);
        }
    }, [editingBarber]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingBarber) {
            setBarbers(barbers.map(b => b.id === editingBarber.id ? { ...b, ...formData } : b));
        } else {
            setBarbers([...barbers, { id: Date.now(), ...formData }]);
        }
        closeForm();
    };
    
    const handleEdit = (barber: Barber) => {
        setEditingBarber(barber);
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este barbeiro?')) {
            setBarbers(barbers.filter(b => b.id !== id));
        }
    };

    const openForm = () => {
        setEditingBarber(null);
        setIsFormOpen(true);
    };

    const closeForm = () => {
        setIsFormOpen(false);
        setEditingBarber(null);
        setFormData(initialFormState);
    };

    return (
        <div>
            {!isFormOpen && (
                <div className="text-right mb-4">
                    <button onClick={openForm} className="bg-brand-primary text-brand-dark font-bold py-2 px-4 rounded-lg hover:bg-opacity-80 transition-colors">
                        Adicionar Barbeiro
                    </button>
                </div>
            )}
           
            {isFormOpen && (
                <div className="bg-brand-dark p-6 rounded-lg mb-8">
                    <h3 className="text-xl font-serif text-brand-primary mb-4">{editingBarber ? 'Editar Barbeiro' : 'Novo Barbeiro'}</h3>
                    <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input name="name" value={formData.name} onChange={handleInputChange} placeholder="Nome do Barbeiro" required className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                        <input name="imageUrl" value={formData.imageUrl} onChange={handleInputChange} type="url" placeholder="URL da Imagem" required className="bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"/>
                        <div className="col-span-1 md:col-span-2 flex justify-end gap-4">
                            <button type="button" onClick={closeForm} className="bg-gray-600 text-white py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors">Cancelar</button>
                            <button type="submit" className="bg-brand-primary text-brand-dark font-bold py-2 px-6 rounded-lg hover:bg-opacity-80 transition-colors">Salvar</button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {barbers.map(barber => (
                    <div key={barber.id} className="bg-brand-dark p-4 rounded-lg flex flex-col items-center relative group">
                        <img src={barber.imageUrl} alt={barber.name} className="w-24 h-24 rounded-full object-cover mb-2"/>
                        <p className="font-bold text-lg text-brand-light">{barber.name}</p>
                        <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleEdit(barber)} className="p-2 bg-black/50 rounded-full text-blue-400 hover:text-blue-300"><EditIcon className="w-4 h-4"/></button>
                            <button onClick={() => handleDelete(barber.id)} className="p-2 bg-black/50 rounded-full text-red-500 hover:text-red-400"><TrashIcon className="w-4 h-4"/></button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
