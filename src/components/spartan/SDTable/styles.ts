import { cva, type VariantProps } from 'class-variance-authority';
import { cbv } from '@/helpers';

export const tableStyles = cva('w-full overflow-hidden', {
    variants: {
        borderless: cbv('', 'shadow rounded-2xl outline outline-1 outline-gray-300'),
    },
});
export type TTableStyles = VariantProps<typeof tableStyles>;

export const cellStyles = cva('relative first:pl-5 last:pr-5 p-3.5 text-sm text-left', {
    variants: {
        head: cbv('text-gray-900 font-semibold', 'text-gray-500'),
        slim: cbv('first:pl-4 last:pr-4 py-2 px-3 text-sm text-left'),
        unstyled: cbv('p-0 first:pl-0 last:pr-0 text-normal'),
    },
});
export type TCellStyles = VariantProps<typeof cellStyles>;
