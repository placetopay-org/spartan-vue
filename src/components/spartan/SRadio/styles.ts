import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const radioContainerStyles = cva('flex w-full gap-3', {
    variants: {
        reverse: cbv('flex-row-reverse justify-between'),
        disabled: cbv('pointer-events-none opacity-50'),
    },
});

export const radioInputStyles = cva(
    'cursor-pointer rounded-full border border-gray-300 dark:border-white/10 dark:bg-white/5 text-spartan-primary-600 accent-spartan-primary-600 outline-2 outline-offset-0 outline-transparent transition-[outline-offset,outline-color] duration-150 focus:ring-0 focus:ring-offset-0 focus:s-outline',
);

export const radioLabelStyles = cva('text-sm font-semibold text-gray-900 dark:text-gray-50');

export const radioDescriptionStyles = cva('text-sm font-normal text-gray-500 dark:text-gray-400');
