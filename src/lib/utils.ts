import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
//cami esto es necesario para que CVA funcione bien
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}