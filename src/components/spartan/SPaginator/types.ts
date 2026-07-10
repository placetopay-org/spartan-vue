import type { Component } from 'vue';

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
    data?: unknown[];
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
    data?: unknown[];
};

/**
 * @en Minimal structural contract for the Inertia.js router: only `visit` is invoked by the paginator.
 * @es Contrato estructural mínimo para el router de Inertia.js: el paginador solo invoca `visit`.
 */
export type TInertiaRouter = {
    visit: (href: string) => void;
};

export type TPaginatorProps = {
    /**
     * @en Number of page buttons rendered on each side of the current page before collapsing into ellipsis.
     * @es Número de botones de página renderizados a cada lado de la página actual antes de colapsar en elipsis.
     */
    paginatorSize?: string;

    /**
     * @en Available page sizes for the "showing X results" select.
     * @es Tamaños de página disponibles para el select de "mostrando X resultados".
     */
    pageSizes?: number[];

    /**
     * @en Hides the numbered page buttons, leaving only the prev/next controls.
     * @es Oculta los botones numerados de página, dejando solo los controles anterior/siguiente.
     */
    hideNumbers?: boolean;

    /**
     * @en The current page (v-model:page binding).
     * @es La página actual (enlace v-model:page).
     */
    page?: number;

    /**
     * @en The current page size (v-model:size binding).
     * @es El tamaño de página actual (enlace v-model:size).
     */
    size?: number;

    /**
     * @en Total number of records across all pages.
     * @es Número total de registros en todas las páginas.
     */
    total?: number;

    /**
     * @en Total number of pages. Computed from `total` and `size` when omitted.
     * @es Número total de páginas. Se calcula a partir de `total` y `size` cuando se omite.
     */
    count?: number;

    /**
     * @en Additional CSS classes for the paginator container.
     * @es Clases CSS adicionales para el contenedor del paginador.
     */
    class?: string;

    /**
     * @en Hides the whole paginator when there is only a single page.
     * @es Oculta el paginador por completo cuando solo hay una página.
     */
    hideWhenSinglePage?: boolean;

    /**
     * @en Overrides whether the previous button is enabled.
     * @es Sobrescribe si el botón de anterior está habilitado.
     */
    canGoPrev?: boolean;

    /**
     * @en Overrides whether the next button is enabled.
     * @es Sobrescribe si el botón de siguiente está habilitado.
     */
    canGoNext?: boolean;

    /**
     * @en Reserved. Currently has no effect on the paginator.
     * @es Reservado. Actualmente no tiene efecto en el paginador.
     */
    fitSize?: boolean;

    /**
     * @en Inertia.js router instance used to navigate Laravel pagination links without full page reloads.
     * @es Instancia del router de Inertia.js usada para navegar los enlaces de paginación de Laravel sin recargas completas.
     */
    inertiaRouter?: TInertiaRouter;

    /**
     * @en Laravel paginator or API resource payload. `asLinks` renders page items with the given element or component (e.g. Inertia `Link`).
     * @es Payload del paginador de Laravel o de un API resource. `asLinks` renderiza los elementos de página con el elemento o componente dado (ej. `Link` de Inertia).
     */
    laravel?: (TLaravelPagination | TLaravelResource) & { asLinks?: string | Component };
};

export type TPaginatorEmits = {
    /**
     * @en Emitted on any pagination change with the new page, size, or direction.
     * @es Se emite en cualquier cambio de paginación con la nueva página, tamaño o dirección.
     */
    (event: 'change', value: { page?: number; size?: number; dir?: 'prev' | 'next' }): void;

    /**
     * @en Emitted when the page size changes.
     * @es Se emite cuando el tamaño de página cambia.
     */
    (event: 'update:size', value: number): void;

    /**
     * @en Emitted when the current page changes.
     * @es Se emite cuando la página actual cambia.
     */
    (event: 'update:page', value: number): void;
};
