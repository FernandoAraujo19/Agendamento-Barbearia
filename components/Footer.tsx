import React from 'react';
import { InstagramIcon, FacebookIcon, WhatsAppIcon } from './Icons';
import type { SiteContent } from '../types';

interface FooterProps {
    content: SiteContent;
}

export const Footer: React.FC<FooterProps> = ({ content }) => {
  return (
    <footer className="bg-brand-secondary text-brand-light mt-12 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
          {/* Endereço */}
          <div>
            <h3 className="text-lg font-bold text-brand-primary mb-2">Endereço</h3>
            <p className="text-gray-400 whitespace-pre-wrap">{content.footerAddress}</p>
          </div>
          {/* Redes Sociais */}
          <div>
            <h3 className="text-lg font-bold text-brand-primary mb-2">Redes Sociais</h3>
            <div className="flex justify-center md:justify-start space-x-4">
              <a href={content.socialLinks.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="text-gray-400 hover:text-brand-primary transition-colors"><InstagramIcon className="w-6 h-6" /></a>
              <a href={content.socialLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="text-gray-400 hover:text-brand-primary transition-colors"><FacebookIcon className="w-6 h-6" /></a>
              <a href={content.socialLinks.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="text-gray-400 hover:text-brand-primary transition-colors"><WhatsAppIcon className="w-6 h-6" /></a>
            </div>
          </div>
          {/* Contato */}
          <div>
            <h3 className="text-lg font-bold text-brand-primary mb-2">Contato</h3>
            <p className="text-gray-400">{content.footerPhone}</p>
            <p className="text-gray-400">{content.footerEmail}</p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-6 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} {content.logoName}. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};