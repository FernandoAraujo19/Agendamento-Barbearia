import React from 'react';

interface AboutProps {
    aboutText: string;
}

export const About: React.FC<AboutProps> = ({ aboutText }) => {
    return (
        <div className="max-w-4xl mx-auto bg-brand-secondary p-8 mt-12 rounded-2xl shadow-2xl shadow-black/30">
            <h2 className="text-3xl font-serif text-brand-primary text-center mb-6">Sobre Nossa Barbearia</h2>
            <p className="text-gray-300 text-center leading-relaxed max-w-2xl mx-auto whitespace-pre-wrap">
                {aboutText}
            </p>
        </div>
    );
};
