import React, { useState } from 'react';
import { Volume2, CheckCircle2, DollarSign, Zap, ExternalLink, ShieldCheck, HelpCircle } from 'lucide-react';
import { COMPUTER_CATEGORIES } from '../data/hardwareContent';
import { ComputerCategory } from '../types/hardware';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const ComputerTypesAndCosts: React.FC = () => {
  const [selectedCatId, setSelectedCatId] = useState<string>('computador-basico');

  const selectedCat =
    COMPUTER_CATEGORIES.find((c) => c.id === selectedCatId) || COMPUTER_CATEGORIES[0];

  const handleReadCat = (cat: ComputerCategory) => {
    sounds.playPop();
    speech.speak(
      `${cat.title}. ${cat.tagline}. Faixa de preço estimada: ${cat.priceRange}. Consumo elétrico: ${cat.powerConsumption}. Indicado para: ${cat.recommendedFor}. Fonte oficial de pesquisa: ${cat.officialSource.name}.`
    );
  };

  return (
    <section id="modelos" className="py-12 sm:py-16 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Capítulo 4 • Escolhendo o Computador Certo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            3 Tipos de Computadores e Custos Estimados
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Quanto custa um computador hoje? Veja a faixa de preço real com base em pesquisas oficiais do mercado brasileiro de tecnologia.
          </p>
        </div>

        {/* 3 Categories Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {COMPUTER_CATEGORIES.map((cat) => {
            const isSelected = selectedCatId === cat.id;
            return (
              <div
                key={cat.id}
                onClick={() => {
                  setSelectedCatId(cat.id);
                  sounds.playPop();
                }}
                className={`p-6 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative bg-white ${
                  isSelected
                    ? 'border-indigo-600 ring-4 ring-indigo-200/60 shadow-lg scale-[1.02]'
                    : 'border-slate-200 hover:border-slate-300 hover:shadow-md'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl">
                      {cat.id === 'computador-basico'
                        ? '🖥️'
                        : cat.id === 'computador-intermediario'
                        ? '💻'
                        : '🚀'}
                    </span>
                    <span className={`text-xs font-extrabold px-3 py-1 rounded-full border ${cat.badgeColor}`}>
                      {cat.priceRange}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading">
                    {cat.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    {cat.tagline}
                  </p>

                  {/* Quick specs */}
                  <div className="mt-4 space-y-1.5 pt-3 border-t border-slate-100">
                    {cat.specsSummary.slice(0, 3).map((spec, idx) => (
                      <div key={idx} className="text-xs text-slate-700 flex items-start gap-1.5">
                        <span className="text-indigo-500 font-bold">•</span>
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600">
                    {isSelected ? 'Visualizando detalhes ✓' : 'Clique para ver fonte e detalhes'}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadCat(cat);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700"
                    title="Ouvir detalhes"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Deep Dive Panel for Selected Model */}
        <div className="bg-white rounded-2xl border-2 border-slate-200 shadow-md p-6 sm:p-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-200">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600">
                Detalhamento Completo
              </span>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-heading">
                {selectedCat.title}
              </h3>
              <p className="text-sm font-semibold text-slate-600 mt-1">
                🎯 {selectedCat.tagline}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-right">
                <span className="text-[11px] text-slate-500 block">Preço Médio Estimado:</span>
                <span className="text-xl sm:text-2xl font-black text-emerald-600">
                  {selectedCat.priceRange}
                </span>
              </div>
              <button
                onClick={() => handleReadCat(selectedCat)}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-xs transition-colors flex items-center gap-2"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Ouvir 🔊</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {/* Specs Breakdown */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-3">
                Configuração Típica de Peças:
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {selectedCat.specsSummary.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Pros & Recommendations */}
            <div className="p-4 rounded-xl bg-indigo-50/60 border border-indigo-100 flex flex-col justify-between">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                  Para quem é mais recomendado?
                </h4>
                <p className="text-xs sm:text-sm text-indigo-950 font-medium leading-relaxed mb-4">
                  {selectedCat.recommendedFor}
                </p>

                <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 mb-2">
                  Principais Vantagens:
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700">
                  {selectedCat.pros.map((pro, idx) => (
                    <li key={idx} className="flex items-center gap-1.5">
                      <span className="text-emerald-600 font-bold">✓</span>
                      <span>{pro}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-4 pt-3 border-t border-indigo-200/80 flex items-center gap-2 text-xs text-slate-700">
                <Zap className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Consumo de Energia: <strong>{selectedCat.powerConsumption}</strong></span>
              </div>
            </div>

            {/* Official Source & Research Transparency */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-amber-800 font-bold text-xs uppercase mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  Fonte Oficial da Pesquisa:
                </div>
                <h5 className="text-sm font-extrabold text-amber-950">
                  {selectedCat.officialSource.name}
                </h5>
                <p className="text-xs text-amber-900 mt-1 leading-relaxed">
                  {selectedCat.officialSource.description}
                </p>
                <div className="mt-2 inline-block px-2 py-0.5 rounded bg-amber-200/80 text-[11px] font-bold text-amber-900">
                  Ano base: {selectedCat.officialSource.year}
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-amber-200 text-[11px] text-amber-800 italic">
                * Os preços variam de acordo com promoções, marcas (Dell, Lenovo, Acer, Asus, Positivo) e cotação do dólar.
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
