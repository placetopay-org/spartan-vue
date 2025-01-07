import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';

export const containerStyles = cva(
    'relative flex py-1.5 gap-2 border border-gray-300 bg-white px-3 max-w-80 flex-wrap',
    {
        variants: {
            disabled: cbv('opacity-50 cursor-not-allowed'),
            error: cbv('border-red-500 outline-none focus-within:s-ring-error'),
            borderless: cbv('border-0'),
            rounded: roundedClass
        },
        compoundVariants: [
            {
                error: false,
                borderless: false,
                class: 'focus-within:s-ring'
            }
        ]
    },
);

export const inputStyles = cva(
    'w-full border-none p-0 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0',
    {
        variants: {
            rounded: roundedClass
        }
    }
);