export type TCopyEmits = {
    /**
     * @en Emitted when the text is copied to the clipboard.
     * @es Se emite cuando el texto se copia al portapapeles.
     */
    (event: 'copied', value: string): void;
};

export type TCopyProps = {
    /**
     * @en The text value to copy. If not provided, the text content of the default slot will be used.
     * @es El valor de texto a copiar. Si no se proporciona, se usará el contenido de texto del slot por defecto.
     */
    value?: string;

    /**
     * @en Additional CSS classes for the component.
     * @es Clases CSS adicionales para el componente.
     */
    class?: string;
};
