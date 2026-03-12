import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const radioGroupStyles = cva('flex flex-col gap-3');

export const radioGroupItemStyles = cva(
    'relative flex cursor-pointer rounded-lg border bg-white dark:bg-white/5 p-4 shadow-sm focus:s-ring',
    {
        variants: {
            checked: {
                true: 'border-spartan-primary-600 outline outline-1 -outline-offset-2 outline-spartan-primary-600',
                false: 'border-gray-300 dark:border-white/10',
            },
            disabled: cbv('pointer-events-none opacity-50 cursor-default'),
        },
    },
);

export const radioGroupItemTitleStyles = cva('block text-sm font-medium text-gray-900 dark:text-gray-50');

export const radioGroupItemDescriptionStyles = cva('mt-1 flex items-center text-sm text-gray-500 dark:text-gray-400');

export const radioGroupItemFooterStyles = cva('mt-6 text-sm font-medium text-gray-900 dark:text-gray-50');

export const radioGroupItemIconStyles = cva('size-5 text-spartan-primary-600');
