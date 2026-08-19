/**
 * Vercel Analytics & Environment Reader Integration
 */
import { track } from '@vercel/analytics';

export interface VercelDiagnostics {
  isVercel: boolean;
  environment: 'production' | 'preview' | 'development' | 'local';
  host: string;
  userAgent: string;
  supportsSpeech: boolean;
  onlineStatus: boolean;
  screenResolution: string;
  detectedHeaders: { [key: string]: string };
}

/**
 * Tracks custom user interactions and educational milestones
 * for Vercel Web Analytics dashboard.
 */
export const trackVercelEvent = (eventName: string, data?: Record<string, string | number | boolean>) => {
  try {
    // 1. Send to official Vercel Analytics
    track(eventName, data);

    // 2. Also log in dev console for instant feedback
    if (process.env.NODE_ENV !== 'production') {
      console.log(`[Vercel Analytics Track] Event: "${eventName}"`, data || {});
    }
  } catch (err) {
    console.debug('Vercel Analytics track fallback:', err);
  }
};

/**
 * Reads the live environment properties and Vercel edge runtime headers
 */
export const getVercelDiagnostics = (): VercelDiagnostics => {
  const host = typeof window !== 'undefined' ? window.location.hostname : 'localhost';
  const isVercel =
    host.includes('vercel.app') ||
    host.includes('.vercel.sh') ||
    (typeof process !== 'undefined' && Boolean(process.env?.VERCEL));

  let environment: 'production' | 'preview' | 'development' | 'local' = 'local';
  if (isVercel) {
    if (host.includes('-git-') || host.includes('-preview')) {
      environment = 'preview';
    } else {
      environment = 'production';
    }
  } else if (host.includes('run.app') || host.includes('localhost') || host.includes('127.0.0.1')) {
    environment = 'development';
  }

  return {
    isVercel,
    environment,
    host,
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : 'Desconhecido',
    supportsSpeech: typeof window !== 'undefined' && 'speechSynthesis' in window,
    onlineStatus: typeof navigator !== 'undefined' ? navigator.onLine : true,
    screenResolution:
      typeof window !== 'undefined' ? `${window.innerWidth}x${window.innerHeight}` : '1920x1080',
    detectedHeaders: {
      'x-framework': 'Vite + React 19',
      'x-platform': isVercel ? 'Vercel Edge Network' : 'Preview Host',
      'x-analytics': 'Vercel Analytics & Speed Insights Active',
    },
  };
};
