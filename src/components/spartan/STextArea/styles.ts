import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const textAreaStyles = cva(
    'block w-full rounded-lg bg-white dark:bg-white/5 py-1.5 text-gray-900 dark:text-gray-50 placeholder:text-gray-400 sm:text-sm sm:leading-6',
    {
        variants: {
            disabled: cbv('opacity-50 text-gray-400 bg-gray-50 dark:bg-white/5 pointer-events-none'),
            error: cbv('border-red-500 focus-within:s-ring-error', 'border-gray-300 dark:border-white/10 focus-within:s-ring'),
        },
    },
);
