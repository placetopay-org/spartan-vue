import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export const popoverContainerStyles = cva('absolute z-40', {
    variants: {
        responsive: cbv('bottom-0 left-0 w-full md:bottom-auto md:left-auto md:w-auto'),
    },
});

export const popoverFloatingStyles = cva('', {
    variants: {
        responsive: cbv('m-4 md:m-0'),
    },
});

export const arrowStyles = cva('pointer-events-none absolute -z-[1] h-3 w-3 rounded-sm', {
    variants: {
        color: {
            dark: 'bg-[#101828]',
            light: 'bg-white',
            auto: 'bg-white dark:bg-[#101828]',
        },
    },
});
export type TArrowpStyles = VariantProps<typeof arrowStyles>;
