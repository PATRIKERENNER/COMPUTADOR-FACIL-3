export interface SourceFile {
  id: string;
  name: string;
  path: string;
  category: 'vercel-config' | 'github-ci' | 'react-components' | 'data-utils';
  categoryLabel: string;
  language: 'json' | 'typescript' | 'yaml' | 'markdown' | 'html';
  description: string;
  howPlatformsReadIt: {
    github: string;
    vercel: string;
  };
  content: string;
}

export const SOURCE_FILES: SourceFile[] = [
  {
    id: 'vercel-json',
    name: 'vercel.json',
    path: '/vercel.json',
    category: 'vercel-config',
    categoryLabel: 'Configuração da Vercel',
    language: 'json',
    description: 'Regras de compilação, roteamento de Single Page Application (SPA), headers de segurança e cache na Edge da Vercel.',
    howPlatformsReadIt: {
      github: 'O GitHub armazena e versiona o arquivo como a especificação de infraestrutura do projeto.',
      vercel: 'A Vercel lê este arquivo durante o deploy para aplicar regras de redirecionamento, segurança e cache global em milissegundos.',
    },
    content: `{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "cleanUrls": true,
  "trailingSlash": false,
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        { "key": "Cache-Control", "value": "public, max-age=31536000, immutable" }
      ]
    }
  ]
}`,
  },
  {
    id: 'github-ci',
    name: 'ci.yml',
    path: '/.github/workflows/ci.yml',
    category: 'github-ci',
    categoryLabel: 'GitHub Actions CI/CD',
    language: 'yaml',
    description: 'Pipeline de Integração Contínua para rodar testes, lint e compilar o Vite a cada push ou pull request no GitHub.',
    howPlatformsReadIt: {
      github: 'O robô do GitHub Actions executa uma máquina virtual Linux para validar o código e garantir que nada quebrou.',
      vercel: 'A Vercel verifica o status verde (aprovado) do GitHub Actions antes de promover o Preview para Produção.',
    },
    content: `name: CI & Build Verification

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]

jobs:
  build-and-test:
    name: Build, Lint & Test Codebase
    runs-on: ubuntu-latest

    steps:
      - name: Checkout repository
        uses: actions/checkout@v4

      - name: Setup Node.js 20
        uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - name: Install dependencies
        run: npm ci || npm install

      - name: Typecheck and Lint
        run: npm run lint

      - name: Build production bundle (Vite)
        run: npm run build

      - name: Check build artifact
        run: |
          test -d dist || { echo "Build output 'dist' directory not found!"; exit 1; }
          echo "Production build completed successfully for Vercel deployment!"`,
  },
  {
    id: 'package-json',
    name: 'package.json',
    path: '/package.json',
    category: 'vercel-config',
    categoryLabel: 'Dependências & Scripts',
    language: 'json',
    description: 'Manifesto do projeto com versões do React 19, Vite, Tailwind CSS v4 e SDKs da Vercel (@vercel/analytics, @vercel/speed-insights).',
    howPlatformsReadIt: {
      github: 'O GitHub lê para exibir a lista de dependências e gerar alertas de segurança via Dependabot.',
      vercel: 'A Vercel lê as dependências e o script "build" ("vite build") para instalar e empacotar o site.',
    },
    content: `{
  "name": "computador-facil",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite --port=3000 --host=0.0.0.0",
    "build": "vite build",
    "preview": "vite preview",
    "lint": "tsc --noEmit"
  },
  "dependencies": {
    "@vercel/analytics": "^1.5.0",
    "@vercel/speed-insights": "^1.2.0",
    "lucide-react": "^0.546.0",
    "react": "^19.0.1",
    "react-dom": "^19.0.1",
    "vite": "^6.2.3"
  },
  "devDependencies": {
    "@tailwindcss/vite": "^4.1.14",
    "@types/node": "^22.14.0",
    "@types/react": "^19.0.10",
    "@types/react-dom": "^19.0.4",
    "@vitejs/plugin-react": "^5.0.4",
    "tailwindcss": "^4.1.14",
    "typescript": "~5.8.2"
  }
}`,
  },
  {
    id: 'app-tsx',
    name: 'App.tsx',
    path: '/src/App.tsx',
    category: 'react-components',
    categoryLabel: 'Componente Raiz React',
    language: 'typescript',
    description: 'Estrutura principal que gerencia o estado da aplicação, acessibilidade, narração por voz e provedores da Vercel.',
    howPlatformsReadIt: {
      github: 'O GitHub analisa a sintaxe TypeScript e gera estatísticas de linguagem (100% TypeScript/TSX).',
      vercel: 'A Vercel compila o JSX/TSX para HTML e JavaScript ultra-otimizado com code-splitting.',
    },
    content: `import React, { useState } from 'react';
import { AccessibilityBar } from './components/AccessibilityBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { ConceptTrio } from './components/ConceptTrio';
import { MicrocomputerCore } from './components/MicrocomputerCore';
import { PeripheralsGuide } from './components/PeripheralsGuide';
import { ComputerTypesAndCosts } from './components/ComputerTypesAndCosts';
import { InsideCaseExplorer } from './components/InsideCaseExplorer';
import { AssemblyGuide } from './components/AssemblyGuide';
import { InteractiveAssemblyGame } from './components/InteractiveAssemblyGame';
import { SourceCodeExplorer } from './components/SourceCodeExplorer';
import { QuizSection } from './components/QuizSection';
import { IllustratedGlossary } from './components/IllustratedGlossary';
import { VercelDeployModal } from './components/VercelDeployModal';
import { Footer } from './components/Footer';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('inicio');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra'>('normal');
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isVercelModalOpen, setIsVercelModalOpen] = useState<boolean>(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <AccessibilityBar fontSize={fontSize} setFontSize={setFontSize} highContrast={highContrast} setHighContrast={setHighContrast} soundEnabled={soundEnabled} setSoundEnabled={setSoundEnabled} />
      <Header activeTab={activeTab} setActiveTab={setActiveTab} onOpenVercelModal={() => setIsVercelModalOpen(true)} />
      
      <main className="flex-1 w-full">
        <HeroSection />
        <ConceptTrio />
        <MicrocomputerCore />
        <PeripheralsGuide />
        <ComputerTypesAndCosts />
        <InsideCaseExplorer />
        <AssemblyGuide />
        <InteractiveAssemblyGame />
        <SourceCodeExplorer />
        <QuizSection />
        <IllustratedGlossary />
      </main>

      <Footer onOpenVercelModal={() => setIsVercelModalOpen(true)} />
      <VercelDeployModal isOpen={isVercelModalOpen} onClose={() => setIsVercelModalOpen(false)} />
      
      {/* Vercel Live Analytics & Performance Telemetry */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}`,
  },
  {
    id: 'vercel-integration',
    name: 'vercelIntegration.ts',
    path: '/src/utils/vercelIntegration.ts',
    category: 'data-utils',
    categoryLabel: 'Utilitário de Telemetria',
    language: 'typescript',
    description: 'Módulo de leitura do ambiente Vercel (Edge, Preview, Produção) e envio de eventos customizados de telemetria.',
    howPlatformsReadIt: {
      github: 'Permite inspeção estática do fluxo de dados e tipagem TypeScript estrita.',
      vercel: 'Conecta-se aos servidores de métricas da Vercel para alimentar os gráficos em tempo real no dashboard.',
    },
    content: `import { track } from '@vercel/analytics';

export interface VercelDiagnostics {
  isVercel: boolean;
  environment: 'production' | 'preview' | 'development' | 'local';
  host: string;
  userAgent: string;
  supportsSpeech: boolean;
  onlineStatus: boolean;
  screenResolution: string;
}

export const trackVercelEvent = (eventName: string, data?: Record<string, string | number | boolean>) => {
  try {
    track(eventName, data);
    if (process.env.NODE_ENV !== 'production') {
      console.log('[Vercel Analytics Track] Event:', eventName, data);
    }
  } catch (err) {
    console.debug('Vercel Analytics fallback:', err);
  }
};

export const getVercelDiagnostics = (): VercelDiagnostics => {
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const isVercel = host.includes('vercel.app') || Boolean(process.env?.VERCEL);

  return {
    isVercel,
    environment: isVercel ? 'production' : 'development',
    host,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Unknown',
    supportsSpeech: typeof window !== 'undefined' && 'speechSynthesis' in window,
    onlineStatus: typeof navigator !== 'undefined' ? navigator.onLine : true,
    screenResolution: typeof window !== 'undefined' ? \`\${window.innerWidth}x\${window.innerHeight}\` : '1920x1080',
  };
};`,
  },
  {
    id: 'speech-ts',
    name: 'speech.ts',
    path: '/src/utils/speech.ts',
    category: 'data-utils',
    categoryLabel: 'Acessibilidade Auditiva',
    language: 'typescript',
    description: 'Motor de síntese de voz usando a Web Speech API para narrar todos os textos e termos em Português do Brasil.',
    howPlatformsReadIt: {
      github: 'Comprova boas práticas de acessibilidade WCAG 2.1 e inclusão digital para pessoas analfabetas digitais.',
      vercel: 'Executado diretamente no navegador dos usuários em alta velocidade sem custo de servidor.',
    },
    content: `class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private selectedVoice: SpeechSynthesisVoice | null = null;

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
      this.loadVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.loadVoices();
      }
    }
  }

  private loadVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    const ptVoice = voices.find((v) => v.lang.includes('pt-BR') || v.lang.includes('pt_BR'));
    this.selectedVoice = ptVoice || voices.find((v) => v.lang.startsWith('pt')) || null;
  }

  public speak(text: string) {
    if (!this.synth) return;
    this.synth.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if (this.selectedVoice) utterance.voice = this.selectedVoice;
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    this.synth.speak(utterance);
  }
}

export const speech = new SpeechManager();`,
  },
];
