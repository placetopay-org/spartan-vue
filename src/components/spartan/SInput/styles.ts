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

// The container's `focus-within` outline is the only outline the field draws; the focused
// selector is told apart by a tint instead. It keys on `focus`, not `focus-visible`, because
// browsers disagree on whether a clicked `<select>` matches `:focus-visible`.
export const selectorStyles = cva(
    'rounded-lg border-none bg-transparent py-1.5 pr-8 text-sm text-gray-500 dark:text-gray-400 focus:ring-0 transition-colors duration-150 disabled:cursor-not-allowed',
    {
        variants: {
            error: cbv(
                'focus:bg-red-50 focus:text-red-700 dark:focus:bg-red-400/10 dark:focus:text-red-400',
                'focus:bg-spartan-primary-50 focus:text-spartan-primary-800 dark:focus:bg-spartan-primary-600/10 dark:focus:text-spartan-primary-400',
            ),
        },
    },
);

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
