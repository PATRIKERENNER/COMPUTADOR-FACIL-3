/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
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

  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'font-scale-lg';
    if (fontSize === 'extra') return 'font-scale-xl';
    return '';
  };

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-slate-50 text-slate-900 transition-all ${getFontSizeClass()} ${
        highContrast ? 'high-contrast-mode' : ''
      }`}
    >
      {/* 1. Top Accessibility Toolbar (Voice Narrator, Zoom, High Contrast, Sound) */}
      <AccessibilityBar
        fontSize={fontSize}
        setFontSize={setFontSize}
        highContrast={highContrast}
        setHighContrast={setHighContrast}
        soundEnabled={soundEnabled}
        setSoundEnabled={setSoundEnabled}
      />

      {/* 2. Top Bar (Header adhering strictly to 3-zone contract) */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenVercelModal={() => setIsVercelModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {/* Hero Section */}
        <HeroSection
          onExploreClick={() => scrollToSection('conceitos')}
          onAssemblyClick={() => scrollToSection('montagem')}
        />

        {/* 1. Concept Trio (Hardware, Software, Peopleware) */}
        <ConceptTrio />

        {/* 2. Microcomputer & Internal Anatomy */}
        <MicrocomputerCore />

        {/* 3. Peripherals (Entrada, Saída, Mistos) */}
        <PeripheralsGuide />

        {/* 4. Three Computer Types and Costs with Official Sources */}
        <ComputerTypesAndCosts />

        {/* 5. Inside Case Explorer (Raio-X do Gabinete) */}
        <InsideCaseExplorer />

        {/* 6. Step-by-Step Visual Assembly Guide with Anti-Static Rules */}
        <AssemblyGuide />

        {/* 7. Interactive PC Assembly Simulator Game */}
        <InteractiveAssemblyGame />

        {/* 8. Source Code Explorer for GitHub & Vercel */}
        <SourceCodeExplorer />

        {/* 9. Knowledge Quiz */}
        <QuizSection />

        {/* 9. Illustrated Beginner Glossary */}
        <IllustratedGlossary />
      </main>

      {/* Footer */}
      <Footer onOpenVercelModal={() => setIsVercelModalOpen(true)} />

      {/* Vercel Deployment Modal */}
      <VercelDeployModal
        isOpen={isVercelModalOpen}
        onClose={() => setIsVercelModalOpen(false)}
      />

      {/* Vercel Live Code Reader & Web Analytics & Speed Insights */}
      <Analytics />
      <SpeedInsights />
    </div>
  );
}
