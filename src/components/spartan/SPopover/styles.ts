import { cva } from 'class-variance-authority';
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
