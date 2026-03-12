import type { ClassNameValue } from 'tailwind-merge';

export type TTableProps = {
    /**
     * @en Custom CSS classes to apply to the table element.
     * @es Clases CSS personalizadas para aplicar al elemento tabla.
     */
    class?: ClassNameValue;

    /**
     * @en Removes the outer border of the table.
     * @es Elimina el borde exterior de la tabla.
     * @default false
     */
    borderless: boolean;

    /**
     * @en Array of column header labels for auto-generated table head.
     * @es Lista de etiquetas de encabezado de columna para la cabecera autogenerada.
     */
    cols: string[];

    /**
     * @en Array of row data for auto-generated table body.
     * @es Lista de datos de filas para el cuerpo autogenerado de la tabla.
     */
    rows: string[];

    /**
     * @en Column indices to visually highlight in each row.
     * @es Índices de columnas a resaltar visualmente en cada fila.
     */
    highlight: number[];
};

export type TTableHeadCellProps = {
    /**
     * @en Custom CSS classes to apply to the header cell.
     * @es Clases CSS personalizadas para aplicar a la celda de encabezado.
     */
    class?: ClassNameValue;
};

export type TTableEmits = Record<string, never>;
