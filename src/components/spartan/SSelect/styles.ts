import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';

export const selectStyles = cva(
    'h-9 bg-white text-base font-normal py-1.5 pl-3 pr-8 text-gray-900 border border-gray-300',
    {
        variants: {
            disabled: cbv('text-gray-400 bg-gray-50 pointer-events-none'),
            error: cbv('border-red-600 focus:s-ring-error', 'border-gray-300 focus:s-ring'),
            rounded: roundedClass
        },
    },
); 