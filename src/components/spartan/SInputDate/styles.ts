import { cva } from 'class-variance-authority';

export const inputDateStyles = cva('w-full', {
    variants: {
        error: {
            true: '[&_input]:outline-2 [&_input]:outline-offset-0 [&_input]:outline-transparent [&_input]:transition-[outline-offset,outline-color] [&_input]:duration-150 [&_input]:border-red-500 [&_input]:focus:s-outline-error hover:[&_input]:border-red-500',
            false: '[&_input]:outline-2 [&_input]:outline-offset-0 [&_input]:outline-transparent [&_input]:transition-[outline-offset,outline-color] [&_input]:duration-150 [&_input]:border-gray-300 dark:[&_input]:border-white/10 [&_input]:focus:s-outline hover:[&_input]:border-gray-300 dark:hover:[&_input]:border-white/10',
        },
    },
    defaultVariants: {
        error: false,
    },
});
