import React, { useState } from 'react';
import { Volume2, ShieldAlert, CheckCircle2, AlertTriangle, ArrowLeft, ArrowRight, Lightbulb, Wrench, Sparkles } from 'lucide-react';
import { ASSEMBLY_STEPS, STATIC_ELECTRICITY_RULES } from '../data/hardwareContent';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const AssemblyGuide: React.FC = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);
  const [showEsdModal, setShowEsdModal] = useState<boolean>(false);

  const step = ASSEMBLY_STEPS[currentStepIndex];

  const handleNextStep = () => {
    if (currentStepIndex < ASSEMBLY_STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1);
      sounds.playSnap();
    } else {
      sounds.playSuccess();
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1);
      sounds.playPop();
    }
  };

  const handleReadCurrentStep = () => {
    sounds.playPop();
    speech.speak(
      `${step.title}. Objetivo: ${step.goal}. Cuidado de segurança: ${step.safetyCaution}. Ações: ${step.stepByStepActions.join('. ')}. Dica contra estática: ${step.antiStaticTip}. Dica profissional: ${step.proTip}.`
    );
  };

  const handleReadEsd = () => {
    sounds.playPop();
    speech.speak(
      'Cuidados essenciais com eletricidade estática: Descarregue seu corpo tocando em metal sem pintura antes de começar. Monte sempre em mesa lisa de madeira sem cobertores ou tapetes de lã. Segure todas as placas pelas bordas sem encostar nos pinos dourados de contato. Desconecte tudo da tomada!'
    );
  };

  return (
    <section id="montagem" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Capítulo 5 • Mão na Massa
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            Guia Visual Passo a Passo de Montagem do PC
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Aprenda a ordem correta de montagem com organização dos cabos e precauções indispensáveis para proteger as peças contra eletricidade estática.
          </p>
        </div>

        {/* ESD & Safety Alert Banner (Yellow / Amber Callout) */}
        <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl p-5 sm:p-6 mb-10 shadow-xs">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start sm:items-center gap-3.5">
              <div className="p-3 bg-amber-500 text-white rounded-xl shadow-xs shrink-0">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg sm:text-xl font-extrabold text-amber-950 font-heading">
                  Atenção Crítica: Proteção contra Eletricidade Estática (ESD)
                </h3>
                <p className="text-xs sm:text-sm text-amber-900 mt-0.5">
                  A eletricidade acumulada no nosso corpo pode danificar chips sensíveis sem nem vermos faísca. Veja as 5 regras de ouro:
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                onClick={handleReadEsd}
                className="px-3.5 py-2 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-bold text-xs sm:text-sm transition-colors flex items-center gap-1.5"
              >
                <Volume2 className="w-4 h-4 text-amber-900" />
                <span>Ouvir Regras 🔊</span>
              </button>
            </div>
          </div>

          {/* 5 Golden Rules Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-4 pt-4 border-t border-amber-200">
            {STATIC_ELECTRICITY_RULES.slice(1, 6).map((rule, idx) => (
              <div key={idx} className="p-3 bg-white/90 rounded-xl border border-amber-200 shadow-2xs">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{rule.icon}</span>
                  <h4 className="text-xs font-bold text-amber-950">{rule.title.split(':')[1] || rule.title}</h4>
                </div>
                <p className="text-[11px] text-amber-900 leading-relaxed">
                  {rule.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Progress Navigation Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between text-xs font-bold text-slate-500 mb-2">
            <span>Progresso da Montagem:</span>
            <span className="text-indigo-600 font-extrabold">Passo {step.stepNumber} de {ASSEMBLY_STEPS.length}</span>
          </div>

          {/* Stepper buttons row */}
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5 sm:gap-2">
            {ASSEMBLY_STEPS.map((s, idx) => {
              const isCurrent = idx === currentStepIndex;
              const isPast = idx < currentStepIndex;
              return (
                <button
                  key={s.stepNumber}
                  onClick={() => {
                    setCurrentStepIndex(idx);
                    sounds.playPop();
                  }}
                  className={`py-2 px-1 rounded-xl text-xs font-bold transition-all flex flex-col items-center justify-center gap-0.5 cursor-pointer border ${
                    isCurrent
                      ? 'bg-indigo-600 text-white border-indigo-700 ring-2 ring-indigo-300 shadow-xs'
                      : isPast
                      ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                      : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  <span className="text-[10px]">Passo {s.stepNumber}</span>
                  <span className="text-[10px] hidden sm:inline truncate max-w-[80px]">
                    {isPast ? '✓ Feito' : isCurrent ? 'Atual' : s.shortTitle.split(' ')[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Main Step Visual Card */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-3xl p-6 sm:p-8 shadow-sm">
          {/* Step Top Bar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-full border border-indigo-200">
                Etapa {step.stepNumber} de 8
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-2 font-heading">
                {step.title}
              </h3>
              <p className="text-sm sm:text-base font-semibold text-indigo-900 mt-0.5">
                🎯 {step.goal}
              </p>
            </div>

            <button
              onClick={handleReadCurrentStep}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors shrink-0"
              title="Ouvir instruções deste passo"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Ouvir Passo 🔊</span>
            </button>
          </div>

          {/* Step Details Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
            
            {/* Action Checklist (Left 7 Cols) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-2xs">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-indigo-600" />
                  O que você deve fazer (Passo a Passo):
                </h4>
                
                <ol className="space-y-3">
                  {step.stepByStepActions.map((action, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm text-slate-800">
                      <span className="w-6 h-6 rounded-full bg-indigo-100 text-indigo-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {idx + 1}
                      </span>
                      <span className="leading-relaxed font-medium">{action}</span>
                    </li>
                  ))}
                </ol>
              </div>

              {/* Safety Caution Callout */}
              <div className="bg-rose-50 border border-rose-200 p-4 rounded-xl flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                <div>
                  <span className="text-xs font-bold uppercase text-rose-800 block">
                    Cuidado Especial nesta Etapa:
                  </span>
                  <p className="text-xs sm:text-sm text-rose-950 font-semibold mt-0.5">
                    {step.safetyCaution}
                  </p>
                </div>
              </div>
            </div>

            {/* Pro & Anti-static Tips (Right 5 Cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* Anti-static Tip */}
              <div className="bg-amber-50 border border-amber-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-amber-800 font-bold text-xs uppercase mb-1">
                  <span>⚡</span> Dica Antiestática:
                </div>
                <p className="text-xs sm:text-sm text-amber-950 font-medium leading-relaxed">
                  {step.antiStaticTip}
                </p>
              </div>

              {/* Pro Tip */}
              <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
                <div className="flex items-center gap-2 text-emerald-800 font-bold text-xs uppercase mb-1">
                  <Lightbulb className="w-4 h-4 text-emerald-600" /> Dica de Técnico Experiente:
                </div>
                <p className="text-xs sm:text-sm text-emerald-950 font-medium leading-relaxed">
                  {step.proTip}
                </p>
              </div>

              {/* Step Completion Badge */}
              <div className="p-4 bg-white rounded-2xl border border-slate-200 text-center">
                <span className="text-xs text-slate-500 block mb-1">Status da Etapa:</span>
                <span className="text-sm font-bold text-indigo-700">
                  {currentStepIndex === ASSEMBLY_STEPS.length - 1 ? '🎉 Montagem Concluída com Sucesso!' : `Etapa ${step.stepNumber} em Andamento`}
                </span>
              </div>
            </div>

          </div>

          {/* Bottom Step Navigation Controls */}
          <div className="flex items-center justify-between mt-8 pt-5 border-t border-slate-200">
            <button
              onClick={handlePrevStep}
              disabled={currentStepIndex === 0}
              className={`px-4 sm:px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-colors ${
                currentStepIndex === 0
                  ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : 'bg-white hover:bg-slate-100 text-slate-700 border border-slate-300'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Passo Anterior</span>
            </button>

            <span className="text-xs sm:text-sm font-bold text-slate-500 hidden sm:inline">
              {currentStepIndex + 1} de {ASSEMBLY_STEPS.length}
            </span>

            <button
              onClick={handleNextStep}
              className={`px-5 sm:px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-xs ${
                currentStepIndex === ASSEMBLY_STEPS.length - 1
                  ? 'bg-emerald-600 hover:bg-emerald-500 text-white'
                  : 'bg-indigo-600 hover:bg-indigo-700 text-white'
              }`}
            >
              <span>{currentStepIndex === ASSEMBLY_STEPS.length - 1 ? 'Finalizar Guia 🎉' : 'Próximo Passo'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};
