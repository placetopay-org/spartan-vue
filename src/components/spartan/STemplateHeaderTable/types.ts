export type TTemplateHeaderTableProps = {
    /**
     * @en The title displayed at the top of the table header section.
     * @es El título que se muestra en la parte superior de la sección de encabezado de la tabla.
     */
    title: string;
};

export type TTemplateHeaderTableEmits = {
    /**
     * @en Emitted when the user submits a search query.
     * @es Se emite cuando el usuario envía una consulta de búsqueda.
     */
    (e: 'search', query: string): void;
};
