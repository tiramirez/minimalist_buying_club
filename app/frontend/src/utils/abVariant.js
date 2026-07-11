const DEVICE_ID_KEY = 'panpan-device-id';
const ACTIVE_EXP_KEY = 'panpan-active-experiment';

export function getDeviceId() {
  let id = localStorage.getItem(DEVICE_ID_KEY);
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem(DEVICE_ID_KEY, id);
  }
  return id;
}

export function setActiveExperiment(id, variant, expiresAt) {
  localStorage.setItem(ACTIVE_EXP_KEY, JSON.stringify({ id, variant, expires_at: expiresAt }));
}

export function getActiveVariant() {
  const raw = localStorage.getItem(ACTIVE_EXP_KEY);
  if (!raw) return null;
  const entry = JSON.parse(raw);
  if (new Date(entry.expires_at) < new Date()) {
    localStorage.removeItem(ACTIVE_EXP_KEY);
    return null;
  }
  return entry.variant;
}
