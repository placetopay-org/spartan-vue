import { cva, type VariantProps } from 'class-variance-authority';

export type TToastStyles = VariantProps<typeof toastStyles>;
export const toastStyles = cva(
    'flex max-w-sm w-full justify-between gap-3 overflow-hidden rounded-lg p-4 pl-3 shadow-md ring-1 bg-white ring-gray-200 dark:bg-gray-800 dark:ring-white/10 dark:shadow-lg',
    {
        variants: {
            leftBorder: {
                true: 'border-l-4',
                false: '',
            },
            type: {
                success: 'border-green-500',
                warning: 'border-yellow-500',
                error: 'border-red-500',
            },
        },
    },
);

export type TToastIconStyles = VariantProps<typeof toastIconStyles>;
export const toastIconStyles = cva('h-6 w-6 shrink-0', {
    variants: {
        type: {
            success: 'text-green-500',
            warning: 'text-yellow-500',
            error: 'text-red-500',
        },
    },
});
