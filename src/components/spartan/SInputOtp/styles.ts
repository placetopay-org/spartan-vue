import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const inputOtpStyles = cva('relative flex cursor-text gap-1.5', {
    variants: {
        disabled: cbv('opacity-50 pointer-events-none'),
    },
});

export const inputOtpItemStyles = cva(
    'flex h-12 w-[46px] shrink-0 items-center justify-center rounded-xl border bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10',
    {
        variants: {
            active: cbv('s-outline'),
            success: cbv('border-green-500'),
            error: cbv('border-rose-500'),
        },
        compoundVariants: [
            {
                active: true,
                success: true,
                class: 'outline-green-400',
            },
            {
                active: true,
                error: true,
                class: 'outline-rose-400',
            },
        ],
    },
);

export const inputOtpItemTextStyles = cva('text-xl font-semibold text-gray-300 dark:text-gray-600', {
    variants: {
        value: cbv('text-gray-900 dark:text-gray-50'),
        success: cbv('text-green-500'),
        error: cbv('text-rose-500'),
    },
});
