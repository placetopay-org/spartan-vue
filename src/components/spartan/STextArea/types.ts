export type TTextAreaProps = {
    /**
     * @en The text content of the textarea.
     * @es El contenido de texto del textarea.
     */
    modelValue: string;

    /**
     * @en Custom CSS classes to apply to the textarea.
     * @es Clases CSS personalizadas para aplicar al textarea.
     */
    class?: string;

    /**
     * @en Displays the textarea in an error state with red border.
     * @es Muestra el textarea en estado de error con borde rojo.
     * @default false
     */
    error?: boolean;

    /**
     * @en Disables the textarea.
     * @es Deshabilita el textarea.
     * @default false
     */
    disabled?: boolean;
};

export type TTextAreaEmits = {
    /**
     * @en Emitted when the textarea content changes.
     * @es Se emite cuando el contenido del textarea cambia.
     */
    (e: 'update:modelValue', value: string): void;
};
