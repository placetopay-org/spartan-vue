import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';
import { inputStyle, roundedStyle } from '@/constants';

export type TInputContainerStyles = VariantProps<typeof inputContainerStyles>;
export const inputContainerStyles = cva(`h-9 relative flex gap-2 ${inputStyle.root}`, {
    variants: {
        disabled: cbv(inputStyle.disabled),
        error: cbv(
            `${inputStyle.border.error} ${inputStyle.ring.error}`,
            `${inputStyle.border.base} ${inputStyle.ring.base}`,
        ),
        rounded: roundedStyle,
    },
});

export type TSelectButtonStyles = VariantProps<typeof buttonStyles>;
export const buttonStyles = cva([inputStyle.root, inputStyle.padding, 'gap-3 inline-flex items-center'], {
    variants: {
        disabled: cbv('bg-gray-50 dark:bg-white/5 pointer-events-none'),
        error: cbv(
            `${inputStyle.border.error} ${inputStyle.ring.error}`,
            `${inputStyle.border.base} ${inputStyle.ring.base}`,
        ),
        rounded: roundedStyle,
    },
});

export type TSelectOptionStyles = VariantProps<typeof optionStyles>;
export const optionStyles = cva('relative text-sm flex items-center w-full py-2 px-3 text-gray-900 dark:text-gray-50 hover:bg-gray-50 dark:hover:bg-white/10', {
    variants: {
        selected: cbv('font-semibold'),
        disabled: cbv('opacity-50 cursor-not-allowed'),
    },
});
