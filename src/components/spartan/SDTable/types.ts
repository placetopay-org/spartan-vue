import type { TPaginatorProps } from '@spartan';
import type { ClassNameValue } from 'tailwind-merge';
import type { Component } from 'vue';

export type TDTableProps = {
    /**
     * @en Custom CSS classes to apply to the table container.
     * @es Clases CSS personalizadas para aplicar al contenedor de la tabla.
     */
    class?: ClassNameValue;

    /**
     * @en Removes the outer border of the table.
     * @es Elimina el borde exterior de la tabla.
     * @default false
     */
    borderless?: boolean;

    /**
     * @en Paginator configuration passed to the internal SPaginator component.
     * @es Configuración del paginador que se pasa al componente interno SPaginator.
     */
    paginator?: TPaginatorProps;

    /**
     * @en Array of row data objects to display in the table.
     * @es Lista de objetos de datos de fila para mostrar en la tabla.
     */
    data: Record<string, any>[];

    /**
     * @en Function that returns a URL for each row, making the row clickable.
     * @es Función que retorna una URL por cada fila, haciendo la fila clicable.
     */
    rowLink?: (row: Record<string, any>) => string;

    /**
     * @en Custom component to use as the row link wrapper (e.g., a router-link).
     * @es Componente personalizado para usar como envoltorio del enlace de fila (ej. router-link).
     */
    rowLinkAs?: Component;

    /**
     * @en Reduces the vertical padding of table cells for a more compact layout.
     * @es Reduce el relleno vertical de las celdas para un diseño más compacto.
     * @default false
     */
    slim?: boolean;

    /**
     * @en Shows a skeleton loading state in the table body.
     * @es Muestra un estado de carga con esqueletos en el cuerpo de la tabla.
     * @default false
     */
    loading?: boolean;
};

export type TDColumnProps = {
    /**
     * @en The data field key to display in this column.
     * @es La clave del campo de datos a mostrar en esta columna.
     */
    field?: string | symbol;

    /**
     * @en The header label text for this column.
     * @es El texto de encabezado para esta columna.
     */
    header?: string;

    /**
     * @en Prevents this column from being wrapped in a row link.
     * @es Evita que esta columna sea envuelta en el enlace de fila.
     * @default false
     */
    noLink?: boolean;

    /**
     * @en Enables sorting for this column. Set to 'asc' or 'des' to indicate the current sort direction.
     * @es Habilita el ordenamiento para esta columna. Establece 'asc' o 'des' para indicar la dirección actual.
     */
    sort?: 'asc' | 'des' | boolean;

    /**
     * @en Removes default cell styling from this column.
     * @es Elimina el estilo por defecto de la celda en esta columna.
     * @default false
     */
    unstyled?: boolean;

    /**
     * @en Renders an expand/collapse toggle button in this column.
     * @es Renderiza un botón de expandir/colapsar en esta columna.
     * @default false
     */
    expander?: boolean;
};

export type TDTableEmits = {
    /**
     * @en Emitted when a column sort is triggered, with the field and new sort direction.
     * @es Se emite cuando se activa el ordenamiento de una columna, con el campo y la nueva dirección.
     */
    (event: 'sort', value: Pick<TDColumnProps, 'field' | 'sort'>): void;

    /**
     * @en Emitted when the paginator state changes (page number, page size, or direction).
     * @es Se emite cuando cambia el estado del paginador (número de página, tamaño o dirección).
     */
    (event: 'paginatorChange', value: { page?: number; size?: number; dir?: 'prev' | 'next' }): void;
    (event: 'toggleExpanders', value: Record<string | symbol, any>): void;
};
