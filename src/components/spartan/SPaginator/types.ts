export type TPaginatorProps = {
    paginatorSize?: string;
    pageSizes?: number[];
    variant?: 'numeric' | 'compact';
    page: number; 
    size: number; 
    total: number;
    class?: string;
    hideWhenSinglePage?: boolean;
};

export type TPaginatorEmits = {
    (event: 'change', value: { page?: number; size?: number }): void
    (event: 'update:size', value: number): void
    (event: 'update:page', value: number): void
};