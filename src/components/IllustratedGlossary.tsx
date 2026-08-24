import React, { useState } from 'react';
import { Volume2, Search, Sparkles, BookOpen, Layers, Lightbulb, CheckCircle2, X } from 'lucide-react';
import { ENHANCED_GLOSSARY_ITEMS } from '../data/hardwareContent';
import { GlossaryItem } from '../types/hardware';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const IllustratedGlossary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activeModalItem, setActiveModalItem] = useState<GlossaryItem | null>(null);

  const categories = [
    { id: 'todos', label: 'Todos os Termos', count: ENHANCED_GLOSSARY_ITEMS.length },
    { id: 'conceitos-chave', label: 'Conceitos Chave', count: ENHANCED_GLOSSARY_ITEMS.filter(i => i.category === 'conceitos-chave').length },
    { id: 'pecas-internas', label: 'Peças Internas', count: ENHANCED_GLOSSARY_ITEMS.filter(i => i.category === 'pecas-internas').length },
    { id: 'perifericos', label: 'Periféricos', count: ENHANCED_GLOSSARY_ITEMS.filter(i => i.category === 'perifericos').length },
    { id: 'tecnologias', label: 'Medidas & Tecnologias', count: ENHANCED_GLOSSARY_ITEMS.filter(i => i.category === 'tecnologias').length },
  ];

  const filteredItems = ENHANCED_GLOSSARY_ITEMS.filter((item) => {
    const matchesCat = selectedCategory === 'todos' || item.category === selectedCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !query ||
      item.term.toLowerCase().includes(query) ||
      (item.acronymFull && item.acronymFull.toLowerCase().includes(query)) ||
      item.simpleDefinition.toLowerCase().includes(query) ||
      item.everydayAnalogy.toLowerCase().includes(query) ||
      item.practicalExample.toLowerCase().includes(query);

    return matchesCat && matchesSearch;
  });

  const handleReadTerm = (item: GlossaryItem, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    sounds.playPop();
    speech.speak(
      `${item.term}. ${item.acronymFull ? `Significado da sigla: ${item.acronymFull}.` : ''} Pronúncia: ${item.pronunciation}. Definição simples: ${item.simpleDefinition}. Analogia: ${item.everydayAnalogy}. Onde você vê: ${item.practicalExample}.`
    );
  };

  const handleOpenDetail = (item: GlossaryItem) => {
    sounds.playPop();
    setActiveModalItem(item);
  };

  return (
    <section id="glossario" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Dicionário Interativo de Hardware</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 font-heading">
            Glossário Ilustrado do Computador
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Todas as siglas e termos em inglês (como <strong>CPU</strong>, <strong>RAM</strong>, <strong>SSD</strong>, <strong>Placa-mãe</strong>, <strong>Periféricos</strong>, <strong>Hardware</strong>, <strong>Software</strong> e <strong>Peopleware</strong>) traduzidos para o português com analogias do dia a dia.
          </p>
        </div>

        {/* Search & Category Filter Toolbar */}
        <div className="bg-slate-50 border-2 border-slate-200 rounded-2xl p-4 sm:p-5 mb-8 shadow-xs">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            
            {/* Search Input */}
            <div className="relative w-full md:w-80">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar termo (ex: CPU, RAM, SSD)..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-300 rounded-xl text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 shadow-2xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5 w-full md:w-auto">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.id);
                      sounds.playPop();
                    }}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-xs'
                        : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-indigo-800 text-indigo-100' : 'bg-slate-100 text-slate-500'}`}>
                      {cat.count}
                    </span>
                  </button>
                );
              })}
            </div>

          </div>

          {searchQuery && (
            <div className="mt-3 text-xs text-slate-500 flex items-center justify-between pt-2 border-t border-slate-200">
              <span>Resultados para "{searchQuery}": <strong>{filteredItems.length} termo(s) encontrado(s)</strong></span>
              <button
                onClick={() => setSearchQuery('')}
                className="text-indigo-600 font-bold hover:underline"
              >
                Limpar busca
              </button>
            </div>
          )}
        </div>

        {/* Glossary Cards Grid */}
        {filteredItems.length === 0 ? (
          <div className="text-center py-12 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
            <span className="text-4xl block mb-2">🔍</span>
            <h3 className="text-base font-bold text-slate-700">Nenhum termo encontrado com "{searchQuery}"</h3>
            <p className="text-xs text-slate-500 mt-1">Tente pesquisar por CPU, RAM, SSD, Placa-Mãe ou Periféricos.</p>
            <button
              onClick={() => { setSearchQuery(''); setSelectedCategory('todos'); }}
              className="mt-3 px-4 py-2 bg-indigo-600 text-white text-xs font-bold rounded-lg hover:bg-indigo-700"
            >
              Ver todos os termos
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => handleOpenDetail(item)}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between hover:shadow-md hover:scale-[1.01] ${item.bgColor} ${item.borderColor}`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <span className="text-3xl sm:text-4xl p-1 bg-white rounded-xl shadow-2xs">
                        {item.emoji}
                      </span>
                      <div>
                        <h3 className="text-lg sm:text-xl font-extrabold text-slate-900 font-heading leading-tight">
                          {item.term}
                        </h3>
                        {item.acronymFull && (
                          <p className="text-[11px] font-semibold text-slate-500 line-clamp-1" title={item.acronymFull}>
                            {item.acronymFull}
                          </p>
                        )}
                      </div>
                    </div>

                    <button
                      onClick={(e) => handleReadTerm(item, e)}
                      className="p-2 rounded-xl bg-white hover:bg-slate-100 text-slate-700 shadow-2xs border border-slate-200 transition-colors shrink-0"
                      title={`Ouvir pronúncia e significado de ${item.term}`}
                      aria-label={`Ouvir explicação de ${item.term}`}
                    >
                      <Volume2 className="w-4 h-4 text-emerald-600" />
                    </button>
                  </div>

                  {/* Pronunciation Pill */}
                  <div className="mb-3 flex items-center gap-1.5 text-xs text-indigo-900">
                    <span className="text-[11px] font-bold text-slate-500">🗣️ Pronúncia:</span>
                    <span className="bg-white/90 border border-slate-200 px-2 py-0.5 rounded font-mono font-bold text-indigo-700 text-xs">
                      {item.pronunciation}
                    </span>
                  </div>

                  {/* Simple Definition */}
                  <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-medium">
                    {item.simpleDefinition}
                  </p>

                  {/* Everyday Analogy */}
                  <div className="mt-3 p-2.5 bg-white/80 rounded-xl border border-slate-200/80">
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-800 mb-0.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                      <span>Como lembrar:</span>
                    </div>
                    <p className="text-xs text-slate-700 italic">
                      "{item.everydayAnalogy}"
                    </p>
                  </div>
                </div>

                {/* Bottom Footer: Practical Example */}
                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-600">
                  <span className="truncate max-w-[200px]" title={item.practicalExample}>
                    📍 Ex: {item.practicalExample}
                  </span>
                  <span className="text-indigo-600 font-bold hover:underline shrink-0">
                    Detalhes +
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Modal for Selected Term */}
        {activeModalItem && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 relative animate-scaleUp max-h-[90vh] overflow-y-auto">
              
              {/* Close Button */}
              <button
                onClick={() => setActiveModalItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
                aria-label="Fechar janela"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Modal Header */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl sm:text-5xl p-2 bg-slate-100 rounded-2xl">
                  {activeModalItem.emoji}
                </span>
                <div>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${activeModalItem.badgeColor}`}>
                    {activeModalItem.categoryLabel}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 font-heading mt-1">
                    {activeModalItem.term}
                  </h3>
                  {activeModalItem.acronymFull && (
                    <p className="text-xs font-semibold text-slate-500">
                      {activeModalItem.acronymFull}
                    </p>
                  )}
                </div>
              </div>

              {/* Audio Listen Button */}
              <button
                onClick={() => handleReadTerm(activeModalItem)}
                className="w-full py-2.5 px-4 mb-5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-xs transition-colors"
              >
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span>Ouvir Explicação Deste Termo 🔊</span>
              </button>

              {/* Content Sections */}
              <div className="space-y-4 text-left">
                
                <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    🗣️ Como se pronuncia:
                  </span>
                  <p className="text-sm font-mono font-bold text-indigo-700">
                    {activeModalItem.pronunciation}
                  </p>
                </div>

                <div>
                  <span className="text-xs font-bold uppercase text-slate-500 block mb-1">
                    📖 O que significa de forma simples:
                  </span>
                  <p className="text-sm sm:text-base text-slate-800 leading-relaxed font-medium">
                    {activeModalItem.simpleDefinition}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
                  <span className="text-xs font-bold uppercase text-amber-900 flex items-center gap-1.5 mb-1">
                    <Lightbulb className="w-4 h-4 text-amber-600" /> Analogia para memorizar:
                  </span>
                  <p className="text-sm text-amber-950 font-semibold">
                    "{activeModalItem.everydayAnalogy}"
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <span className="text-xs font-bold uppercase text-emerald-900 flex items-center gap-1.5 mb-1">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Onde você encontra no dia a dia:
                  </span>
                  <p className="text-sm text-emerald-950 font-medium">
                    {activeModalItem.practicalExample}
                  </p>
                </div>

              </div>

              {/* Modal Footer */}
              <div className="mt-6 pt-4 border-t border-slate-200 text-center">
                <button
                  onClick={() => setActiveModalItem(null)}
                  className="px-6 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 text-xs font-bold transition-colors"
                >
                  Fechar
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
