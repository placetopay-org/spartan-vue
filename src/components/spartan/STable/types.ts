import type { ClassNameValue } from 'tailwind-merge';

export type TTableProps = {
    class?: ClassNameValue;
    borderless: boolean;
    cols: string[];
    rows: string[];
    highlight: number[];
};

export type TTableHeadCellProps = {
    class?: ClassNameValue;
};

export type TTableEmits = Record<string, never>;
