import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';
import { SCN } from '@/constants';

export type TButtonGroupItemStyles = VariantProps<typeof buttonGroupItemStyles>;
export const buttonGroupItemStyles = cva(
    [
        SCN.focusRingPrimary,
        'group active:bg-spartan-primary-50 dark:active:bg-spartan-primary-600/10 active:text-spartan-primary-600 relative inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 focus:z-20 dark:text-gray-100 dark:outline-gray-600',
    ],
    {
        variants: {
            active: cbv(
                'bg-spartan-primary-50 dark:bg-spartan-primary-600/10 text-spartan-primary-600 dark:text-spartan-primary-400 outline-spartan-primary-300 dark:outline-spartan-primary-400/25 z-10',
                'bg-white hover:bg-gray-50 dark:bg-gray-800 dark:hover:bg-gray-700',
            ),
            endIcon: cbv('flex-row-reverse'),
            disabled: cbv('pointer-events-none opacity-50'),
            first: cbv('rounded-l-md'),
            last: cbv('rounded-r-md'),
        },
    },
);

export type TButtonGroupItemIconStyles = VariantProps<typeof buttonGroupItemIconStyles>;
export const buttonGroupItemIconStyles = cva(
    'w-5 h-5 text-gray-900 dark:text-gray-100 group-active:text-spartan-primary-600',
    {
        variants: {
            active: cbv('text-spartan-primary-600 dark:text-spartan-primary-400'),
            margin: {
                start: '-ml-0.5',
                end: '-mr-0.5',
                none: '',
            },
        },
        defaultVariants: {
            margin: 'none',
        },
    },
);
