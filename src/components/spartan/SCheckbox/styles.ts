import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const checkboxContainerStyles = cva('flex w-full gap-3', {
    variants: {
        reverse: cbv('flex-row-reverse justify-between'),
        disabled: cbv('pointer-events-none opacity-50'),
    },
});

export const checkboxInputStyles = cva(
    'cursor-pointer rounded border border-gray-300 dark:border-white/10 dark:bg-white/5 text-spartan-primary-600 accent-spartan-primary-600 focus:ring-offset-0 focus:s-ring',
);

export const checkboxLabelStyles = cva('text-sm font-semibold text-gray-900 dark:text-gray-50');

export const checkboxDescriptionStyles = cva('text-sm font-normal text-gray-500 dark:text-gray-400');
