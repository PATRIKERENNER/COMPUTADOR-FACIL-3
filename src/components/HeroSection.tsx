import React from 'react';
import { Volume2, Sparkles, Wrench, Monitor, Cpu, ShieldAlert, ArrowDown } from 'lucide-react';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

interface HeroSectionProps {
  onExploreClick: () => void;
  onAssemblyClick: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreClick, onAssemblyClick }) => {
  const handleReadHero = () => {
    sounds.playPop();
    speech.speak(
      'Bem-vindo ao Computador Fácil! Aqui você vai aprender informática sem medo. Vamos mostrar o que é Hardware, Software e Peopleware com desenhos simples, o que tem dentro do computador, como conectar teclado e mouse, e como montar seu computador passo a passo com proteção contra choques de eletricidade estática.'
    );
  };

  return (
    <section id="inicio" className="relative overflow-hidden bg-gradient-to-b from-indigo-50/80 via-white to-slate-50 border-b border-slate-200 py-10 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* Friendly Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs sm:text-sm font-bold shadow-xs">
              <Sparkles className="w-4 h-4 text-amber-600 animate-spin" />
              <span>Aprenda Informática de um Jeito Simples e Sem Medo</span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.15] font-heading">
              O que é um <span className="text-indigo-600 underline decoration-amber-400 decoration-wavy decoration-2">Computador</span> por dentro?
            </h1>

            {/* Accessible Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-700 leading-relaxed max-w-2xl">
              Você já teve medo de estragar o computador só de mexer? <strong>Não precisa ter medo!</strong> Criamos este guia com desenhos simples, cores vivas e analogias do dia a dia para qualquer pessoa entender como cada peça funciona.
            </p>

            {/* Quick Benefits Pills */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <span className="text-2xl p-2 bg-indigo-50 rounded-lg">👀</span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">Desenhos Claros</h2>
                  <p className="text-[11px] text-slate-600">Sem termos em inglês difíceis</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <span className="text-2xl p-2 bg-emerald-50 rounded-lg">🔊</span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">Áudio Narrador</h2>
                  <p className="text-[11px] text-slate-600">Ouça o texto em voz alta</p>
                </div>
              </div>

              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs flex items-center gap-3">
                <span className="text-2xl p-2 bg-amber-50 rounded-lg">⚡</span>
                <div>
                  <h2 className="text-xs font-bold text-slate-900">Guia de Montagem</h2>
                  <p className="text-[11px] text-slate-600">Passo a passo seguro</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-3 sm:gap-4 pt-2">
              <button
                onClick={() => {
                  sounds.playPop();
                  onExploreClick();
                }}
                className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center gap-2"
              >
                <Cpu className="w-5 h-5" />
                <span>Começar a Aprender</span>
              </button>

              <button
                onClick={handleReadHero}
                className="px-5 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm sm:text-base shadow-sm transition-all flex items-center gap-2"
                title="Ouvir a explicação desta página em voz alta"
              >
                <Volume2 className="w-5 h-5" />
                <span>Ouvir em Voz Alta</span>
              </button>

              <button
                onClick={() => {
                  sounds.playPop();
                  onAssemblyClick();
                }}
                className="px-5 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 font-bold text-sm sm:text-base shadow-xs transition-colors flex items-center gap-2"
              >
                <Wrench className="w-5 h-5 text-amber-600" />
                <span>Ver Como se Monta</span>
              </button>
            </div>
          </div>

          {/* Right Visual Graphic Card */}
          <div className="lg:col-span-5">
            <div className="bg-white rounded-2xl p-5 sm:p-6 border-2 border-indigo-200 shadow-xl relative overflow-hidden">
              {/* Top Accent Strip */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500"></span>
                  <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                  <span className="w-3 h-3 rounded-full bg-emerald-500"></span>
                  <span className="text-xs font-bold text-slate-500 ml-2">Visão Geral Simples</span>
                </div>
                <span className="text-xs px-2.5 py-1 rounded-full bg-indigo-100 text-indigo-800 font-bold">
                  Guia Ilustrado
                </span>
              </div>

              {/* Anatomy Diagram in vibrant blocks */}
              <div className="mt-4 space-y-3">
                <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🦴</span>
                    <div>
                      <h2 className="text-sm font-bold text-amber-950">1. Hardware</h2>
                      <p className="text-xs text-amber-800">O corpo físico: peças, placas e fios</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-amber-700 bg-amber-200/60 px-2 py-1 rounded">Você Toca</span>
                </div>

                <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">💡</span>
                    <div>
                      <h2 className="text-sm font-bold text-emerald-950">2. Software</h2>
                      <p className="text-xs text-emerald-800">A mente: programas e aplicativos</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-200/60 px-2 py-1 rounded">Você Usa</span>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🧑‍💻</span>
                    <div>
                      <h2 className="text-sm font-bold text-indigo-950">3. Peopleware</h2>
                      <p className="text-xs text-indigo-800">O ser humano: você que comanda tudo</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-200/60 px-2 py-1 rounded">Você Comanda</span>
                </div>
              </div>

              {/* Microcomputer badge */}
              <div className="mt-4 p-3 bg-slate-900 rounded-xl text-white flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <Monitor className="w-4 h-4 text-emerald-400" />
                  <span>Microcomputador = Desktop, Notebook, Tablet e Celular</span>
                </div>
                <span className="text-emerald-400 font-bold">100% Fácil</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
