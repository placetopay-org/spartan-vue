import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const inputStyles = cva(
    [
        'flex text-gray-900 items-center justify-between rounded-lg border border-gray-300 bg-white px-1 transition',
        'focus-within:border-primary-300 focus-within:ring focus-within:ring-primary-100',
    ],
    {
        variants: {
            disabled: cbv('opacity-50 text-gray-400'),
        },
    },
);

export const iconStyles = cva(
    [
        'h-6 w-6 rounded-full text-gray-400 ring-primary-200',
        'active:scale-95 group-focus:text-primary-600 group-focus:ring-2',
    ],
    {
        variants: {
            disabled: cbv('pointer-events-none', 'group-hover:text-primary-600'),
        },
    },
);
