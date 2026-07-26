const CONSENT_KEY = 'panpan-tracking-consent';

export function isTrackingEnabled() {
  return import.meta.env.VITE_TRACKING_ENABLED === 'true';
}

export function getConsent() {
  return localStorage.getItem(CONSENT_KEY); // "accepted" | "declined" | null
}

export function setConsent(value) {
  localStorage.setItem(CONSENT_KEY, value);
}
