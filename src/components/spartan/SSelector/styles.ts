import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';


export type TSelectButtonStyles = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva(
    'inline-flex h-9 items-center gap-3 rounded-lg border border-gray-300 bg-white px-3 py-1.5 focus-within:s-ring focus:outline-none',
    {
        variants: {
            disabled: cbv('bg-gray-50 pointer-events-none'),
        },
    },
);

export type TSelectOptionStyles = VariantProps<typeof optionStyles>;
export const optionStyles = cva(
    'relative text-sm flex w-full py-2 pl-3 pr-[52px] hover:bg-gray-50',
    {
        variants: {
            selected: cbv('font-medium'),
            disabled: cbv('opacity-50 cursor-not-allowed'),
        },
    },
);