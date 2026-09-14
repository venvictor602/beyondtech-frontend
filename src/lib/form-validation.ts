export function trimValue(value: string): string {
  return value.trim();
}

export function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimValue(email));
}

export function isValidName(name: string, min = 2): boolean {
  return trimValue(name).length >= min;
}

export function isValidMessage(message: string, min = 20): boolean {
  return trimValue(message).length >= min;
}

export function isValidPhone(
  phone: string,
  opts?: { required?: boolean },
): boolean {
  const digits = phone.replace(/\D/g, "");
  if (!opts?.required && digits.length === 0) return true;
  return digits.length >= 10;
}
