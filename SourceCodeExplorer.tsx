import React, { useState } from 'react';
import {
  Code2,
  FileCode,
  Copy,
  Check,
  Download,
  Volume2,
  Github,
  Globe,
  Layers,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Info,
} from 'lucide-react';
import { SOURCE_FILES, SourceFile } from '../data/sourceCodeFiles';
import { speech } from '../utils/speech';
import { sounds } from '../utils/soundEffects';

export const SourceCodeExplorer: React.FC = () => {
  const [selectedFileId, setSelectedFileId] = useState<string>(SOURCE_FILES[0].id);
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [copied, setCopied] = useState<boolean>(false);

  const categories = [
    { id: 'todos', label: 'Todos os Arquivos', count: SOURCE_FILES.length },
    { id: 'vercel-config', label: '⚙️ Vercel & Config', count: SOURCE_FILES.filter((f) => f.category === 'vercel-config').length },
    { id: 'github-ci', label: '🚀 GitHub & CI/CD', count: SOURCE_FILES.filter((f) => f.category === 'github-ci').length },
    { id: 'react-components', label: '⚛️ Componentes React', count: SOURCE_FILES.filter((f) => f.category === 'react-components').length },
    { id: 'data-utils', label: '📊 Dados & Utilitários', count: SOURCE_FILES.filter((f) => f.category === 'data-utils').length },
  ];

  const filteredFiles = SOURCE_FILES.filter(
    (file) => selectedCategory === 'todos' || file.category === selectedCategory
  );

  const currentFile = SOURCE_FILES.find((f) => f.id === selectedFileId) || filteredFiles[0];

  const handleCopyCode = () => {
    sounds.playPop();
    navigator.clipboard.writeText(currentFile.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadFile = () => {
    sounds.playPop();
    const blob = new Blob([currentFile.content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = currentFile.name;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleReadExplanation = () => {
    sounds.playPop();
    speech.speak(
      `Arquivo ${currentFile.name}. ${currentFile.description}. Como o GitHub lê: ${currentFile.howPlatformsReadIt.github}. Como a Vercel lê: ${currentFile.howPlatformsReadIt.vercel}.`
    );
  };

  return (
    <section id="codigos" className="py-12 sm:py-16 bg-slate-900 text-slate-100 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-2 border border-indigo-500/30">
            <Code2 className="w-3.5 h-3.5" />
            <span>Transparência e Código Aberto</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-heading">
            Leitor de Código-Fonte (GitHub & Vercel)
          </h2>
          <p className="text-slate-300 text-sm sm:text-base mt-2">
            Inspecione como cada arquivo do projeto é estruturado e lido nativamente pelo <strong>GitHub</strong> (versionamento e CI/CD) e pela <strong>Vercel</strong> (build e edge routing).
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 mb-6 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setSelectedCategory(cat.id);
                  sounds.playPop();
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs ring-1 ring-indigo-400'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 border border-slate-700'
                }`}
              >
                <span>{cat.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${isActive ? 'bg-indigo-800 text-indigo-200' : 'bg-slate-900 text-slate-400'}`}>
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main Code Explorer Container */}
        <div className="bg-slate-950 rounded-3xl border-2 border-slate-800 shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12">
          
          {/* Left Sidebar: File Tree */}
          <div className="lg:col-span-4 border-b lg:border-b-0 lg:border-r border-slate-800 p-4 sm:p-5 bg-slate-900/60">
            <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-800">
              <span className="text-xs font-extrabold uppercase text-slate-400 flex items-center gap-1.5">
                <FileCode className="w-4 h-4 text-indigo-400" /> Arquivos do Projeto
              </span>
              <span className="text-[11px] text-slate-400 font-mono">
                {filteredFiles.length} item(s)
              </span>
            </div>

            <div className="space-y-1.5">
              {filteredFiles.map((file) => {
                const isSelected = file.id === currentFile.id;
                return (
                  <button
                    key={file.id}
                    onClick={() => {
                      setSelectedFileId(file.id);
                      sounds.playPop();
                    }}
                    className={`w-full p-3 rounded-xl text-left transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-indigo-600 text-white font-bold shadow-xs'
                        : 'bg-slate-900/90 text-slate-300 hover:bg-slate-800 border border-slate-800/80 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <span className="text-base shrink-0">
                        {file.language === 'json' ? '⚙️' : file.language === 'yaml' ? '🤖' : file.language === 'typescript' ? '⚛️' : '📄'}
                      </span>
                      <div className="truncate">
                        <span className="text-xs font-mono block truncate">{file.name}</span>
                        <span className={`text-[10px] ${isSelected ? 'text-indigo-200' : 'text-slate-400'}`}>
                          {file.categoryLabel}
                        </span>
                      </div>
                    </div>

                    <ChevronRight className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-slate-600'}`} />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Area: Code Viewer & Platform Explanations */}
          <div className="lg:col-span-8 p-4 sm:p-6 flex flex-col justify-between">
            
            {/* Header of Viewer */}
            <div>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white font-mono flex items-center gap-2">
                      <span>{currentFile.path}</span>
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-700/50">
                      {currentFile.language.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">
                    {currentFile.description}
                  </p>
                </div>

                {/* Actions Toolbar */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={handleReadExplanation}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                    title="Ouvir explicação deste arquivo em voz alta"
                  >
                    <Volume2 className="w-4 h-4 text-emerald-400" />
                  </button>
                  <button
                    onClick={handleCopyCode}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors border border-slate-700 flex items-center gap-1.5"
                    title="Copiar código para a área de transferência"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copiado!' : 'Copiar'}</span>
                  </button>
                  <button
                    onClick={handleDownloadFile}
                    className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors border border-slate-700"
                    title="Baixar arquivo"
                  >
                    <Download className="w-4 h-4 text-indigo-400" />
                  </button>
                </div>
              </div>

              {/* Dual Platform Reader Badges: GitHub vs Vercel */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <Github className="w-4 h-4 text-white shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="text-white block font-sans">Como o GitHub lê:</strong>
                    <span className="text-slate-300">{currentFile.howPlatformsReadIt.github}</span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 flex items-start gap-2.5">
                  <Globe className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="text-[11px] leading-relaxed">
                    <strong className="text-white block font-sans">Como a Vercel lê:</strong>
                    <span className="text-slate-300">{currentFile.howPlatformsReadIt.vercel}</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet Box */}
              <div className="relative bg-slate-900 rounded-2xl p-4 border border-slate-800 font-mono text-xs overflow-x-auto max-h-[360px] scrollbar-thin">
                <pre className="text-slate-200 leading-relaxed whitespace-pre font-mono">
                  {currentFile.content}
                </pre>
              </div>
            </div>

            {/* Bottom Tip */}
            <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
              <span>💡 Totalmente compatível com <strong>Git 2.40+</strong> e <strong>Vercel CLI</strong></span>
              <span className="text-emerald-400 font-mono">Status: Pronto para Build</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
