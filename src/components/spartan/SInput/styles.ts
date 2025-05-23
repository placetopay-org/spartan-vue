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
        rightOptions: cbv('pr-0', 'pr-3'),
        leftOptions: cbv('pl-0', 'pl-3'),
    },
    compoundVariants: [
        {
            error: false,
            borderless: false,
            class: inputStyle.ring,
        },
    ],
});

export const inputStyles = cva(
    `${inputStyle.text} ${inputStyle.placeholder} ${inputStyle.padding} px-0 w-full border-none outline-none focus:ring-0`,
    {
        variants: {
            rounded: roundedStyle,
        },
    },
);
