import { cva, type VariantProps } from 'class-variance-authority';
import { cbv } from '@/helpers';

export const tableStyles = cva('w-full', {
    variants: {
        borderless: cbv('', 'shadow overflow-hidden rounded-2xl outline outline-1 outline-gray-300'),
    },
});
export type TTableStyles = VariantProps<typeof tableStyles>;

export const cellStyles = cva('first:pl-5 last:pr-5 p-3.5 text-sm text-left', {
    variants: {
        head: cbv('text-gray-900 font-semibold', 'text-gray-500'),
    },
});
export type TCellStyles = VariantProps<typeof cellStyles>;
