import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

const compoundColor = (color: string, className: string): any => ({
    color,
    outline: true,
    class: className,
});

const compoundPaddingDot = (size: string, className: string): any => ({
    tag: true,
    size,
    reverse: false,
    dot: false,
    class: className,
});

const compoundPaddingCross = (size: string, className: string): any => ({
    tag: true,
    size,
    reverse: true,
    removable: false,
    class: className,
});

export type TBadgeStyles = VariantProps<typeof badgeStyles>;
export const badgeStyles = cva('inline-flex items-center font-medium h-fit w-fit rounded gap-2', {
    variants: {
        color: {
            primary:
                'bg-spartan-primary-100 text-spartan-primary-600 dark:bg-spartan-primary-400/10 dark:text-spartan-primary-400',
            gray: 'bg-gray-100 text-gray-700 dark:bg-gray-400/20 dark:text-gray-400',
            red: 'bg-red-100 text-red-700 dark:bg-red-400/10 dark:text-red-400',
            blue: 'bg-blue-100 text-blue-700 dark:bg-blue-400/10 dark:text-blue-400',
            green: 'bg-green-100 text-green-700 dark:bg-green-400/10 dark:text-green-400',
            yellow: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-400/10 dark:text-yellow-400',
            indigo: 'bg-indigo-100 text-indigo-700 dark:bg-indigo-400/10 dark:text-indigo-400',
            white: 'bg-white text-gray-700 dark:bg-white/10 dark:text-white',
            purple: 'bg-purple-100 text-purple-700 dark:bg-purple-400/10 dark:text-purple-400',
            neutral: 'bg-neutral-950 text-white dark:bg-black/50',
        },
        size: {
            sm: 'px-2.5 py-0.5 text-xs',
            md: 'px-3 py-0.5 text-sm',
            lg: 'px-3 py-1.5 text-sm',
        },
        border: cbv('border'),
        pill: cbv('rounded-full'),
        outline: cbv('outline outline-1 -outline-offset-1'),
        tag: cbv(),
        dot: cbv(),
        removable: cbv(),
        reverse: cbv(),
    },
    compoundVariants: [
        compoundColor(
            'primary',
            'bg-transparent dark:bg-transparent outline-spartan-primary-300 text-spartan-primary-700 dark:outline-spartan-primary-400/20',
        ),
        compoundColor('gray', 'bg-transparent dark:bg-transparent outline-gray-300 text-gray-700 dark:outline-gray-400/20'),
        compoundColor('red', 'bg-transparent dark:bg-transparent outline-red-300 text-red-700 dark:outline-red-400/20'),
        compoundColor('blue', 'bg-transparent dark:bg-transparent outline-blue-300 text-blue-700 dark:outline-blue-400/20'),
        compoundColor('green', 'bg-transparent dark:bg-transparent outline-green-300 text-green-700 dark:outline-green-400/20'),
        compoundColor('yellow', 'bg-transparent dark:bg-transparent outline-yellow-300 text-yellow-700 dark:outline-yellow-400/20'),
        compoundColor('indigo', 'bg-transparent dark:bg-transparent outline-indigo-300 text-indigo-700 dark:outline-indigo-400/20'),
        compoundColor('white', 'bg-transparent dark:bg-transparent outline-gray-300 text-gray-700 dark:outline-white/20'),
        compoundColor('purple', 'bg-transparent dark:bg-transparent outline-purple-300 text-purple-700 dark:outline-purple-400/20'),
        compoundColor('neutral', 'bg-transparent dark:bg-transparent outline-neutral-400 text-neutral-900 dark:outline-white/20'),
        compoundPaddingDot('sm', 'pl-0.5 pr-2.5'),
        compoundPaddingDot('md', 'pl-0.5 pr-3'),
        compoundPaddingDot('lg', 'pl-1.5 pr-3'),
        compoundPaddingCross('sm', 'pr-0.5 pl-2.5'),
        compoundPaddingCross('md', 'pr-0.5 pl-3'),
        compoundPaddingCross('lg', 'pr-1.5 pl-3'),
        {
            tag: true,
            class: 'font-normal',
        },
    ],
});

export type TBodyStyles = VariantProps<typeof bodyStyles>;
export const bodyStyles = cva('inline-flex gap-2 items-center', {
    variants: {
        reverse: cbv('flex-row-reverse'),
    },
});

export type TDotStyles = VariantProps<typeof dotStyles>;
export const dotStyles = cva('h-1.5 w-1.5', {
    variants: {
        color: {
            primary: 'fill-spartan-primary-400 dark:fill-spartan-primary-400/30',
            gray: 'fill-gray-400 dark:fill-gray-400/30',
            red: 'fill-red-400 dark:fill-red-400/30',
            blue: 'fill-blue-400 dark:fill-blue-400/30',
            green: 'fill-green-400 dark:fill-green-400/30',
            yellow: 'fill-yellow-400 dark:fill-yellow-400/30',
            indigo: 'fill-indigo-400 dark:fill-indigo-400/30',
            white: 'fill-gray-400 dark:fill-white/30',
            purple: 'fill-purple-400 dark:fill-purple-400/30',
            neutral: 'fill-white dark:fill-white/30',
        },
    },
});

export type TTagStyles = VariantProps<typeof tagStyles>;
export const tagStyles = cva('px-2 font-medium rounded-sm', {
    variants: {
        color: {
            primary: 'bg-spartan-primary-50 dark:bg-spartan-primary-400/20',
            gray: 'bg-gray-50 dark:bg-gray-400/20',
            red: 'bg-red-50 dark:bg-red-400/20',
            blue: 'bg-blue-50 dark:bg-blue-400/20',
            green: 'bg-green-50 dark:bg-green-400/20',
            yellow: 'bg-yellow-50 dark:bg-yellow-400/20',
            indigo: 'bg-indigo-50 dark:bg-indigo-400/20',
            white: 'bg-gray-100 dark:bg-white/20',
            purple: 'bg-purple-50 dark:bg-purple-400/20',
            neutral: 'bg-neutral-700 dark:bg-white/20',
        },
        pill: cbv('rounded-full'),
        outline: cbv(),
    },
    compoundVariants: [
        {
            outline: true,
            class: 'bg-white',
        },
        {
            outline: true,
            color: 'white',
            class: 'bg-gray-100',
        },
        {
            outline: true,
            color: 'neutral',
            class: 'bg-neutral-950',
        },
    ],
});
