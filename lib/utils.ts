import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatNumber(value: number, decimals = 0): string {
  return value.toFixed(decimals);
}

export const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;
