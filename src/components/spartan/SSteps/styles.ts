import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export type TStepsStyles = VariantProps<typeof stepsStyles>;
export const stepsStyles = cva('', {
    variants: {
        variant: {
            simple: 'space-y-4 md:flex md:space-x-8 md:space-y-0',
            circlesWithText: 'overflow-hidden',
        },
    },
});

export type TStepDotStyles = VariantProps<typeof stepDotStyles>;
export const stepDotStyles = cva('h-2.5 w-2.5 rounded-full', {
    variants: {
        current: cbv('bg-spartan-primary-500', 'bg-transparent group-hover:bg-gray-300 dark:group-hover:bg-gray-600'),
    },
});
