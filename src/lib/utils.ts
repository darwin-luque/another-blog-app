import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Transform number to its equivalent with prefix
export function parseBigNumber(value: number) {
  if (value < 1000) {
    return value
  }
  if (value < 1000000) {
    return `${(value / 1000).toFixed(1)}k`
  }
  return `${(value / 1000000).toFixed(1)}m`
}
