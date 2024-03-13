import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';
import { SCN } from '@/constants';

export type TSidebarStyles = VariantProps<typeof sidebarStyles>;
export const sidebarStyles = cva(['relative bg-white border border-gray-300 focus-visible:outline-none'], {
    variants: {
        disabled: cbv('cursor-not-allowed opacity-50'),
        error: cbv([SCN.focusWithinRingDanger, 'border-red-300']),
    },
});

export const sidebarItemStyles = cva(
    'group transition duration-100 relative flex w-full items-center gap-x-2 rounded-md bg-white p-2 focus:s-ring focus:outline-none',
    {
        variants: {
            active: cbv('bg-primary-50'),
            isChild: cbv('pl-8'),
        },
    },
);

export const sidebarItemIconStyles = cva(
    ['h-6 w-6 text-gray-500'],
    {
        variants: {
            active: cbv('text-primary-500', 'group-hover:text-gray-900'),
        },
    },
);

export const sidebarItemContentStyles = cva(
    ['text-sm font-medium text-gray-500'],
    {
        variants: {
            active: cbv('text-primary-500', 'group-hover:text-gray-900'),
        },
    },
);

export const sidebarItemGroupIconStyles = cva(
    ['h-6 w-6 text-gray-500'],
    {
        variants: {
            active: cbv('text-gray-900', 'group-hover:text-gray-900'),
        },
    },
);

export const sidebarItemGroupContentStyles = cva(
    ['text-sm font-medium text-gray-500'],
    {
        variants: {
            active: cbv('text-gray-900', 'group-hover:text-gray-900'),
        },
    },
);

export const sidebarItemGroupChevronStyles = cva(
    [
        'h-5 w-5 transition text-gray-300 duration-200 ml-auto group-hover:text-gray-400',
    ],
    {
        variants: {
            open: cbv('rotate-180'),
            active: cbv('text-gray-400'),
        },
    },
);
