import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';
import { inputStyle, roundedStyle } from '@/constants';

export type TSelectStyles = VariantProps<typeof selectStyles>;
export const selectStyles = cva(
    `h-9 appearance-none ${inputStyle.root} ${inputStyle.text} ${inputStyle.placeholder} ${inputStyle.padding} pr-8`,
    {
        variants: {
            disabled: cbv(inputStyle.disabled),
            error: cbv(
                `${inputStyle.border.error} ${inputStyle.ring.error}`,
                `${inputStyle.border.base} ${inputStyle.ring.base}`,
            ),
            rounded: roundedStyle,
        },
    },
);
