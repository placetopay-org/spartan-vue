export type TPaginatorProps = {
    paginatorSize?: string;
    pageSizes?: number[];
    hideNumbers?: boolean;
    page?: number; 
    size?: number; 
    total?: number;
    count?: number;
    class?: string;
    hideWhenSinglePage?: boolean;
};

export type TPaginatorEmits = {
    (event: 'change', value: { page?: number; size?: number, dir?: 'prev' | 'next' }): void
    (event: 'update:size', value: number): void
    (event: 'update:page', value: number): void
};