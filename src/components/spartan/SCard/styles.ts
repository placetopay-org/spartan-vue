
import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export type TCardStyles = VariantProps<typeof cardStyles>;
export const cardStyles = cva('flex flex-col bg-white shadow overflow-hidden', {
    variants: {
        size: {
            sm: 'rounded-md',
            md: 'rounded-xl',
        }
    },
});

export type TBodyStyles = VariantProps<typeof bodyStyles>;
export const bodyStyles = cva('flex flex-col h-full', {
    variants: {
        size: {
            sm: 'px-2 py-1 sm:px-4 sm:py-2',
            md: 'px-4 py-5 sm:p-8',
        }
    },
});
