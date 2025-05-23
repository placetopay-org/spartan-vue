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
            primary: 'bg-spartan-primary-100 text-spartan-primary-600',
            gray: 'bg-gray-100 text-gray-700',
            red: 'bg-red-100 text-red-700',
            blue: 'bg-blue-100 text-blue-700',
            green: 'bg-green-100 text-green-700',
            yellow: 'bg-yellow-100 text-yellow-700',
            indigo: 'bg-indigo-100 text-indigo-700',
            white: 'bg-white text-gray-700',
            purple: 'bg-purple-100 text-purple-700',
            neutral: 'bg-neutral-950 text-white',
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
        compoundColor('primary', 'bg-spartan-primary-50 outline-spartan-primary-300'),
        compoundColor('gray', 'bg-gray-50 outline-gray-300'),
        compoundColor('red', 'bg-red-50 outline-red-300'),
        compoundColor('blue', 'bg-blue-50 outline-blue-300'),
        compoundColor('green', 'bg-green-50 outline-green-300'),
        compoundColor('yellow', 'bg-yellow-50 outline-yellow-300'),
        compoundColor('indigo', 'bg-indigo-50 outline-indigo-300'),
        compoundColor('white', 'bg-white outline-gray-300'),
        compoundColor('purple', 'bg-purple-50 outline-purple-300'),
        compoundColor('neutral', 'bg-neutral-700 outline-neutral-950'),
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
            primary: 'fill-spartan-primary-400',
            gray: 'fill-gray-400',
            red: 'fill-red-400',
            blue: 'fill-blue-400',
            green: 'fill-green-400',
            yellow: 'fill-yellow-400',
            indigo: 'fill-indigo-400',
            white: 'fill-gray-400',
            purple: 'fill-purple-400',
            neutral: 'fill-white',
        },
    },
});

export type TTagStyles = VariantProps<typeof tagStyles>;
export const tagStyles = cva('px-2 font-medium rounded-sm', {
    variants: {
        color: {
            primary: 'bg-spartan-primary-50',
            gray: 'bg-gray-50',
            red: 'bg-red-50',
            blue: 'bg-blue-50',
            green: 'bg-green-50',
            yellow: 'bg-yellow-50',
            indigo: 'bg-indigo-50',
            white: 'bg-gray-100',
            purple: 'bg-purple-50',
            neutral: 'bg-neutral-700',
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
