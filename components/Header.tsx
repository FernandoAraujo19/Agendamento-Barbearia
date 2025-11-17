import React from 'react';

type View = 'booking' | 'list' | 'admin' | 'admin-login' | 'list-login';

interface HeaderProps {
    currentView: View;
    setView: (view: View) => void;
    logoName: string;
}

export const Header: React.FC<HeaderProps> = ({ currentView, setView, logoName }) => {
    const navItemClasses = "px-4 py-2 rounded-md text-sm font-medium transition-colors";
    const activeClasses = "bg-brand-primary text-brand-dark";
    const inactiveClasses = "text-brand-light hover:bg-brand-secondary";
    
    const isAdminView = currentView === 'admin' || currentView === 'admin-login';
    const isListView = currentView === 'list' || currentView === 'list-login';

    return (
        <header className="bg-black/20 backdrop-blur-sm sticky top-0 z-10">
            <nav className="container mx-auto flex items-center justify-between p-4">
                <h1 className="text-2xl font-serif text-brand-primary">{logoName}</h1>
                <div className="flex items-center space-x-2 bg-brand-dark p-1 rounded-lg">
                    <button
                        onClick={() => setView('booking')}
                        className={`${navItemClasses} ${currentView === 'booking' ? activeClasses : inactiveClasses}`}
                    >
                        Agendar
                    </button>
                    <button
                        onClick={() => setView('list-login')}
                        className={`${navItemClasses} ${isListView ? activeClasses : inactiveClasses}`}
                    >
                        Meus Agendamentos
                    </button>
                    <button
                        onClick={() => setView('admin-login')}
                        className={`${navItemClasses} ${isAdminView ? activeClasses : inactiveClasses}`}
                    >
                        Admin
                    </button>
                </div>
            </nav>
        </header>
    );
};