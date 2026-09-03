import { twMerge } from 'tailwind-merge';
import { normalizeClass } from 'vue';
import type { TClassProp } from '@/constants';

export const mergeClasses = (...classes: TClassProp[]): string => twMerge(normalizeClass(classes));
