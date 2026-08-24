import React, { useEffect, useState } from 'react';
import { Volume2, VolumeX, Type, Sun, Sparkles, Check } from 'lucide-react';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

interface AccessibilityBarProps {
  fontSize: 'normal' | 'large' | 'extra';
  setFontSize: (size: 'normal' | 'large' | 'extra') => void;
  highContrast: boolean;
  setHighContrast: (val: boolean) => void;
  soundEnabled: boolean;
  setSoundEnabled: (val: boolean) => void;
}

export const AccessibilityBar: React.FC<AccessibilityBarProps> = ({
  fontSize,
  setFontSize,
  highContrast,
  setHighContrast,
  soundEnabled,
  setSoundEnabled,
}) => {
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    const unsub = speech.subscribe((speaking) => {
      setIsSpeaking(speaking);
    });
    return unsub;
  }, []);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sounds.soundEnabled = next;
    if (next) sounds.playPop();
  };

  const handleStopOrReadSummary = () => {
    if (isSpeaking) {
      speech.stop();
      sounds.playPop();
    } else {
      sounds.playPop();
      speech.speak(
        'Bem-vindo ao Computador Fácil! Aqui você vai aprender de forma simples o que é Hardware, Software, Periféricos e como montar um computador com segurança contra eletricidade estática. Role a tela para explorar!'
      );
    }
  };

  return (
    <aside aria-label="Controles de Acessibilidade" className="sticky top-0 z-50 bg-slate-900 text-slate-100 border-b border-slate-800 shadow-md">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2 flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm">
        {/* Voice Narrator Control */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleStopOrReadSummary}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-colors shadow-sm ${
              isSpeaking
                ? 'bg-amber-400 text-slate-950 ring-2 ring-amber-300 animate-pulse'
                : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
            }`}
            title="Clique para ler ou parar a leitura em voz alta"
            aria-label={isSpeaking ? 'Parar leitura em voz alta' : 'Ouvir introdução do site em voz alta'}
          >
            {isSpeaking ? (
              <>
                <VolumeX className="w-4 h-4" />
                <span className="whitespace-nowrap">Parar Voz ⏹</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4" />
                <span className="whitespace-nowrap">Ouvir Introdução 🔊</span>
              </>
            )}
          </button>
          
          <span className="hidden md:inline text-slate-400 text-xs">
            {isSpeaking ? 'Narrando agora em português...' : 'Dica: clique nos botões de áudio para ouvir cada explicação'}
          </span>
        </div>

        {/* Font Size, Sound & Contrast Controls */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Font sizing */}
          <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
            <span className="px-2 text-slate-400 text-xs hidden sm:inline flex items-center gap-1">
              <Type className="w-3.5 h-3.5" /> Texto:
            </span>
            <button
              onClick={() => { setFontSize('normal'); sounds.playPop(); }}
              className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === 'normal' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Texto Tamanho Normal"
            >
              A
            </button>
            <button
              onClick={() => { setFontSize('large'); sounds.playPop(); }}
              className={`px-2 py-1 rounded text-xs font-semibold ${fontSize === 'large' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Texto Tamanho Grande"
            >
              A+
            </button>
            <button
              onClick={() => { setFontSize('extra'); sounds.playPop(); }}
              className={`px-2 py-1 rounded text-xs font-bold ${fontSize === 'extra' ? 'bg-indigo-600 text-white' : 'text-slate-300 hover:text-white'}`}
              title="Texto Tamanho Extra Grande"
            >
              A++
            </button>
          </div>

          {/* Sound FX Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
              soundEnabled
                ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
                : 'bg-slate-800 border-slate-700 text-slate-400 line-through'
            }`}
            title={soundEnabled ? 'Sons ativados' : 'Sons desativados'}
            aria-label="Alternar efeitos sonoros"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">{soundEnabled ? 'Sons: On' : 'Sons: Off'}</span>
          </button>

          {/* High Contrast Toggle */}
          <button
            onClick={() => {
              setHighContrast(!highContrast);
              sounds.playPop();
            }}
            className={`p-1.5 rounded-lg border text-xs transition-colors flex items-center gap-1 ${
              highContrast
                ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
            }`}
            title="Alternar modo de alto contraste para facilitar a leitura"
            aria-label="Modo de Alto Contraste"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Contraste</span>
          </button>
        </div>
      </div>
    </aside>
  );
};
