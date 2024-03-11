import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

const roundedStyles = {
    left: 'rounded-l-lg',
    right: 'rounded-r-lg',
    both: 'rounded-lg',
    none: '',
}

export const containerStyles = cva(
    'relative flex gap-2 border border-gray-300 bg-white',
    {
        variants: {
            disabled: cbv('opacity-50 cursor-not-allowed'),
            error: cbv('border-red-500 outline-none focus-within:s-ring-error'),
            borderless: cbv('border-0'),
            rightOptions: cbv('pr-0', 'pr-3'),
            leftOptions: cbv('pl-0', 'pl-3'),
            rounded: roundedStyles
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
    'w-full border-none px-0 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:ring-0',
    {
        variants: {
            rounded: roundedStyles
        }
    }
);