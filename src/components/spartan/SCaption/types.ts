export type TCaptionProps = {
    /**
     * @en The text content to display in the caption. Ignored when the default slot is used.
     * @es El contenido de texto a mostrar en el caption. Se ignora cuando se usa el slot default.
     */
    text?: string;

    /**
     * @en The visual variant that determines the text color and semantic meaning.
     * @es La variante visual que determina el color del texto y el significado semántico.
     * @default 'error'
     */
    variant?: 'error' | 'info';
};
