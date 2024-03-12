import { cva, type VariantProps } from 'class-variance-authority';
import { SCN } from '@/constants';
import { createBooleanVariation as cbv } from '@/helpers';

type TSizeVariant = 'sm' | 'md';
const size: Record<'text' | 'noText', Record<TSizeVariant, string>> = {
    text: {
        sm: 'py-2 px-3 text-xs',
        md: 'py-3 px-6 text-sm',
    },
    noText: {
        sm: 'p-1',
        md: 'p-3',
    },
};

export type TButtonStyles = VariantProps<typeof buttonStyles> & { size: TSizeVariant };
export const buttonStyles = cva(
    'inline-flex items-center justify-center h-fit w-fit border font-medium transition focus:outline-none gap-2',
    {
        variants: {
            variant: {
                primary: [
                    'text-white',
                    'bg-primary-600 hover:bg-primary-700',
                    'border-primary-600 shadow-sm',
                    SCN.focusRingPrimary,
                ],
                secondary: [
                    'text-gray-900',
                    'bg-white hover:bg-gray-50',
                    'border-gray-300 focus:ring-gray-300 shadow-sm',
                    SCN.focusRingSecondary,
                ],
                danger: [
                    'text-white',
                    'bg-red-500 hover:bg-red-600',
                    'border-red-500 focus:ring-red-300 shadow-sm',
                    SCN.focusRingDanger,
                ],
                outline: [
                    'text-primary-600',
                    'bg-white hover:bg-primary-50',
                    'border-primary-600 shadow-sm',
                    SCN.focusRingPrimary,
                ],
                link: ['text-primary-600 hover:text-primary-700', 'bg-transparent', 'border-transparent'],
            },
            rounded: {
                left: 'rounded-l-lg',
                right: 'rounded-r-lg',
                both: 'rounded-lg',
                none: '',
                full: 'rounded-full',
            },
            loading: cbv('loading'),
            disabled: cbv('opacity-50 pointer-events-none'),
            'size:text': size.text,
            'size:noText': size.noText,
        },
    },
);
