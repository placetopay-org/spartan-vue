import { cva, type VariantProps } from 'class-variance-authority';

export type TDropdownStyles = VariantProps<typeof dropdownStyles>;

export const dropdownStyles = cva(
    'overflow-hidden rounded-md bg-white dark:bg-gray-800 shadow-2xl ring-1 ring-gray-100 dark:ring-white/10 focus:outline-none',
    {
        variants: {
            variant: {
                default: 'divide-y divide-gray-100 dark:divide-gray-700',
                compact: 'py-1',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);

export type TDropdownItemStyles = VariantProps<typeof dropdownItemStyles>;

export const dropdownItemStyles = cva(
    'group flex w-full items-center gap-3 text-sm text-nowrap text-gray-700 dark:text-gray-300',
    {
        variants: {
            variant: {
                default: 'px-3 py-3',
                compact: 'px-3 py-2',
            },
        },
        defaultVariants: {
            variant: 'default',
        },
    },
);
