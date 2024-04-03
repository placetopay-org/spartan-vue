export type TPaginatorProps = {
    paginatorSize?: string;
    pageSizes?: number[];
    modelValue: { page: number; size: number; count: number };
};

export type TPaginatorEmits = {
    (event: 'update:modelValue', value: { page: number; size: number; count: number}): void
    (event: 'update:size', value: number): void
    (event: 'update:page', value: number): void
};