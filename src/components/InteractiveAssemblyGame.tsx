import React, { useState } from 'react';
import { Volume2, Sparkles, RotateCcw, CheckCircle2, Play, Trophy, Wrench, ShieldCheck } from 'lucide-react';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';
import { trackVercelEvent } from '../utils/vercelIntegration';

interface GamePart {
  id: string;
  name: string;
  emoji: string;
  order: number;
  tip: string;
}

const GAME_PARTS: GamePart[] = [
  { id: 'cpu', name: 'Processador (CPU)', emoji: '🧠', order: 1, tip: 'Primeiro o cérebro: alinhar a seta dourada no soquete.' },
  { id: 'cooler', name: 'Pasta Térmica e Cooler', emoji: '❄️', order: 2, tip: 'Depois o ventilador em cima da CPU para não superaquecer.' },
  { id: 'ram', name: 'Pentes de Memória RAM', emoji: '📏', order: 3, tip: 'Encaixar nos slots até ouvir o clique duplo.' },
  { id: 'ssd', name: 'SSD M.2 de Armazenamento', emoji: '💾', order: 4, tip: 'Aparafusar o chip de arquivos na placa-mãe.' },
  { id: 'psu', name: 'Fonte de Alimentação', emoji: '⚡', order: 5, tip: 'Instalar a caixa de energia na base do gabinete.' },
  { id: 'mobo_case', name: 'Fixar Placa-Mãe no Gabinete', emoji: '🏗️', order: 6, tip: 'Parafusar sobre os suportes espaçadores de latão.' },
  { id: 'cables', name: 'Conectar Cabos e Painel Frontal', emoji: '🔌', order: 7, tip: 'Passar cabos organizados e ligar o botão Power.' },
  { id: 'gpu', name: 'Placa de Vídeo e Ligar!', emoji: '🚀', order: 8, tip: 'Encaixar no slot PCIe e apertar o botão para ligar!' },
];

export const InteractiveAssemblyGame: React.FC = () => {
  const [installedPartIds, setInstalledPartIds] = useState<string[]>([]);
  const [lastMessage, setLastMessage] = useState<string>(
    'Clique na primeira peça que você deve instalar na placa-mãe!'
  );
  const [isSuccessFinished, setIsSuccessFinished] = useState<boolean>(false);

  const currentExpectedStep = installedPartIds.length + 1;

  const handlePartClick = (part: GamePart) => {
    // If already installed, do nothing
    if (installedPartIds.includes(part.id)) return;

    if (part.order === currentExpectedStep) {
      // Correct!
      const newInstalled = [...installedPartIds, part.id];
      setInstalledPartIds(newInstalled);
      sounds.playSnap();

      if (newInstalled.length === GAME_PARTS.length) {
        sounds.playSuccess();
        setIsSuccessFinished(true);
        trackVercelEvent('conclusao_simulador_montagem', {
          etapas: 8,
          status: 'sucesso_total',
        });
        const winMsg = 'Parabéns! Você montou o computador perfeitamente na ordem correta e com todas as precauções de segurança!';
        setLastMessage(winMsg);
        speech.speak(winMsg);
      } else {
        const nextPart = GAME_PARTS.find((p) => p.order === newInstalled.length + 1);
        const msg = `Excelente! Você instalou ${part.name} com sucesso! Agora escolha a próxima peça: ${nextPart ? nextPart.tip : ''}`;
        setLastMessage(msg);
      }
    } else {
      // Wrong step order
      sounds.playBuzzer();
      const expectedPart = GAME_PARTS.find((p) => p.order === currentExpectedStep);
      setLastMessage(
        `Ops! Ainda não é o momento de ${part.name}. Dica: A próxima peça recomendada é: ${expectedPart?.name}!`
      );
    }
  };

  const handleReset = () => {
    sounds.playPop();
    setInstalledPartIds([]);
    setIsSuccessFinished(false);
    setLastMessage('Começando de novo: clique na primeira peça a ser instalada na placa-mãe!');
  };

  return (
    <section id="jogo-montagem" className="py-12 sm:py-16 bg-indigo-900 text-white border-b border-indigo-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <span className="px-3 py-1 rounded-full bg-amber-400 text-slate-950 text-xs font-extrabold uppercase tracking-wider shadow-xs">
            🎮 Simulador Interativo de Prática
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading">
            Monte o seu Computador na Ordem Certa!
          </h2>
          <p className="text-indigo-200 text-sm sm:text-base mt-2">
            Teste seu conhecimento sem perigo de quebrar nada. Clique nas peças na bancada abaixo na sequência correta de montagem:
          </p>
        </div>

        {/* Status & Feedback Banner */}
        <div className="bg-indigo-950/80 border-2 border-indigo-500/40 rounded-2xl p-4 sm:p-5 mb-8 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-400 text-slate-950 rounded-xl font-bold">
              {isSuccessFinished ? '🏆' : `Etapa ${Math.min(currentExpectedStep, 8)}/8`}
            </div>
            <div>
              <span className="text-xs font-bold uppercase text-indigo-300 block">Assistente de Montagem:</span>
              <p className="text-xs sm:text-sm text-white font-medium">
                {lastMessage}
              </p>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="px-4 py-2 rounded-xl bg-indigo-800 hover:bg-indigo-700 text-indigo-100 text-xs font-bold flex items-center gap-2 shrink-0 transition-colors border border-indigo-600"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reiniciar Simulador</span>
          </button>
        </div>

        {/* Two Columns: Parts Tray vs Virtual Computer Rack */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Available Parts Tray */}
          <div className="lg:col-span-6 bg-slate-900/90 rounded-2xl p-5 sm:p-6 border border-indigo-500/30">
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-extrabold uppercase text-amber-400 flex items-center gap-1.5">
                <Wrench className="w-4 h-4" /> Bancada de Peças Disponíveis
              </span>
              <span className="text-[11px] text-slate-400">
                {8 - installedPartIds.length} peças restantes
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {GAME_PARTS.map((part) => {
                const isInstalled = installedPartIds.includes(part.id);
                return (
                  <button
                    key={part.id}
                    onClick={() => handlePartClick(part)}
                    disabled={isInstalled}
                    className={`p-3.5 rounded-xl border-2 text-left transition-all flex items-center justify-between ${
                      isInstalled
                        ? 'bg-emerald-950/40 border-emerald-600/50 text-emerald-300 opacity-60 cursor-default'
                        : 'bg-slate-800/90 border-slate-700 hover:border-amber-400 hover:bg-slate-800 hover:scale-[1.02] cursor-pointer text-white shadow-xs'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl">{part.emoji}</span>
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold leading-snug">{part.name}</h3>
                        <span className="text-[10px] text-indigo-300">
                          {isInstalled ? '✓ Já Instalado' : 'Pronto para encaixe'}
                        </span>
                      </div>
                    </div>

                    {isInstalled ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0 animate-pulse"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Virtual Built Chassis Progress */}
          <div className="lg:col-span-6 bg-slate-950 rounded-2xl p-5 sm:p-6 border-2 border-indigo-500/50 shadow-2xl relative overflow-hidden">
            
            <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-800">
              <span className="text-xs font-extrabold uppercase text-emerald-400 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Gabinete em Montagem
              </span>
              <span className="text-xs font-bold text-amber-400">
                {Math.round((installedPartIds.length / 8) * 100)}% Concluído
              </span>
            </div>

            {/* Virtual Chassis visual stack */}
            <div className="space-y-2 min-h-[280px] flex flex-col justify-center">
              {installedPartIds.length === 0 ? (
                <div className="text-center py-10 px-4 border-2 border-dashed border-slate-800 rounded-xl">
                  <span className="text-4xl block mb-2">🖥️</span>
                  <p className="text-sm font-bold text-slate-300">O Gabinete está vazio na bancada.</p>
                  <p className="text-xs text-slate-500 mt-1">Toque na primeira peça à esquerda para começar a montagem!</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {installedPartIds.map((id, index) => {
                    const part = GAME_PARTS.find((p) => p.id === id);
                    if (!part) return null;
                    return (
                      <div
                        key={id}
                        className="p-2.5 rounded-xl bg-slate-900 border border-emerald-500/40 flex items-center justify-between animate-fadeIn text-xs"
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-emerald-500 text-slate-950 font-bold text-[10px] flex items-center justify-center">
                            {index + 1}
                          </span>
                          <span className="text-lg">{part.emoji}</span>
                          <span className="font-bold text-white">{part.name}</span>
                        </div>
                        <span className="text-emerald-400 font-mono text-[10px]">ENCAIXADO COM SUCESSO</span>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Victory Splash Overlay when all 8 installed */}
            {isSuccessFinished && (
              <div className="mt-4 p-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-slate-950 font-bold text-center shadow-lg animate-bounce">
                <span className="text-2xl block mb-1">🎉 🖥️ ⚡</span>
                <p className="text-sm sm:text-base text-white">Computador Ligado e Funcionando 100%!</p>
                <p className="text-xs text-emerald-100 font-normal mt-0.5">
                  Você agora entende a anatomia completa e os segredos de montagem de um microcomputador.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
};
