import { twMerge } from 'tailwind-merge';
import { normalizeClass } from 'vue';
import type { TClassProp } from '@/constants';

export const tm = (...classes: TClassProp[]): string => twMerge(normalizeClass(classes));
