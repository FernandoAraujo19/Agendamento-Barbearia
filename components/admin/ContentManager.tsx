import React, { useState, useEffect } from 'react';
import type { SiteContent } from '../../types';

interface ContentManagerProps {
    siteContent: SiteContent;
    setSiteContent: React.Dispatch<React.SetStateAction<SiteContent>>;
}

export const ContentManager: React.FC<ContentManagerProps> = ({ siteContent, setSiteContent }) => {
    const [formData, setFormData] = useState<SiteContent>(siteContent);
    const [saved, setSaved] = useState(false);

    useEffect(() => {
        setFormData(siteContent);
    }, [siteContent]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSocialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            socialLinks: {
                ...prev.socialLinks,
                [name]: value,
            }
        }));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSiteContent(formData);
        setSaved(true);
        setTimeout(() => setSaved(false), 2000);
    };

    return (
        <div className="bg-brand-dark p-8 rounded-lg max-w-4xl mx-auto">
            <h3 className="text-2xl font-serif text-brand-primary mb-6 text-center">Gerenciar Conteúdo do Site</h3>
            <form onSubmit={handleSubmit} className="space-y-8">
                {/* Header Section */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-light border-b border-gray-700 pb-2">Cabeçalho</h4>
                    <div>
                        <label htmlFor="logoName" className="block text-sm font-medium text-gray-300 mb-1">Nome (Logo)</label>
                        <input type="text" name="logoName" id="logoName" value={formData.logoName} onChange={handleInputChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                    </div>
                </div>

                {/* About Section */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-light border-b border-gray-700 pb-2">Seção "Sobre"</h4>
                    <div>
                        <label htmlFor="aboutText" className="block text-sm font-medium text-gray-300 mb-1">Texto</label>
                        <textarea name="aboutText" id="aboutText" value={formData.aboutText} onChange={handleInputChange} rows={5} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                    </div>
                </div>

                {/* Footer Section */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-light border-b border-gray-700 pb-2">Rodapé</h4>
                    <div>
                        <label htmlFor="footerAddress" className="block text-sm font-medium text-gray-300 mb-1">Endereço</label>
                        <textarea name="footerAddress" id="footerAddress" value={formData.footerAddress} onChange={handleInputChange} rows={3} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary"></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="footerPhone" className="block text-sm font-medium text-gray-300 mb-1">Telefone</label>
                            <input type="text" name="footerPhone" id="footerPhone" value={formData.footerPhone} onChange={handleInputChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label htmlFor="footerEmail" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                            <input type="email" name="footerEmail" id="footerEmail" value={formData.footerEmail} onChange={handleInputChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                </div>

                {/* Social Links Section */}
                <div className="space-y-4">
                    <h4 className="text-xl font-semibold text-brand-light border-b border-gray-700 pb-2">Redes Sociais</h4>
                     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label htmlFor="instagram" className="block text-sm font-medium text-gray-300 mb-1">Instagram URL</label>
                            <input type="url" name="instagram" id="instagram" value={formData.socialLinks.instagram} onChange={handleSocialChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label htmlFor="facebook" className="block text-sm font-medium text-gray-300 mb-1">Facebook URL</label>
                            <input type="url" name="facebook" id="facebook" value={formData.socialLinks.facebook} onChange={handleSocialChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label htmlFor="whatsapp" className="block text-sm font-medium text-gray-300 mb-1">WhatsApp URL</label>
                            <input type="url" name="whatsapp" id="whatsapp" value={formData.socialLinks.whatsapp} onChange={handleSocialChange} className="w-full bg-gray-800 border-gray-700 rounded-md py-2 px-3 text-white focus:outline-none focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                    </div>
                </div>
                
                <div className="pt-4 text-right">
                    <button type="submit" className="bg-brand-primary text-brand-dark font-bold py-3 px-8 rounded-lg hover:bg-opacity-80 transition-colors w-full sm:w-auto">
                        Salvar Conteúdo
                    </button>
                </div>
                 {saved && <p className="text-green-400 text-center mt-4">Conteúdo salvo com sucesso!</p>}
            </form>
        </div>
    );
};
