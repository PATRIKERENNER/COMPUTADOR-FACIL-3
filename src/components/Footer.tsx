import React from 'react';
import { ArrowUp, BookOpen, ShieldCheck, Heart, Rocket } from 'lucide-react';
import { sounds } from '../utils/soundEffects';

interface FooterProps {
  onOpenVercelModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenVercelModal }) => {
  const scrollToTop = () => {
    sounds.playPop();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 text-slate-300 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-slate-800">
          {/* Brand & Purpose */}
          <div className="md:col-span-6 space-y-3">
            <h3 className="text-xl font-bold text-white font-heading">
              Computador Fácil
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-md">
              Plataforma educativa e inclusiva criada para desmistificar o hardware, microcomputadores e montagem para todos os públicos, especialmente pessoas em processo de alfabetização digital.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Conteúdo 100% didático, sem jargões e com acessibilidade auditiva</span>
            </div>
            {onOpenVercelModal && (
              <div className="pt-2">
                <button
                  onClick={() => {
                    sounds.playPop();
                    onOpenVercelModal();
                  }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold border border-slate-700 transition-colors"
                >
                  <span className="text-white text-xs">▲</span>
                  <span>Guia de Publicação na Vercel (vercel.json)</span>
                </button>
              </div>
            )}
          </div>

          {/* Official Research Sources Cited */}
          <div className="md:col-span-4 space-y-2 text-xs">
            <h4 className="font-bold text-white uppercase tracking-wider text-xs">
              Fontes Oficiais Consultadas:
            </h4>
            <ul className="space-y-1.5 text-slate-400">
              <li>• FGVcia — Pesquisa Anual do Uso de TI no Brasil</li>
              <li>• Cetic.br / NIC.br — Pesquisa TIC Domicílios</li>
              <li>• IDC Brasil — PC Tracker & Mercado Corporativo</li>
              <li>• Associações de Varejo de Tecnologia do Brasil</li>
            </ul>
          </div>

          {/* Quick Back to Top */}
          <div className="md:col-span-2 flex md:justify-end items-start">
            <button
              onClick={scrollToTop}
              className="p-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-2 text-xs font-bold shadow-xs border border-slate-700"
              title="Voltar ao início da página"
            >
              <ArrowUp className="w-4 h-4" />
              <span>Subir ao Topo</span>
            </button>
          </div>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-3">
          <p>© {new Date().getFullYear()} Computador Fácil — Guia Interativo de Hardware e Informática Básica.</p>
          <div className="flex items-center gap-1">
            <span>Desenvolvido com foco em acessibilidade e inclusão digital</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </div>
        </div>

      </div>
    </footer>
  );
};
