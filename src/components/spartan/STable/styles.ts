import { cva, type VariantProps } from 'class-variance-authority';
import { cbv } from '@/helpers';

export const BORDER_STYLE = 'shadow overflow-hidden rounded-2xl outline outline-1 outline-gray-300';

// divide-y divide-gray-300
export const tableStyles = cva('w-full', {
    variants: {
        borderless: cbv('', 'shadow overflow-hidden rounded-2xl outline outline-1 outline-gray-300'),
    },
});
export type TTableStyles = VariantProps<typeof tableStyles>;
