import { cva, type VariantProps } from 'class-variance-authority';

export type TColorSwitchContainerStyles = VariantProps<typeof colorSwitchContainerStyles>;
export const colorSwitchContainerStyles = cva(
    'flex items-center gap-0.5 rounded-full bg-gray-200 p-0.5 dark:bg-gray-700',
);

export type TColorSwitchButtonStyles = VariantProps<typeof colorSwitchButtonStyles>;
export const colorSwitchButtonStyles = cva('rounded-full p-1 transition-all cursor-pointer', {
    variants: {
        active: {
            true: 'bg-white shadow-sm dark:bg-gray-600',
            false: '',
        },
    },
    defaultVariants: {
        active: false,
    },
});

export type TColorSwitchIconStyles = VariantProps<typeof colorSwitchIconStyles>;
export const colorSwitchIconStyles = cva('h-4 w-4 text-gray-700 dark:text-gray-300');
