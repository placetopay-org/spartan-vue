import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export type TPanelIconStyles = VariantProps<typeof panelIconStyles>;
export const panelIconStyles = cva('h-6 w-6 shrink-0', {
    variants: {
        valid: cbv('text-emerald-400', 'text-gray-300 dark:text-gray-600'),
    },
});
