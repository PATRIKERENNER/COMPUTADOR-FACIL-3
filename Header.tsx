import React, { useState } from 'react';
import { Menu, X, Play, BookOpen } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenVercelModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenVercelModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'inicio', label: 'Início' },
    { id: 'conceitos', label: 'Conceitos' },
    { id: 'pecas', label: 'Peças' },
    { id: 'perifericos', label: 'Periféricos' },
    { id: 'modelos', label: 'Modelos' },
    { id: 'montagem', label: 'Montagem' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setMobileMenuOpen(false);
    sounds.playPop();

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-[37px] z-40 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Zone 1: Brand title (single text element) */}
          <button
            onClick={() => handleNavClick('inicio')}
            className="text-xl sm:text-2xl font-bold tracking-tight text-indigo-700 font-heading hover:text-indigo-800 transition-colors whitespace-nowrap shrink-0"
          >
            Computador Fácil
          </button>

          {/* Zone 2: 5 nav links, single-line */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2" aria-label="Navegação Principal">
            {navLinks.slice(0, 5).map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                  activeTab === link.id
                    ? 'bg-indigo-50 text-indigo-700'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            {/* 6th item visible on xl or accessible */}
            <button
              onClick={() => handleNavClick('montagem')}
              className={`hidden xl:inline-flex px-3 py-1.5 rounded-lg text-sm font-semibold whitespace-nowrap transition-colors ${
                activeTab === 'montagem'
                  ? 'bg-indigo-50 text-indigo-700'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              Montagem
            </button>
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                sounds.playPop();
                onOpenVercelModal();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg bg-black hover:bg-slate-800 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors whitespace-nowrap shrink-0"
              title="Instruções e acesso para publicar na Vercel"
            >
              <span className="text-white text-xs">▲</span>
              <span>Deploy Vercel</span>
            </button>

            <button
              onClick={() => handleNavClick('jogo-montagem')}
              className="hidden sm:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors whitespace-nowrap shrink-0"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Simulador PC</span>
            </button>

            {/* Mobile hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              aria-label="Abrir menu de navegação"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
                activeTab === link.id
                  ? 'bg-indigo-50 text-indigo-700 font-bold'
                  : 'text-slate-700 hover:bg-slate-50'
              }`}
            >
              <span>{link.label}</span>
              <BookOpen className="w-4 h-4 text-slate-400" />
            </button>
          ))}
          <button
            onClick={() => handleNavClick('glossario')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 flex items-center justify-between"
          >
            <span>Dicionário / Glossário 📖</span>
          </button>
          <button
            onClick={() => handleNavClick('codigos')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-slate-800 bg-slate-100 hover:bg-slate-200 flex items-center justify-between"
          >
            <span>Código-Fonte (GitHub & Vercel) 💻</span>
          </button>
          <button
            onClick={() => handleNavClick('quiz')}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 flex items-center justify-between"
          >
            <span>Fazer o Quiz de Perguntas 🎯</span>
          </button>
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenVercelModal();
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg text-sm font-bold text-white bg-black hover:bg-slate-800 flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>▲</span>
              <span>Como Publicar na Vercel</span>
            </span>
          </button>
        </div>
      )}
    </header>
  );
};
