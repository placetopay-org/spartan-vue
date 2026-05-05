import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const switchContainerStyles = cva('flex items-center gap-3', {
    variants: {
        reverse: cbv('flex-row-reverse justify-between'),
    },
});

export const switchTrackStyles = cva(
    'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-[color,background-color,border-color,outline-offset,outline-color] duration-200 ease-in-out outline-2 outline-offset-0 outline-transparent focus:s-outline',
    {
        variants: {
            active: cbv('bg-spartan-primary-600', 'bg-gray-200 dark:bg-gray-900'),
        },
    },
);

export const switchKnobStyles = cva(
    'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white dark:bg-gray-800 shadow ring-0 transition duration-200 ease-in-out',
    {
        variants: {
            active: cbv('translate-x-5', 'translate-x-0'),
        },
    },
);

export const switchIconOffStyles = cva(
    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
    {
        variants: {
            active: cbv('opacity-0 duration-100 ease-out', 'opacity-100 duration-200 ease-in'),
        },
    },
);

export const switchIconOnStyles = cva(
    'absolute inset-0 flex h-full w-full items-center justify-center transition-opacity',
    {
        variants: {
            active: cbv('opacity-100 duration-200 ease-in', 'opacity-0 duration-100 ease-out'),
        },
    },
);

export const switchLabelStyles = cva('flex flex-col text-sm font-medium text-gray-700 dark:text-gray-50');

export const switchDescriptionStyles = cva('text-sm text-gray-500 dark:text-gray-400');
