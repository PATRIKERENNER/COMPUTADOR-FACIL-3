// Web Speech API Voice Narrator helper
class SpeechManager {
  private synth: SpeechSynthesis | null = null;
  private isSpeaking = false;
  private currentUtterance: SpeechSynthesisUtterance | null = null;
  private listeners: Set<(isSpeaking: boolean, text: string) => void> = new Set();
  private currentText = '';

  constructor() {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      this.synth = window.speechSynthesis;
    }
  }

  public subscribe(listener: (isSpeaking: boolean, text: string) => void) {
    this.listeners.add(listener);
    listener(this.isSpeaking, this.currentText);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((l) => l(this.isSpeaking, this.currentText));
  }

  public speak(text: string, rate: number = 0.95) {
    if (!this.synth) return;

    // Stop current speech
    this.stop();

    const cleanText = text.replace(/[*_#`]/g, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = 'pt-BR';
    utterance.rate = rate; // Slightly slower for clarity
    utterance.pitch = 1.0;

    // Try to pick a natural Brazilian Portuguese voice if available
    const voices = this.synth.getVoices();
    const ptVoice = voices.find(
      (v) =>
        v.lang === 'pt-BR' ||
        v.lang.startsWith('pt_BR') ||
        v.name.includes('Brazil') ||
        v.name.includes('Português')
    );
    if (ptVoice) {
      utterance.voice = ptVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentText = cleanText;
      this.notify();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentText = '';
      this.notify();
    };

    utterance.onerror = () => {
      this.isSpeaking = false;
      this.currentText = '';
      this.notify();
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentText = '';
    this.notify();
  }

  public toggle(text: string) {
    if (this.isSpeaking && this.currentText === text) {
      this.stop();
    } else {
      this.speak(text);
    }
  }

  public getStatus() {
    return { isSpeaking: this.isSpeaking, currentText: this.currentText };
  }
}

export const speech = new SpeechManager();
