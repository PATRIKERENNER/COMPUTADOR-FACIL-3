import React, { useState } from 'react';
import { Volume2, ArrowDownRight, ArrowUpRight, ArrowLeftRight, Sparkles, HelpCircle } from 'lucide-react';
import { PERIPHERALS } from '../data/hardwareContent';
import { PeripheralType, PeripheralItem } from '../types/hardware';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const PeripheralsGuide: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'todos' | PeripheralType>('todos');
  const [selectedItem, setSelectedItem] = useState<PeripheralItem | null>(PERIPHERALS[0]);
  const [testInputText, setTestInputText] = useState('');

  const filtered =
    activeFilter === 'todos'
      ? PERIPHERALS
      : PERIPHERALS.filter((item) => item.type === activeFilter);

  const handleReadCategory = (type: string) => {
    sounds.playPop();
    if (type === 'entrada') {
      speech.speak(
        'Periféricos de Entrada: são os aparelhos que você usa para colocar dados, textos, cliques e voz PARA DENTRO do computador. Exemplos: teclado, mouse, microfone, câmera e scanner.'
      );
    } else if (type === 'saida') {
      speech.speak(
        'Periféricos de Saída: são os aparelhos que entregam o resultado PARA FORA, para os seus olhos e ouvidos. Exemplos: monitor, caixas de som, fones de ouvido e impressora.'
      );
    } else if (type === 'misto') {
      speech.speak(
        'Periféricos Mistos: fazem as duas coisas ao mesmo tempo. Eles tanto colocam dados para dentro quanto mostram resultados para fora. Exemplos: tela de toque do celular, pendrive e headset com fone e microfone.'
      );
    } else {
      speech.speak(
        'Periféricos são todos os aparelhos externos conectados ao computador através de cabos ou portas USB.'
      );
    }
  };

  const handleReadItem = (item: PeripheralItem) => {
    sounds.playPop();
    speech.speak(
      `${item.name}. É um ${item.typeLabel}. Analogia: ${item.simpleAnalogy}. ${item.description} Como funciona: ${item.howItWorks}`
    );
  };

  return (
    <section id="perifericos" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-100 text-indigo-800 text-xs font-bold uppercase tracking-wider">
            Capítulo 3 • Portas e Conexões
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 mt-2 font-heading">
            O que são Periféricos de Entrada, Saída e Mistos?
          </h2>
          <p className="text-slate-600 text-base sm:text-lg mt-2">
            Periféricos são os aparelhos que ficam "na periferia" (em volta) do computador e permitem a comunicação entre você e a máquina.
          </p>
        </div>

        {/* 3 Visual Direction Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {/* Entrada */}
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📥</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-blue-600 text-white">
                  De Você ➔ Para o PC
                </span>
              </div>
              <h3 className="text-lg font-bold text-blue-950 font-heading">
                1. Periféricos de Entrada
              </h3>
              <p className="text-xs sm:text-sm text-blue-900 mt-1">
                Colocam informações para dentro. Ex: Teclado (letras), Mouse (cliques), Microfone (voz).
              </p>
            </div>
            <button
              onClick={() => handleReadCategory('entrada')}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-blue-800 hover:text-blue-950"
            >
              <Volume2 className="w-4 h-4" /> Ouvir Categoria 🔊
            </button>
          </div>

          {/* Saída */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">📤</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-amber-600 text-white">
                  Do PC ➔ Para Você
                </span>
              </div>
              <h3 className="text-lg font-bold text-amber-950 font-heading">
                2. Periféricos de Saída
              </h3>
              <p className="text-xs sm:text-sm text-amber-900 mt-1">
                Entregam respostas para fora. Ex: Monitor (imagens), Caixas de Som (música), Impressora (papel).
              </p>
            </div>
            <button
              onClick={() => handleReadCategory('saida')}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950"
            >
              <Volume2 className="w-4 h-4" /> Ouvir Categoria 🔊
            </button>
          </div>

          {/* Mistos */}
          <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5 relative overflow-hidden flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-3xl">🔄</span>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-emerald-600 text-white">
                  Duas Vias Simultâneas
                </span>
              </div>
              <h3 className="text-lg font-bold text-emerald-950 font-heading">
                3. Periféricos Mistos
              </h3>
              <p className="text-xs sm:text-sm text-emerald-900 mt-1">
                Fazem as duas coisas juntas. Ex: Tela Touch (vê e clica), Pendrive (grava e lê), Headset.
              </p>
            </div>
            <button
              onClick={() => handleReadCategory('misto')}
              className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800 hover:text-emerald-950"
            >
              <Volume2 className="w-4 h-4" /> Ouvir Categoria 🔊
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          <button
            onClick={() => {
              setActiveFilter('todos');
              sounds.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'todos'
                ? 'bg-slate-900 text-white shadow-xs'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            Todos os Periféricos ({PERIPHERALS.length})
          </button>
          <button
            onClick={() => {
              setActiveFilter('entrada');
              sounds.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'entrada'
                ? 'bg-blue-600 text-white shadow-xs'
                : 'bg-blue-50 text-blue-800 border border-blue-200 hover:bg-blue-100'
            }`}
          >
            📥 Apenas Entrada
          </button>
          <button
            onClick={() => {
              setActiveFilter('saida');
              sounds.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'saida'
                ? 'bg-amber-600 text-white shadow-xs'
                : 'bg-amber-50 text-amber-800 border border-amber-200 hover:bg-amber-100'
            }`}
          >
            📤 Apenas Saída
          </button>
          <button
            onClick={() => {
              setActiveFilter('misto');
              sounds.playPop();
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeFilter === 'misto'
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
            }`}
          >
            🔄 Apenas Mistos
          </button>
        </div>

        {/* Peripherals Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const isSelected = selectedItem?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  sounds.playPop();
                }}
                className={`p-5 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/40 ring-4 ring-indigo-200/50 shadow-md'
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-3xl sm:text-4xl">{item.emoji}</span>
                    <span
                      className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full ${
                        item.type === 'entrada'
                          ? 'bg-blue-100 text-blue-800'
                          : item.type === 'saida'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}
                    >
                      {item.typeLabel}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 font-heading">
                    {item.name}
                  </h3>
                  <p className="text-xs font-semibold text-indigo-700 mt-0.5">
                    💡 {item.simpleAnalogy}
                  </p>

                  <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {item.tags.map((t, idx) => (
                      <span key={idx} className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                        {t}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleReadItem(item);
                    }}
                    className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                    title={`Ouvir sobre ${item.name}`}
                  >
                    <Volume2 className="w-4 h-4 text-emerald-600" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Live Interactive Test Playground */}
        <div className="mt-8 bg-slate-900 text-white rounded-2xl p-6 border border-slate-800">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-5 h-5 text-amber-400" />
            <h3 className="text-lg font-bold font-heading">
              Mini Simulador Prático de Entrada e Saída
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-300 mb-4">
            Experimente digitar seu nome abaixo com o seu teclado (<strong>Entrada</strong>). Veja o texto aparecer na tela preta (<strong>Saída Visual</strong>) e clique no botão para ouvir o computador falar seu nome (<strong>Saída de Som</strong>):
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={testInputText}
              onChange={(e) => setTestInputText(e.target.value)}
              placeholder="Digite qualquer palavra aqui..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-slate-800 border border-slate-700 text-white placeholder-slate-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button
              onClick={() => {
                if (testInputText.trim()) {
                  sounds.playPop();
                  speech.speak(`Você digitou no teclado a palavra: ${testInputText}`);
                } else {
                  speech.speak('Por favor, digite alguma palavra primeiro na caixa de texto!');
                }
              }}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Volume2 className="w-4 h-4" />
              <span>Ouvir Saída de Som 🔊</span>
            </button>
          </div>
          {testInputText && (
            <div className="mt-3 p-3 rounded-lg bg-slate-800/80 border border-slate-700 text-emerald-400 text-xs font-mono">
              [Sinal de Entrada Recebido]: "{testInputText}" ➔ Mostrado no Monitor (Saída)!
            </div>
          )}
        </div>

      </div>
    </section>
  );
};
