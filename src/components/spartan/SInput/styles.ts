import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';

export const containerStyles = cva(
    'h-9 relative flex gap-2 border border-gray-300 bg-white',
    {
        variants: {
            disabled: cbv('opacity-50 cursor-not-allowed'),
            error: cbv('border-red-500 outline-none focus-within:s-ring-error'),
            borderless: cbv('border-0'),
            rightOptions: cbv('pr-0', 'pr-3'),
            leftOptions: cbv('pl-0', 'pl-3'),
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
    'w-full border-none px-0 py-1.5 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0',
    {
        variants: {
            rounded: roundedClass
        }
    }
);