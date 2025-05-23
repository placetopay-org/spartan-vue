import { cva, type VariantProps } from 'class-variance-authority';

export const tooltipStyles = cva(['shadow-lg px-3 py-2 rounded-lg', 'focus-visible:outline-none'], {
    variants: {
        color: {
            dark: 'bg-[#101828] text-white',
            light: 'bg-white text-[#344054]',
            auto: 'bg-white dark:bg-[#101828] text-[#344054] dark:text-white',
        },
    },
});
export type TTooltipStyles = VariantProps<typeof tooltipStyles>;
