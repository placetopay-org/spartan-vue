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
            neutral: 'bg-neutral-50',
            primary: 'bg-spartan-primary-400',
            secondary: 'bg-zinc-900',
            success: 'bg-green-400',
            info: 'bg-blue-400',
            warning: 'bg-yellow-400',
            error: 'bg-red-400',
        },
    },
    compoundVariants: [
        // Solid variants
        compoundVariant('neutral', 'solid', ''),
        compoundVariant('primary', 'solid', 'text-white'),
        compoundVariant('secondary', 'solid', 'text-white'),
        compoundVariant('success', 'solid', 'text-white'),
        compoundVariant('info', 'solid', 'text-white'),
        compoundVariant('warning', 'solid', 'text-white'),
        compoundVariant('error', 'solid', 'text-white'),

        // Outline variants
        compoundVariant('neutral', 'outline', 'bg-transparent border-neutral-500/25 text-neutral-500'),
        compoundVariant('primary', 'outline', 'bg-transparent border-spartan-primary-500/25 text-spartan-primary-500'),
        compoundVariant('secondary', 'outline', 'bg-transparent border-zinc-900/25 text-zinc-900'),
        compoundVariant('success', 'outline', 'bg-transparent border-green-500/25 text-green-500'),
        compoundVariant('info', 'outline', 'bg-transparent border-blue-500/25 text-blue-500'),
        compoundVariant('warning', 'outline', 'bg-transparent border-yellow-500/25 text-yellow-500'),
        compoundVariant('error', 'outline', 'bg-transparent border-red-500/25 text-red-500'),

        // Soft variants
        compoundVariant('neutral', 'soft', 'bg-neutral-500/10 text-neutral-500'),
        compoundVariant('primary', 'soft', 'bg-spartan-primary-500/10 text-spartan-primary-500'),
        compoundVariant('secondary', 'soft', 'bg-zinc-900/10 text-zinc-900'),
        compoundVariant('success', 'soft', 'bg-green-500/10 text-green-500'),
        compoundVariant('info', 'soft', 'bg-blue-500/10 text-blue-500'),
        compoundVariant('warning', 'soft', 'bg-yellow-500/10 text-yellow-500'),
        compoundVariant('error', 'soft', 'bg-red-500/10 text-red-500'),

        // Subtle variants
        compoundVariant('neutral', 'subtle', 'bg-neutral-500/10 text-neutral-500 border-neutral-500/25'),
        compoundVariant(
            'primary',
            'subtle',
            'bg-spartan-primary-500/10 text-spartan-primary-500 border-spartan-primary-500/25',
        ),
        compoundVariant('secondary', 'subtle', 'bg-zinc-900/10 text-zinc-900 border-zinc-900/25'),
        compoundVariant('success', 'subtle', 'bg-green-500/10 text-green-500 border-green-500/25'),
        compoundVariant('info', 'subtle', 'bg-blue-500/10 text-blue-500 border-blue-500/25'),
        compoundVariant('warning', 'subtle', 'bg-yellow-500/10 text-yellow-500 border-yellow-500/25'),
        compoundVariant('error', 'subtle', 'bg-red-500/10 text-red-500 border-red-500/25'),
    ],
});
