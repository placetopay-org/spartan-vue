import type { Component, FunctionalComponent } from 'vue';

export type TBreadcrumbsItemProps = {
    /**
     * @en Whether this is the first item in the breadcrumb trail. Hides the chevron separator.
     * @es Indica si este es el primer elemento del breadcrumb. Oculta el separador de chevron.
     */
    first?: boolean;

    /**
     * @en The URL this breadcrumb item links to.
     * @es La URL a la que enlaza este elemento del breadcrumb.
     */
    href: string;

    /**
     * @en Whether this item represents the current page. Applies active styling and sets `aria-current="page"`.
     * @es Indica si este elemento representa la página actual. Aplica estilos activos y establece `aria-current="page"`.
     */
    active?: boolean;

    /**
     * @en Optional icon component to display before the breadcrumb text.
     * @es Componente de icono opcional para mostrar antes del texto del breadcrumb.
     */
    icon?: FunctionalComponent;

    /**
     * @en The element or component to render the breadcrumb item as. Useful for router link integration.
     * @es El elemento o componente como el cual renderizar el elemento del breadcrumb. Útil para integración con router link.
     * @default 'a'
     */
    as?: string | Component;
};
