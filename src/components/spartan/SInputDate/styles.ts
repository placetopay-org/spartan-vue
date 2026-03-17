import { cva } from 'class-variance-authority';

export const inputDateStyles = cva('w-full', {
    variants: {
        error: {
            true: '[&_input]:border-red-500 [&_input]:focus:s-outline-error',
            false: '[&_input]:focus:s-outline',
        },
    },
    defaultVariants: {
        error: false,
    },
});
