import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';
import { SCN } from '@/constants';

export type TComboboxStyles = VariantProps<typeof comboboxStyles>;
export const comboboxStyles = cva(
    ['relative bg-white border border-gray-300 focus-visible:outline-none', SCN.focusWithinRingPrimary],
    {
        variants: {
            rounded: roundedClass,
            disabled: cbv('cursor-not-allowed opacity-50'),
            error: cbv([SCN.focusWithinRingDanger, 'border-red-300']),
        },
    },
);

export const comboboxInputStyles = cva(
    'w-full border-none py-2 pl-3 pr-8 text-sm text-gray-900 focus:ring-0 disabled:pointer-events-none',
    {
        variants: { rounded: roundedClass },
    },
);

export const comboboxButtonStyles = cva('disabled:pointer-events-none', {
    variants: {
        rounded: roundedClass,
        search: cbv(
            'absolute inset-y-0 right-0 w-8',
            'relative w-full cursor-pointer py-2 pl-3 pr-8 text-left text-sm focus:outline-none',
        ),
    },
});
