import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv, roundedClass } from '@/helpers';

type TSizeVariant = 'sm' | 'md' | 'lg';
const size: Record<'text' | 'noText', Record<TSizeVariant, string>> = {
    text: {
        sm: 'h-7 py-1.5 px-[10px] text-xs',
        md: 'h-9 py-2 px-4 text-sm',
        lg: 'h-11 py-[10px] px-6 text-base',
    },
    noText: {
        sm: 'h-7 p-1.5',
        md: 'h-9 p-2',
        lg: 'h-11 p-[10px]',
    },
};

export type TButtonStyles = VariantProps<typeof buttonStyles> & { size: TSizeVariant };
export const buttonStyles = cva(
    'inline-flex items-center justify-center h-fit w-fit border font-medium transition focus:outline-none gap-2 box-border',
    {
        variants: {
            variant: {
                primary: [
                    'text-white focus-within:s-ring',
                    'bg-spartan-primary-600 hover:bg-spartan-primary-700',
                    'border-spartan-primary-600 shadow-sm',
                ],
                secondary: [
                    'text-gray-900 dark:text-gray-50 focus-within:s-ring-secondary',
                    'bg-white dark:bg-white/5 hover:bg-gray-50',
                    'border-gray-300 dark:border-white/10 focus:ring-gray-300 shadow-sm',
                ],
                danger: [
                    'text-white focus-within:s-ring-error',
                    'bg-red-500 hover:bg-red-600',
                    'border-red-500 focus:ring-red-300 shadow-sm',
                ],
            },
            outline: cbv(),
            link: cbv(),
            circular: cbv(),
            rounded: roundedClass,
            loading: cbv('text-transparent select-none pointer-events-none'),
            disabled: cbv('opacity-50 pointer-events-none'),
            'size:text': size.text,
            'size:noText': size.noText,
        },
        compoundVariants: [
            // outline=true overrides per variant
            {
                variant: 'primary',
                outline: true,
                class: 'text-spartan-primary-600 bg-transparent hover:bg-spartan-primary-50 border-spartan-primary-600',
            },
            {
                variant: 'secondary',
                outline: true,
                class: 'text-gray-900 dark:text-gray-50 bg-transparent dark:bg-transparent hover:bg-gray-50 border-gray-300 dark:border-white/10',
            },
            {
                variant: 'danger',
                outline: true,
                class: 'text-red-500 bg-transparent hover:bg-red-50 border-red-500',
            },

            // link=true overrides per variant
            {
                variant: 'primary',
                link: true,
                class: 'text-spartan-primary-600 hover:text-spartan-primary-700 bg-transparent border-transparent shadow-none',
            },
            {
                variant: 'secondary',
                link: true,
                class: 'text-gray-900 dark:text-gray-50 hover:text-gray-700 bg-transparent dark:bg-transparent border-transparent dark:border-transparent shadow-none',
            },
            {
                variant: 'danger',
                link: true,
                class: 'text-red-500 hover:text-red-700 bg-transparent border-transparent shadow-none',
            },

            // circular=true forces round shape per size
            { circular: true, 'size:noText': 'sm', class: 'rounded-full' },
            { circular: true, 'size:noText': 'md', class: 'rounded-full' },
            { circular: true, 'size:noText': 'lg', class: 'rounded-full' },
        ],
    },
);
