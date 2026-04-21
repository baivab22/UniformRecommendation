// Pant size recommendation logic based on provided chart
export type PantSize = "3XS" | "2XS" | "XS" | "S" | "M" | "L" | "XL" | "2XL" | "3XL" | "4XL";

const pantSizeChart = [
  { size: "3XS", waistCm: [52, 62], waistIn: [20, 24], lengthCm: 99, lengthIn: 39 },
  { size: "2XS", waistCm: [54, 64], waistIn: [21, 25], lengthCm: 102, lengthIn: 40 },
  { size: "XS",  waistCm: [56, 67], waistIn: [22, 26], lengthCm: 105, lengthIn: 41 },
  { size: "S",   waistCm: [67, 79], waistIn: [26, 31], lengthCm: 107, lengthIn: 42 },
  { size: "M",   waistCm: [82, 92], waistIn: [32, 36], lengthCm: 110, lengthIn: 43 },
  { size: "L",   waistCm: [94, 102], waistIn: [37, 40], lengthCm: 112, lengthIn: 44 },
  { size: "XL",  waistCm: [105, 115], waistIn: [41, 45], lengthCm: 115, lengthIn: 45 },
  { size: "2XL", waistCm: [115, 128], waistIn: [45, 50], lengthCm: 118, lengthIn: 46 },
  { size: "3XL", waistCm: [130, 140], waistIn: [51, 55], lengthCm: 118, lengthIn: 46 },
  { size: "4XL", waistCm: [142, 157], waistIn: [56, 62], lengthCm: 118, lengthIn: 46 },
];

/**
 * Recommend pant size based on waist and length.
 * @param waist User's waist measurement
 * @param length User's length measurement
 * @param unit "cm" or "inch"
 * @returns Pant size string or null if not found
 */
export function recommendPantSize(
  waist: number,
  length: number,
  unit: "cm" | "inch" = "cm"
): PantSize | null {
  for (const entry of pantSizeChart) {
    const [waistMin, waistMax] = unit === "cm" ? entry.waistCm : entry.waistIn;
    const lengthVal = unit === "cm" ? entry.lengthCm : entry.lengthIn;
    if (
      waist >= waistMin && waist <= waistMax &&
      Math.abs(length - lengthVal) <= 2 // allow small tolerance for length
    ) {
      return entry.size as PantSize;
    }
  }
  return null;
}
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
