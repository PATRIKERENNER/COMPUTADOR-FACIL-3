import React, { useState } from 'react';
import { Volume2, Sparkles, Eye, Info, CheckCircle2, ArrowRight } from 'lucide-react';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

interface PartHotspot {
  id: string;
  name: string;
  shortName: string;
  xPercent: number; // percentage in diagram
  yPercent: number;
  widthPercent: number;
  heightPercent: number;
  color: string;
  borderColor: string;
  glowColor: string;
  simpleRole: string;
  howMounted: string;
  caution: string;
}

export const InsideCaseExplorer: React.FC = () => {
  const [activePartId, setActivePartId] = useState<string>('cpu-cooler');

  const parts: PartHotspot[] = [
    {
      id: 'cpu-cooler',
      name: 'Processador (CPU) + Cooler',
      shortName: 'CPU & Cooler',
      xPercent: 38,
      yPercent: 20,
      widthPercent: 26,
      heightPercent: 26,
      color: 'bg-blue-500/20',
      borderColor: 'border-blue-500',
      glowColor: 'ring-blue-400',
      simpleRole: 'O cérebro que pensa, coberto pelo ventilador que assopra ar frio.',
      howMounted: 'Encaixado no soquete no meio da placa-mãe com pasta térmica e 4 parafusos.',
      caution: 'Nunca ligue o computador sem o cooler em cima do processador!',
    },
    {
      id: 'ram-slots',
      name: 'Memórias RAM (Slots Verticais)',
      shortName: 'Memória RAM',
      xPercent: 68,
      yPercent: 18,
      widthPercent: 14,
      heightPercent: 28,
      color: 'bg-purple-500/20',
      borderColor: 'border-purple-500',
      glowColor: 'ring-purple-400',
      simpleRole: 'Pentes verticais onde ficam guardados os programas abertos no momento.',
      howMounted: 'Encaixados em pé nos trilhos com travas plásticas nas pontas que dão "clique".',
      caution: 'Alinhe o chanfro (corte central) antes de apertar para baixo.',
    },
    {
      id: 'motherboard-base',
      name: 'Placa-Mãe (Toda a Placa Verde/Preta de Fundo)',
      shortName: 'Placa-Mãe',
      xPercent: 24,
      yPercent: 10,
      widthPercent: 64,
      heightPercent: 62,
      color: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500',
      glowColor: 'ring-emerald-400',
      simpleRole: 'A grande placa principal aparafusada no fundo do gabinete.',
      howMounted: 'Fixada sobre parafusos espaçadores de metal dourados (latão) para não encostar na carcaça.',
      caution: 'Sempre instale os parafusos espaçadores para evitar curto-circuito.',
    },
    {
      id: 'gpu-card',
      name: 'Placa de Vídeo Dedicada (GPU)',
      shortName: 'Placa de Vídeo',
      xPercent: 26,
      yPercent: 48,
      widthPercent: 54,
      heightPercent: 20,
      color: 'bg-teal-500/20',
      borderColor: 'border-teal-500',
      glowColor: 'ring-teal-400',
      simpleRole: 'A placa horizontal que desenha os jogos e imagens para o monitor.',
      howMounted: 'Encaixada no slot PCIe mais comprido e parafusada na traseira do gabinete.',
      caution: 'Ligue o cabo de força de 8 pinos da fonte na lateral dela.',
    },
    {
      id: 'psu-bottom',
      name: 'Fonte de Alimentação (Na base inferior)',
      shortName: 'Fonte (Energia)',
      xPercent: 12,
      yPercent: 78,
      widthPercent: 40,
      heightPercent: 18,
      color: 'bg-rose-500/20',
      borderColor: 'border-rose-500',
      glowColor: 'ring-rose-400',
      simpleRole: 'A caixa de força que recebe a tomada e distribui fios de energia.',
      howMounted: 'Aparafusada no compartimento inferior com a ventoinha voltada para a grelha de ar.',
      caution: 'Mantenha a chave 110V/220V na voltagem certa (ou use fontes com PFC Ativo automático).',
    },
    {
      id: 'storage-ssd',
      name: 'SSD M.2 Ultrarrápido',
      shortName: 'SSD M.2',
      xPercent: 40,
      yPercent: 42,
      widthPercent: 22,
      heightPercent: 6,
      color: 'bg-amber-500/25',
      borderColor: 'border-amber-500',
      glowColor: 'ring-amber-400',
      simpleRole: 'Uma plaquinha parecida com chiclete que guarda o Windows e arquivos.',
      howMounted: 'Inserida inclinada no slot M.2 da placa-mãe e presa por um mini parafuso.',
      caution: 'Muito sensível à estática, segure apenas pelas bordas.',
    },
    {
      id: 'case-fans',
      name: 'Ventoinhas de Fluxo de Ar (Frontais e Traseira)',
      shortName: 'Ventoinhas de Ar',
      xPercent: 4,
      yPercent: 15,
      widthPercent: 14,
      heightPercent: 55,
      color: 'bg-cyan-500/20',
      borderColor: 'border-cyan-500',
      glowColor: 'ring-cyan-400',
      simpleRole: 'Puxam ar frio pela frente do gabinete e cospem o ar quente para trás.',
      howMounted: 'Parafusadas na carcaça de metal frontal e traseira.',
      caution: 'Cuidado para não prender fios soltos nas pás que giram.',
    },
  ];

  const activePart = parts.find((p) => p.id === activePartId) || parts[0];

  const handleSelectPart = (part: PartHotspot) => {
    setActivePartId(part.id);
    sounds.playPop();
  };

  const handleReadActive = () => {
    sounds.playPop();
    speech.speak(
      `${activePart.name}. Função: ${activePart.simpleRole} Como é montado: ${activePart.howMounted} Cuidado especial: ${activePart.caution}`
    );
  };

  return (
    <section className="py-12 sm:py-16 bg-slate-900 text-white border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider border border-indigo-500/30">
            Raio-X Interativo
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white mt-2 font-heading">
            O Gabinete Aberto por Dentro
          </h2>
          <p className="text-slate-300 text-base sm:text-lg mt-2">
            Clique nas partes do desenho interativo abaixo para ver onde cada peça fica posicionada dentro da torre do computador:
          </p>
        </div>

        {/* Quick Part Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
          {parts.map((p) => {
            const isSelected = p.id === activePartId;
            return (
              <button
                key={p.id}
                onClick={() => handleSelectPart(p)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isSelected
                    ? 'bg-indigo-500 text-white ring-2 ring-indigo-300 shadow-md scale-105'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                {p.shortName}
              </button>
            );
          })}
        </div>

        {/* Interactive Diagram Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          
          {/* Left / Center: Interactive Case SVG & Hotspots */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl p-4 sm:p-6 border border-slate-800 shadow-2xl relative overflow-hidden">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-3 pb-2 border-b border-slate-800">
              <span className="flex items-center gap-1.5 font-bold text-emerald-400">
                <Eye className="w-4 h-4" /> Vista Lateral com Tampa de Vidro Aberta
              </span>
              <span className="text-[11px] bg-slate-800 px-2 py-0.5 rounded text-slate-300">
                Clique nas áreas iluminadas
              </span>
            </div>

            {/* Visual Box simulating the PC Tower */}
            <div className="relative w-full aspect-[4/3] max-h-[420px] bg-slate-900/90 rounded-xl border-2 border-slate-700 overflow-hidden shadow-inner flex items-center justify-center">
              
              {/* Motherboard outline background */}
              <div className="absolute inset-x-[20%] inset-y-[8%] bg-emerald-950/40 border border-emerald-800/60 rounded-lg pointer-events-none">
                {/* Circuit lines */}
                <div className="absolute top-2 left-2 text-[10px] text-emerald-600 font-mono">PLACA-MÃE PCB</div>
              </div>

              {/* Airflow arrows */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 flex flex-col gap-8 text-cyan-400/50 pointer-events-none text-xs font-mono">
                <span>➔ AR FRIO</span>
                <span>➔ ENTRA</span>
              </div>
              <div className="absolute right-3 top-1/4 text-rose-400/60 pointer-events-none text-xs font-mono">
                AR QUENTE ➔
              </div>

              {/* Interactive Hotspots Overlays */}
              {parts.map((p) => {
                const isSelected = p.id === activePartId;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPart(p)}
                    style={{
                      left: `${p.xPercent}%`,
                      top: `${p.yPercent}%`,
                      width: `${p.widthPercent}%`,
                      height: `${p.heightPercent}%`,
                    }}
                    className={`absolute rounded-lg border-2 transition-all flex flex-col items-center justify-center p-1 cursor-pointer text-center ${
                      isSelected
                        ? `${p.color} ${p.borderColor} ring-4 ${p.glowColor} z-20 scale-105 shadow-lg`
                        : `${p.color} border-dashed border-slate-600 hover:border-white/70 hover:bg-white/10 z-10 opacity-75 hover:opacity-100`
                    }`}
                    title={`Clique para ver detalhes de ${p.name}`}
                  >
                    <span className="text-[10px] sm:text-xs font-extrabold text-white leading-tight drop-shadow-md">
                      {p.shortName}
                    </span>
                    {isSelected && (
                      <span className="inline-block w-2 h-2 rounded-full bg-amber-400 mt-0.5 animate-ping"></span>
                    )}
                  </button>
                );
              })}

              {/* Power Supply Box at the bottom */}
              <div className="absolute bottom-2 left-4 right-4 h-[18%] bg-slate-950/80 border-t border-slate-700 pointer-events-none flex items-center justify-between px-4 text-[11px] text-slate-500 font-mono">
                <span>COMPARTIMENTO INFERIOR (CABLE MANAGEMENT & FONTE)</span>
              </div>
            </div>
          </div>

          {/* Right: Explanatory Info Card for Selected Part */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-lg">
              
              <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-400">
                  Peça Selecionada no Raio-X
                </span>
                <button
                  onClick={handleReadActive}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-xs transition-colors"
                >
                  <Volume2 className="w-3.5 h-3.5" /> Ouvir 🔊
                </button>
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white mt-3 font-heading">
                {activePart.name}
              </h3>

              <p className="text-sm text-slate-200 mt-2 leading-relaxed font-medium">
                {activePart.simpleRole}
              </p>

              <div className="mt-4 p-3 rounded-xl bg-slate-900/80 border border-slate-700">
                <span className="text-xs font-bold text-emerald-400 uppercase block mb-1">
                  🔧 Como é instalada no lugar:
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePart.howMounted}
                </p>
              </div>

              <div className="mt-3 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30">
                <span className="text-xs font-bold text-amber-400 uppercase block mb-1">
                  ⚠️ Cuidado de Segurança:
                </span>
                <p className="text-xs text-amber-200 leading-relaxed">
                  {activePart.caution}
                </p>
              </div>

            </div>

            {/* Quick Tip Pill */}
            <div className="p-4 bg-indigo-950/60 border border-indigo-800/60 rounded-xl text-xs text-indigo-200 flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-400 shrink-0" />
              <span>
                <strong>Curiosidade:</strong> A circulação de ar é projetada para que o ar frio entre pela frente e saia quente por trás e por cima!
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
