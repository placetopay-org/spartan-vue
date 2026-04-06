import { cva } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';
import { inputStyle, roundedStyle } from '@/constants';

export const containerStyles = cva(`h-9 relative flex gap-2 ${inputStyle.root}`, {
    variants: {
        disabled: cbv(inputStyle.disabled),
        error: cbv(
            `${inputStyle.border.error} ${inputStyle.ring.error}`,
            `${inputStyle.border.base} ${inputStyle.ring.base}`,
        ),
        rounded: roundedStyle,
        borderless: cbv('border-0'),
        hasRightAddon: cbv('pr-3', 'pr-0'),
        hasLeftAddon: cbv('pl-3', 'pl-0'),
    },
    compoundVariants: [
        {
            error: false,
            borderless: false,
            class: inputStyle.ring.base,
        },
    ],
});

export const inputStyles = cva(
    `${inputStyle.text} ${inputStyle.placeholder} py-1.5 w-full border-none bg-transparent outline-none focus:ring-0`,
    {
        variants: {
            rounded: roundedStyle,
            hasLeftAddon: cbv('pl-1', 'pl-3'),
            hasRightAddon: cbv('pr-1', 'pr-3'),
        },
    },
);
