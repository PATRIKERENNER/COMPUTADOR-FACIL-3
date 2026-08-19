import React, { useState } from 'react';
import { Volume2, Sparkles, User, Code, Wrench, CheckCircle2, ArrowRight } from 'lucide-react';
import { TRIO_CONCEPTS } from '../data/hardwareContent';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const ConceptTrio: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('hardware');

  const activeConcept = TRIO_CONCEPTS.find((c) => c.id === selectedId) || TRIO_CONCEPTS[0];

  const handleReadConcept = (concept: typeof TRIO_CONCEPTS[0]) => {
    sounds.playPop();
    speech.speak(
      `${concept.title}. ${concept.subtitle}. Analogia: ${concept.analogy}. ${concept.description} Exemplos: ${concept.examples.join(', ')}. Lembrete divertido: ${concept.popularJoke}`
    );
  };

  return (
    <section id="conceitos" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Capítulo 1 • O Trio Fundamental
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            Hardware, Software e Peopleware
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Todo o mundo digital funciona graças a esse trio inseparável. Entenda a diferença de forma divertida:
          </p>
        </div>

        {/* 3 Main Interactive Cards Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 mb-8">
          {TRIO_CONCEPTS.map((item) => {
            const isSelected = selectedId === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setSelectedId(item.id);
                  sounds.playPop();
                }}
                className={`text-left p-5 sm:p-6 rounded-2xl border-2 transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between ${
                  isSelected
                    ? `${item.theme.bg} ${item.theme.border} ring-4 ${item.theme.ring}/20 shadow-md scale-[1.02]`
                    : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl">
                      {item.id === 'hardware' ? '🛠️' : item.id === 'software' ? '💾' : '🧑‍💻'}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                        isSelected ? item.theme.accent : 'bg-slate-200 text-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-1">
                    {item.subtitle}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-indigo-600">
                  <span>{isSelected ? 'Explorando agora ✓' : 'Clique para ver detalhes'}</span>
                  <ArrowRight className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Details Card for Selected Concept */}
        <div className={`p-6 sm:p-8 rounded-2xl border-2 ${activeConcept.theme.bg} ${activeConcept.theme.border} shadow-sm transition-all`}>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-300/60">
            <div className="flex items-center gap-3">
              <span className="text-4xl">
                {activeConcept.id === 'hardware' ? '⚙️' : activeConcept.id === 'software' ? '📱' : '👥'}
              </span>
              <div>
                <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                  {activeConcept.title} — {activeConcept.subtitle}
                </h3>
                <p className="text-sm sm:text-base font-semibold text-indigo-900">
                  💡 {activeConcept.analogy}
                </p>
              </div>
            </div>

            {/* Read Button */}
            <button
              onClick={() => handleReadConcept(activeConcept)}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-colors shrink-0"
              title="Ouvir explicação desta parte em voz alta"
            >
              <Volume2 className="w-4 h-4 text-emerald-400" />
              <span>Ouvir Explicação 🔊</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            {/* Left: Clear Explanation */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700">O que é exatamente?</h4>
                <p className="text-base sm:text-lg text-slate-800 mt-1 leading-relaxed">
                  {activeConcept.description}
                </p>
              </div>

              {/* Memory Joke / Rule of Thumb */}
              <div className="bg-white/80 p-4 rounded-xl border border-amber-300 shadow-xs">
                <span className="text-xs font-bold uppercase text-amber-800 block">Dica para nunca mais esquecer:</span>
                <p className="text-sm sm:text-base font-extrabold text-slate-900 mt-0.5">
                  "{activeConcept.popularJoke}"
                </p>
              </div>
            </div>

            {/* Right: Examples Pill Grid */}
            <div className="bg-white/90 p-5 rounded-xl border border-slate-200 shadow-xs">
              <h4 className="text-sm font-bold uppercase tracking-wider text-slate-700 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Exemplos do dia a dia ({activeConcept.title}):
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {activeConcept.examples.map((ex, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-slate-800 text-sm font-semibold flex items-center gap-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>{ex}</span>
                  </div>
                ))}
              </div>

              <p className="text-xs text-slate-500 mt-4 italic">
                * Nenhum dos três funciona sozinho: o Hardware precisa do Software para saber o que fazer, e ambos precisam do Peopleware (você) para ter um propósito!
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
