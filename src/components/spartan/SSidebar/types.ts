import type { Component, FunctionalComponent } from 'vue';

export type TSidebarEmits = (event: 'update:modelValue', value?: string) => void;

export type TSidebarProps = {
    /**
     * @en The path of the currently active item (v-model binding).
     * @es La ruta del elemento actualmente activo (enlace v-model).
     */
    modelValue: string;

    /**
     * @en Additional CSS classes for the sidebar container.
     * @es Clases CSS adicionales para el contenedor del sidebar.
     */
    class?: string;

    /**
     * @en Shows the PlacetoPay logo header. Pass a render function to display a custom header.
     * @es Muestra la cabecera con el logo de PlacetoPay. Pasa una función de renderizado para mostrar una cabecera personalizada.
     */
    placetopayHeader?: boolean | (() => any);

    /**
     * @en Enables nested path matching: an item is active when the current path starts with the item path.
     * @es Habilita coincidencia de rutas anidadas: un elemento está activo cuando la ruta actual comienza con la ruta del elemento.
     */
    nested?: boolean;
};

export type TSidebarItemProps = {
    /**
     * @en The HTML element or Vue component that will be rendered as the item (e.g. `a`, `router-link`).
     * @es El elemento HTML o componente Vue que se renderizará como el elemento (ej. `a`, `router-link`).
     */
    as: string | Component;

    /**
     * @en Unique path that identifies the item and matches it against the sidebar `modelValue`.
     * @es Ruta única que identifica el elemento y lo compara con el `modelValue` del sidebar.
     */
    path: string;

    /**
     * @en Icon component displayed at the left of the item label.
     * @es Componente de icono mostrado a la izquierda de la etiqueta del elemento.
     */
    icon: FunctionalComponent;

    /**
     * @en Forces the item to render in its active state.
     * @es Fuerza el elemento a renderizarse en su estado activo.
     */
    active: boolean;
};

export type TSidebarItemGroupProps = TSidebarItemProps & {
    /**
     * @en Renders the group as a collapsible accordion instead of a floating menu.
     * @es Renderiza el grupo como un acordeón plegable en lugar de un menú flotante.
     */
    accordion: boolean;
};

type TPath = {
    group?: string;
    activate: () => void;
    deactivate: () => void;
};

type TGroup = {
    activate: () => void;
    deactivate: () => void;
};

export type TStateDefinition = {
    paths: Record<string, TPath>;
    groups: Record<string, TGroup>;
    path: string | undefined;
    updatePath: (path?: string) => void;
    registerPath: (path: string, setActive: (value: boolean) => void, group?: string) => void;
    registerGroup: (path: string, setActive: (value: boolean) => void) => void;
};

export type TSidebarSeparatorProps = {
    /**
     * @en Title text displayed in the separator.
     * @es Texto del título mostrado en el separador.
     */
    title: string;
};
