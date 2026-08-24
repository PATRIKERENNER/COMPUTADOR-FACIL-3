export type PeripheralType = 'entrada' | 'saida' | 'misto';

export interface PeripheralItem {
  id: string;
  name: string;
  type: PeripheralType;
  typeLabel: string;
  emoji: string;
  simpleAnalogy: string;
  description: string;
  howItWorks: string;
  color: string;
  bgLight: string;
  borderCol: string;
  tags: string[];
}

export interface InternalComponent {
  id: string;
  name: string;
  nickname: string;
  iconName: string;
  bodyAnalogy: string;
  cityAnalogy: string;
  summary: string;
  detail: string;
  whatHappensWithoutIt: string;
  color: string;
  bgLight: string;
  borderCol: string;
  locationInCase: string;
}

export interface ComputerCategory {
  id: string;
  title: string;
  tagline: string;
  audience: string;
  priceRange: string;
  powerConsumption: string;
  specsSummary: string[];
  pros: string[];
  officialSource: {
    name: string;
    description: string;
    year: string;
  };
  recommendedFor: string;
  badgeColor: string;
  accentColor: string;
}

export interface AssemblyStep {
  stepNumber: number;
  title: string;
  shortTitle: string;
  icon: string;
  goal: string;
  safetyCaution: string;
  stepByStepActions: string[];
  antiStaticTip: string;
  proTip: string;
  color: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  illustration: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  category: 'hardware-software' | 'perifericos' | 'montagem';
}

export interface GlossaryItem {
  id: string;
  term: string;
  acronymFull?: string;
  category: 'conceitos-chave' | 'pecas-internas' | 'perifericos' | 'tecnologias';
  categoryLabel: string;
  emoji: string;
  pronunciation: string;
  simpleDefinition: string;
  everydayAnalogy: string;
  practicalExample: string;
  badgeColor: string;
  borderColor: string;
  bgColor: string;
}
