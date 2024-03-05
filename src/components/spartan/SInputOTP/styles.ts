import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const inputOTPStyles = cva(
    'relative flex cursor-text gap-1.5',
    {
        variants: {
            disabled: cbv('opacity-50 pointer-events-none'),
        },
    },
);

export const inputOTPItemStyles = cva(
    'flex h-12 w-[46px] items-center justify-center rounded-xl border bg-gray-100 border-gray-200',
    {
        variants: {
            active: cbv('border-gray-900 ring-1 ring-gray-800'),
            success: cbv('border-green-500'),
            error: cbv('border-rose-500'),
        },
        compoundVariants: [
            {
                active: true,
                success: true,
                class: 'ring-green-400',
            },
            {
                active: true,
                error: true,
                class: 'ring-rose-400',
            }
        ]
    },
);

export const inputOTPItemTextStyles = cva(
    'text-xl font-semibold text-gray-300',
    {
        variants: {
            value: cbv('text-gray-900'),
            success: cbv('text-green-500'),
            error: cbv('text-rose-500'),
        },
    },
);
