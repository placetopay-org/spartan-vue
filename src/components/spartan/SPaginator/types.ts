export type TLaravelPagination = {
    total?: number;
    per_page?: number;
    current_page?: number;
    last_page?: number;
    first_page_url?: string | null;
    last_page_url?: string | null;
    next_page_url?: string | null;
    prev_page_url?: string | null;
    path?: string;
    from?: number;
    to?: number;
    links?: {
        url: string | null;
        label: string;
        active?: boolean;
    }[];
    data?: any[];
};

export type TLaravelResource = {
    links?: {
        first?: string | null;
        last?: string | null;
        prev?: string | null;
        next?: string | null;
    };
    meta?: {
        current_page?: number;
        from?: number;
        last_page?: number;
        path?: string;
        per_page?: number;
        to?: number;
        total?: number;
        links?: {
            url: string | null;
            label: string;
            active?: boolean;
        }[];
    };
    data?: any[];
};

export type TPaginatorProps = {
    paginatorSize?: string;
    pageSizes?: number[];
    hideNumbers?: boolean;
    page?: number; //
    size?: number; //
    total?: number; //
    count?: number; //
    class?: string;
    hideWhenSinglePage?: boolean;
    canGoPrev?: boolean;
    canGoNext?: boolean;
    fitSize?: boolean;
    inertiaRouter?: any;
    laravel?: (TLaravelPagination | TLaravelResource) & { asLinks?: any };
};

export type TPaginatorEmits = {
    (event: 'change', value: { page?: number; size?: number; dir?: 'prev' | 'next' }): void;
    (event: 'update:size', value: number): void;
    (event: 'update:page', value: number): void;
};
