import React, { useState } from 'react';
import { Volume2, Cpu, Activity, Layers, HardDrive, Zap, Monitor, Wind, Box, AlertTriangle, CheckCircle, Info } from 'lucide-react';
import { INTERNAL_COMPONENTS } from '../data/hardwareContent';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const MicrocomputerCore: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>('cpu');

  const selectedComp =
    INTERNAL_COMPONENTS.find((c) => c.id === selectedCompId) || INTERNAL_COMPONENTS[0];

  const getIcon = (id: string) => {
    switch (id) {
      case 'motherboard':
        return <Cpu className="w-5 h-5" />;
      case 'cpu':
        return <Activity className="w-5 h-5" />;
      case 'ram':
        return <Layers className="w-5 h-5" />;
      case 'storage':
        return <HardDrive className="w-5 h-5" />;
      case 'psu':
        return <Zap className="w-5 h-5" />;
      case 'gpu':
        return <Monitor className="w-5 h-5" />;
      case 'cooler':
        return <Wind className="w-5 h-5" />;
      case 'case':
        return <Box className="w-5 h-5" />;
      default:
        return <Cpu className="w-5 h-5" />;
    }
  };

  const handleReadComp = (comp: typeof INTERNAL_COMPONENTS[0]) => {
    sounds.playPop();
    speech.speak(
      `${comp.name}, apelido: ${comp.nickname}. ${comp.summary}. Analogia com o corpo humano: ${comp.bodyAnalogy}. Detalhe: ${comp.detail}. O que acontece sem ela? ${comp.whatHappensWithoutIt}. Onde fica: ${comp.locationInCase}`
    );
  };

  return (
    <section id="pecas" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header & Origin Story */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Capítulo 2 • Anatomia do Computador
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            O que é um Microcomputador e suas Partes?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            <strong>Por que "Micro"?</strong> Antigamente, os computadores ocupavam salas inteiras e prédios! Quando os circuitos foram encolhidos em um pequeno chip (o microprocessador), surgiram os <em>microcomputadores</em> que cabem na mesa, no colo ou no bolso.
          </p>
        </div>

        {/* Component Selector Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2.5 sm:gap-3 mb-8">
          {INTERNAL_COMPONENTS.map((comp) => {
            const isSelected = selectedCompId === comp.id;
            return (
              <button
                key={comp.id}
                onClick={() => {
                  setSelectedCompId(comp.id);
                  sounds.playPop();
                }}
                className={`p-3 rounded-xl border-2 text-center transition-all flex flex-col items-center justify-between min-h-[95px] cursor-pointer ${
                  isSelected
                    ? 'bg-indigo-600 border-indigo-700 text-white shadow-md scale-105 ring-2 ring-indigo-300'
                    : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50'
                }`}
              >
                <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-indigo-600'}`}>
                  {getIcon(comp.id)}
                </div>
                <span className="text-xs font-bold leading-tight mt-1 line-clamp-2">
                  {comp.name.split(' ')[0]}
                </span>
                {isSelected && <span className="w-1.5 h-1.5 rounded-full bg-amber-300 mt-1"></span>}
              </button>
            );
          })}
        </div>

        {/* Deep Dive Card for Selected Component */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Top Bar of Card */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-100">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                {getIcon(selectedComp.id)}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    {selectedComp.name}
                  </h3>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-800">
                    {selectedComp.nickname}
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                  📍 {selectedComp.locationInCase}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleReadComp(selectedComp)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
              title="Ouvir a explicação desta peça"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Ouvir Peça 🔊</span>
            </button>
          </div>

          {/* Details 3-Col Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            
            {/* Column 1: O que ela faz */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
                  Função Principal:
                </span>
                <p className="text-sm sm:text-base font-semibold text-slate-800">
                  {selectedComp.summary}
                </p>
              </div>

              <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-700 block mb-1">
                  Como ela trabalha:
                </span>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                  {selectedComp.detail}
                </p>
              </div>
            </div>

            {/* Column 2: Analogias (Corpo & Cidade) */}
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800 flex items-center gap-1.5 mb-1">
                  <span>🫀</span> Comparação com o Corpo Humano:
                </span>
                <p className="text-sm font-bold text-amber-950">
                  "{selectedComp.bodyAnalogy}"
                </p>
              </div>

              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1.5 mb-1">
                  <span>🏙️</span> Comparação com uma Cidade:
                </span>
                <p className="text-sm font-bold text-emerald-950">
                  "{selectedComp.cityAnalogy}"
                </p>
              </div>
            </div>

            {/* Column 3: E se faltar? */}
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-rose-800 flex items-center gap-1.5 mb-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600" />
                  O que acontece se faltar esta peça?
                </span>
                <p className="text-xs sm:text-sm text-rose-900 font-semibold leading-relaxed">
                  {selectedComp.whatHappensWithoutIt}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-rose-200 text-[11px] text-rose-700 font-medium">
                Dica: Todas as peças são essenciais e trabalham em perfeita harmonia!
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
