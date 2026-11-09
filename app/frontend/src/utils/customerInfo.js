const CUSTOMER_INFO_KEY = 'panpan-customer-info';

export function normalizeName(value) {
  return String(value ?? '').trim().split(/\s+/).filter(Boolean).join(' ');
}

// Returns 'missing_first' | 'missing_last' | 'same' | null
export function getNameProblem({ firstName, lastName }) {
  const first = normalizeName(firstName);
  const last = normalizeName(lastName);
  if (!first) return 'missing_first';
  if (!last) return 'missing_last';
  if (first.toLowerCase() === last.toLowerCase()) return 'same';
  return null;
}

export function hasSavedCustomerInfo() {
  try {
    return !!localStorage.getItem(CUSTOMER_INFO_KEY);
  } catch {
    return false;
  }
}

// Saved info with a bad name (missing, or first == last) comes back with empty
// names and needsReentry so the customer has to type them again.
export function loadSavedCustomerInfo() {
  try {
    const saved = localStorage.getItem(CUSTOMER_INFO_KEY);
    if (saved) {
      const p = JSON.parse(saved);
      const needsReentry = getNameProblem(p) !== null;
      return {
        firstName: needsReentry ? "" : p.firstName,
        lastName: needsReentry ? "" : p.lastName,
        phone: p.phone || "",
        validPhone: !!p.phone,
        email: p.email || "",
        validEmail: !!p.email,
        additionalEmails: [],
        additionalEmailsValid: [],
        needsReentry,
      };
    }
  } catch {}
  return {
    firstName: "",
    lastName: "",
    phone: "",
    validPhone: null,
    email: "",
    validEmail: null,
    additionalEmails: [],
    additionalEmailsValid: [],
    needsReentry: false,
  };
}

export function saveCustomerInfo({ firstName, lastName, phone, email }) {
  try {
    localStorage.setItem(CUSTOMER_INFO_KEY, JSON.stringify({
      firstName: normalizeName(firstName),
      lastName: normalizeName(lastName),
      phone,
      email,
    }));
  } catch {}
}

export function clearCustomerInfo() {
  try {
    localStorage.removeItem(CUSTOMER_INFO_KEY);
  } catch {}
}
