import { cva } from 'class-variance-authority';

export const inputDateStyles = cva('w-full', {
    variants: {
        error: {
            true: '[&_input]:border-red-500 [&_input]:focus:s-ring-error hover:[&_input]:border-red-500',
            false: '[&_input]:border-gray-300 dark:[&_input]:border-white/10 [&_input]:focus:s-ring hover:[&_input]:border-gray-300 dark:hover:[&_input]:border-white/10',
        },
    },
    defaultVariants: {
        error: false,
    },
});
