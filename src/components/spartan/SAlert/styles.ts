import { cva, type VariantProps } from 'class-variance-authority';

const compoundVariant = (color: string, variant: string, className: string): any => ({
    color,
    variant,
    class: className,
});

export type TAlertStyles = VariantProps<typeof alertStyles>;
export const alertStyles = cva('relative overflow-hidden w-full rounded-lg p-4 flex gap-2.5 items-start', {
    variants: {
        variant: {
            solid: '',
            outline: 'border',
            soft: '',
            subtle: 'border',
        },
        color: {
            neutral: 'bg-neutral-50 dark:bg-neutral-800',
            primary: 'bg-spartan-primary-400 dark:bg-spartan-primary-500',
            secondary: 'bg-zinc-900 dark:bg-zinc-700',
            success: 'bg-green-400 dark:bg-green-500',
            info: 'bg-blue-400 dark:bg-blue-500',
            warning: 'bg-yellow-400 dark:bg-yellow-500',
            error: 'bg-red-400 dark:bg-red-500',
        },
    },
    compoundVariants: [
        // Solid variants
        compoundVariant('neutral', 'solid', 'dark:text-neutral-100'),
        compoundVariant('primary', 'solid', 'text-white'),
        compoundVariant('secondary', 'solid', 'text-white'),
        compoundVariant('success', 'solid', 'text-white'),
        compoundVariant('info', 'solid', 'text-white'),
        compoundVariant('warning', 'solid', 'text-white'),
        compoundVariant('error', 'solid', 'text-white'),

        // Outline variants
        compoundVariant(
            'neutral',
            'outline',
            'bg-transparent dark:bg-transparent border-neutral-500/25 dark:border-neutral-400/25 text-neutral-500 dark:text-neutral-400',
        ),
        compoundVariant(
            'primary',
            'outline',
            'bg-transparent dark:bg-transparent border-spartan-primary-500/25 dark:border-spartan-primary-400/25 text-spartan-primary-500 dark:text-spartan-primary-400',
        ),
        compoundVariant(
            'secondary',
            'outline',
            'bg-transparent dark:bg-transparent border-zinc-900/25 dark:border-zinc-400/25 text-zinc-900 dark:text-zinc-400',
        ),
        compoundVariant(
            'success',
            'outline',
            'bg-transparent dark:bg-transparent border-green-500/25 dark:border-green-400/25 text-green-500 dark:text-green-400',
        ),
        compoundVariant(
            'info',
            'outline',
            'bg-transparent dark:bg-transparent border-blue-500/25 dark:border-blue-400/25 text-blue-500 dark:text-blue-400',
        ),
        compoundVariant(
            'warning',
            'outline',
            'bg-transparent dark:bg-transparent border-yellow-500/25 dark:border-yellow-400/25 text-yellow-500 dark:text-yellow-400',
        ),
        compoundVariant(
            'error',
            'outline',
            'bg-transparent dark:bg-transparent border-red-500/25 dark:border-red-400/25 text-red-500 dark:text-red-400',
        ),

        // Soft variants
        compoundVariant(
            'neutral',
            'soft',
            'bg-neutral-500/10 dark:bg-neutral-400/10 text-neutral-500 dark:text-neutral-400',
        ),
        compoundVariant(
            'primary',
            'soft',
            'bg-spartan-primary-500/10 dark:bg-spartan-primary-400/10 text-spartan-primary-500 dark:text-spartan-primary-400',
        ),
        compoundVariant('secondary', 'soft', 'bg-zinc-900/10 dark:bg-zinc-400/10 text-zinc-900 dark:text-zinc-400'),
        compoundVariant('success', 'soft', 'bg-green-500/10 dark:bg-green-400/10 text-green-500 dark:text-green-400'),
        compoundVariant('info', 'soft', 'bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400'),
        compoundVariant(
            'warning',
            'soft',
            'bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400',
        ),
        compoundVariant('error', 'soft', 'bg-red-500/10 dark:bg-red-400/10 text-red-500 dark:text-red-400'),

        // Subtle variants
        compoundVariant(
            'neutral',
            'subtle',
            'bg-neutral-500/10 dark:bg-neutral-400/10 text-neutral-500 dark:text-neutral-400 border-neutral-500/25 dark:border-neutral-400/25',
        ),
        compoundVariant(
            'primary',
            'subtle',
            'bg-spartan-primary-500/10 dark:bg-spartan-primary-400/10 text-spartan-primary-500 dark:text-spartan-primary-400 border-spartan-primary-500/25 dark:border-spartan-primary-400/25',
        ),
        compoundVariant(
            'secondary',
            'subtle',
            'bg-zinc-900/10 dark:bg-zinc-400/10 text-zinc-900 dark:text-zinc-400 border-zinc-900/25 dark:border-zinc-400/25',
        ),
        compoundVariant(
            'success',
            'subtle',
            'bg-green-500/10 dark:bg-green-400/10 text-green-500 dark:text-green-400 border-green-500/25 dark:border-green-400/25',
        ),
        compoundVariant(
            'info',
            'subtle',
            'bg-blue-500/10 dark:bg-blue-400/10 text-blue-500 dark:text-blue-400 border-blue-500/25 dark:border-blue-400/25',
        ),
        compoundVariant(
            'warning',
            'subtle',
            'bg-yellow-500/10 dark:bg-yellow-400/10 text-yellow-500 dark:text-yellow-400 border-yellow-500/25 dark:border-yellow-400/25',
        ),
        compoundVariant(
            'error',
            'subtle',
            'bg-red-500/10 dark:bg-red-400/10 text-red-500 dark:text-red-400 border-red-500/25 dark:border-red-400/25',
        ),
    ],
});
