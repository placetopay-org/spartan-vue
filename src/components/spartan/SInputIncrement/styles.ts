import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const inputStyles = cva(
    'flex text-gray-900 items-center justify-between rounded-lg border bg-white px-1 transition',
    {
        variants: {
            disabled: cbv('opacity-50 text-gray-400'),
            error: cbv('border-red-500 focus-within:s-ring-error', 'border-gray-300 focus-within:s-ring'),
        },
    },
);

export const iconStyles = cva(
    [
        'h-6 w-6 rounded-full text-gray-400 ring-spartan-primary-200',
        'active:scale-95 group-focus:text-spartan-primary-600 group-focus:ring-2',
    ],
    {
        variants: {
            disabled: cbv('pointer-events-none opacity-50', 'group-hover:text-spartan-primary-600'),
        },
    },
);
