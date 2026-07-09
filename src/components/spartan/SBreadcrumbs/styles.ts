import { cva, type VariantProps } from 'class-variance-authority';
import { createBooleanVariation as cbv } from '@/helpers';

export type TBreadcrumbsItemStyles = VariantProps<typeof breadcrumbsItemStyles>;
export const breadcrumbsItemStyles = cva(
    'flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-800 dark:text-gray-50 dark:hover:text-white',
    {
        variants: {
            active: cbv('text-gray-800 dark:text-gray-50'),
        },
    },
);
