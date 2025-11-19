import type { INodeExecutionData } from 'n8n-workflow';

/**
 * Validasi string wajib tidak kosong.
 */
export function validateRequiredString(name: string, value: unknown) {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`${name} wajib diisi`);
  }
}

/**
 * Validasi format email sederhana.
 */
export function validateEmail(name: string, value: unknown) {
  validateRequiredString(name, value);
  const v = String(value);
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(v)) {
    throw new Error(`${name} tidak valid`);
  }
}

/**
 * Validasi nomor ponsel sederhana (angka dan +, -, spasi).
 */
export function validateMobile(name: string, value: unknown) {
  validateRequiredString(name, value);
  const v = String(value);
  const re = /^[+\d][\d\s-]{5,}$/;
  if (!re.test(v)) {
    throw new Error(`${name} tidak valid`);
  }
}

/**
 * Validasi tanggal ISO opsional (boleh kosong).
 */
export function validateOptionalISODate(name: string, value: unknown) {
  if (value == null || String(value).trim() === '') return;
  const v = String(value);
  const d = new Date(v);
  if (Number.isNaN(d.getTime())) {
    throw new Error(`${name} harus berupa tanggal ISO`);
  }
}

/**
 * Validasi range angka.
 */
export function validateNumberRange(name: string, value: unknown, min?: number, max?: number) {
  const n = typeof value === 'number' ? value : Number(value);
  if (Number.isNaN(n)) throw new Error(`${name} harus berupa angka`);
  if (min != null && n < min) throw new Error(`${name} minimal ${min}`);
  if (max != null && n > max) throw new Error(`${name} maksimal ${max}`);
}

/**
 * Validasi items invoice.
 */
export function validateInvoiceItems(items: Array<{ quantity: number; rate: number; description?: string }>) {
  if (!Array.isArray(items) || items.length === 0) {
    throw new Error('Items minimal 1');
  }
  items.forEach((i, idx) => {
    validateNumberRange(`Item #${idx + 1} quantity`, i.quantity, 1);
    validateNumberRange(`Item #${idx + 1} rate`, i.rate, 0.01);
  });
}

/**
 * Bungkus data ke output n8n dengan aman.
 */
export function toOutput(data: any): INodeExecutionData[] {
  return [{ json: data }];
}