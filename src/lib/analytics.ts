type AnalyticsValue = string | number | boolean | undefined;

declare global {
  interface Window { dataLayer?: unknown[]; gtag?: (...args: unknown[]) => void; }
}

export const trackEvent = (name: string, parameters: Record<string, AnalyticsValue> = {}) => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent('date-night:analytics', { detail: { name, parameters } }));
  window.gtag?.('event', name, parameters);
};
