import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const textAreaStyles = cva(
    'block w-full rounded-lg py-1.5 text-gray-900 placeholder:text-gray-400 sm:text-sm sm:leading-6',
    {
        variants: {
            disabled: cbv('opacity-50 text-gray-400 bg-gray-50 pointer-events-none'),
            error: cbv('border-red-500 focus-within:s-ring-error', 'border-gray-300 focus-within:s-ring'),
        },
    },
);