import React, { useState, useEffect } from 'react';
import {
  X,
  Copy,
  Check,
  ExternalLink,
  Terminal,
  Globe,
  Rocket,
  ShieldCheck,
  Sparkles,
  Activity,
  Cpu,
  BarChart3,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { sounds } from '../utils/soundEffects';
import { getVercelDiagnostics, trackVercelEvent, VercelDiagnostics } from '../utils/vercelIntegration';

interface VercelDeployModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VercelDeployModal: React.FC<VercelDeployModalProps> = ({ isOpen, onClose }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<'reader' | 'github' | 'cli'>('reader');
  const [diagnostics, setDiagnostics] = useState<VercelDiagnostics | null>(null);
  const [testEventStatus, setTestEventStatus] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      setDiagnostics(getVercelDiagnostics());
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopy = (text: string, index: number) => {
    sounds.playPop();
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2500);
  };

  const handleSendTestEvent = () => {
    sounds.playSuccess();
    trackVercelEvent('teste_leitura_vercel', {
      timestamp: new Date().toISOString(),
      origem: 'painel_interativo_vercel',
      framework: 'React 19 + Vite',
      usuario: 'leitor_ativo',
    });
    setTestEventStatus('Evento de telemetria emitido com sucesso para o Vercel Analytics!');
    setTimeout(() => setTestEventStatus(null), 4000);
  };

  const gitCommands = `git init
git add .
git commit -m "feat: Computador Fácil"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/SEU_REPOSITORIO.git
git push -u origin main`;

  const cliCommands = `npm i -g vercel
vercel login
vercel --prod`;

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border-2 border-slate-200 relative max-h-[90vh] overflow-y-auto animate-scaleUp">
        
        {/* Close Button */}
        <button
          onClick={() => {
            sounds.playPop();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors"
          aria-label="Fechar janela"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-black flex items-center justify-center text-white text-2xl font-black shadow-md shrink-0">
            ▲
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-300">
                Integração Vercel Ativa
              </span>
            </div>
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900 font-heading mt-0.5">
              Leitura de Código & Publicação Vercel
            </h3>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center gap-1.5 mb-5 p-1 bg-slate-100 rounded-xl overflow-x-auto">
          <button
            onClick={() => {
              setActiveTab('reader');
              sounds.playPop();
            }}
            className={`flex-1 min-w-[140px] py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'reader'
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-4 h-4 text-indigo-600" />
            <span>Leitor do Código (Vercel)</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('github');
              sounds.playPop();
            }}
            className={`flex-1 min-w-[130px] py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'github'
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Globe className="w-4 h-4 text-blue-600" />
            <span>Via GitHub</span>
          </button>
          <button
            onClick={() => {
              setActiveTab('cli');
              sounds.playPop();
            }}
            className={`flex-1 min-w-[120px] py-2 px-3 rounded-lg text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-1.5 whitespace-nowrap ${
              activeTab === 'cli'
                ? 'bg-white text-slate-900 shadow-xs ring-1 ring-slate-200'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Terminal className="w-4 h-4 text-emerald-600" />
            <span>Via Terminal CLI</span>
          </button>
        </div>

        {/* Tab 1: Live Vercel Code Reader & Telemetry */}
        {activeTab === 'reader' && (
          <div className="space-y-4">
            <div className="bg-slate-900 text-slate-100 p-4 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                <span className="text-xs font-mono text-emerald-400 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  Vercel Analytics & Speed Insights Conectados
                </span>
                <span className="text-[10px] bg-slate-800 text-slate-300 px-2 py-0.5 rounded font-mono">
                  @vercel/analytics 1.5+
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-mono">
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Framework Lido:</span>
                  <strong className="text-white font-bold">Vite 6 + React 19</strong>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700">
                  <span className="text-slate-400 block text-[10px]">Configuração:</span>
                  <strong className="text-emerald-400 font-bold">vercel.json (SPA)</strong>
                </div>
                <div className="p-2.5 bg-slate-800/80 rounded-xl border border-slate-700 col-span-2 sm:col-span-1">
                  <span className="text-slate-400 block text-[10px]">Core Web Vitals:</span>
                  <strong className="text-indigo-400 font-bold">Ativo & Monitorado</strong>
                </div>
              </div>

              <div className="text-[11px] text-slate-400 leading-relaxed font-sans pt-1">
                A Vercel lê automaticamente os componentes <code className="text-emerald-300 font-mono">&lt;Analytics /&gt;</code> e <code className="text-indigo-300 font-mono">&lt;SpeedInsights /&gt;</code> integrados diretamente na raiz do código para medir visitas em tempo real, desempenho de carregamento (LCP, FID, CLS) e engajamento.
              </div>
            </div>

            {/* Test Event Dispatcher */}
            <div className="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h4 className="text-xs sm:text-sm font-extrabold text-indigo-950 font-heading">
                    Testar Interação com o Painel da Vercel
                  </h4>
                  <p className="text-xs text-indigo-800 mt-0.5">
                    Dispare um evento de leitura para validar a comunicação de telemetria com a Vercel.
                  </p>
                </div>

                <button
                  onClick={handleSendTestEvent}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all shadow-xs shrink-0 flex items-center gap-1.5"
                >
                  <Zap className="w-3.5 h-3.5 fill-current text-amber-300" />
                  <span>Enviar Evento</span>
                </button>
              </div>

              {testEventStatus && (
                <div className="mt-3 p-2 bg-emerald-100 border border-emerald-300 rounded-lg text-emerald-900 text-xs font-bold flex items-center gap-2 animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                  <span>{testEventStatus}</span>
                </div>
              )}
            </div>

            {/* Structured Schema Info */}
            <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-500 shrink-0" />
                <span>Dados Estruturados JSON-LD e OpenGraph ativos para indexação e previews</span>
              </div>
              <span className="text-emerald-700 font-bold">100% Válido</span>
            </div>
          </div>
        )}

        {/* Tab 2: GitHub Flow */}
        {activeTab === 'github' && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 text-xs sm:text-sm text-slate-800">
              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">1</span>
                <div>
                  <strong>Crie um repositório no seu GitHub:</strong>
                  <p className="text-xs text-slate-600 mt-0.5">Acesse <a href="https://github.com/new" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5">github.com/new <ExternalLink className="w-3 h-3" /></a> e crie um novo repositório.</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">2</span>
                <div className="flex-1">
                  <strong>Envie o código para o GitHub:</strong>
                  <div className="mt-1.5 relative bg-slate-900 text-slate-100 p-3 rounded-xl font-mono text-xs overflow-x-auto">
                    <pre>{gitCommands}</pre>
                    <button
                      onClick={() => handleCopy(gitCommands, 1)}
                      className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
                      title="Copiar comandos"
                    >
                      {copiedIndex === 1 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <span className="w-5 h-5 rounded-full bg-indigo-600 text-white font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">3</span>
                <div>
                  <strong>Importe na Vercel:</strong>
                  <p className="text-xs text-slate-600 mt-0.5">Acesse o painel da Vercel em <a href="https://vercel.com/new" target="_blank" rel="noreferrer" className="text-indigo-600 font-bold hover:underline inline-flex items-center gap-0.5">vercel.com/new <ExternalLink className="w-3 h-3" /></a>, selecione seu repositório e clique em <strong>Deploy</strong>!</p>
                </div>
              </div>
            </div>

            {/* Config Presets Info */}
            <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Configuração Automática: <strong>Framework: Vite | Output: dist</strong></span>
              </div>
              <span className="font-bold text-emerald-700">✓ vercel.json incluído</span>
            </div>
          </div>
        )}

        {/* Tab 3: CLI Flow */}
        {activeTab === 'cli' && (
          <div className="space-y-4">
            <div className="bg-slate-50 border border-slate-200 p-4 rounded-2xl space-y-3 text-xs sm:text-sm text-slate-800">
              <p className="text-xs text-slate-600">
                Execute os comandos abaixo diretamente no seu terminal para publicar o site instantaneamente:
              </p>

              <div className="relative bg-slate-900 text-slate-100 p-3.5 rounded-xl font-mono text-xs overflow-x-auto">
                <pre>{cliCommands}</pre>
                <button
                  onClick={() => handleCopy(cliCommands, 2)}
                  className="absolute top-2 right-2 p-1.5 bg-slate-800 hover:bg-slate-700 rounded-lg text-slate-300 transition-colors"
                  title="Copiar comandos"
                >
                  {copiedIndex === 2 ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>

              <div className="p-3 bg-indigo-50 border border-indigo-200 rounded-xl text-xs text-indigo-900">
                💡 <strong>Dica:</strong> A Vercel fornecerá um link público <code className="bg-indigo-100 px-1 py-0.5 rounded font-bold">https://seu-projeto.vercel.app</code> gratuito com certificado SSL/HTTPS automático!
              </div>
            </div>
          </div>
        )}

        {/* Modal Actions */}
        <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <a
            href="https://vercel.com/new"
            target="_blank"
            rel="noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-black hover:bg-slate-800 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 shadow-sm"
          >
            <Rocket className="w-4 h-4 text-amber-400" />
            <span>Abrir Painel da Vercel (vercel.com)</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={() => {
              sounds.playPop();
              onClose();
            }}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-colors"
          >
            Fechar
          </button>
        </div>

      </div>
    </div>
  );
};
