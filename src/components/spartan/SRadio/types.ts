export type TRadioEmits = {
    (event: 'update:modelValue', value: boolean | string): void;
};

export type TRadioProps = {
    /**
     * @en Disables the radio when true, preventing user interaction.
     * @es Deshabilita el radio cuando es true, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en The HTML `id` attribute for the radio input. Auto-generated if not provided.
     * @es El atributo HTML `id` para el input del radio. Se genera automáticamente si no se proporciona.
     */
    id?: string;

    /**
     * @en Renders the label inline with the description text instead of above it.
     * @es Renderiza la etiqueta en línea con el texto de descripción en lugar de encima de él.
     */
    inline?: boolean;

    /**
     * @en The bound value for the radio group. Required.
     * @es El valor vinculado para el grupo de radios. Requerido.
     */
    modelValue: boolean | string;

    /**
     * @en The HTML `name` attribute for the radio input, used to group radios together.
     * @es El atributo HTML `name` para el input del radio, usado para agrupar radios.
     */
    name?: string;

    /**
     * @en Places the radio on the right side of the label, using justify-between layout.
     * @es Coloca el radio en el lado derecho de la etiqueta, usando un layout justify-between.
     */
    reverse?: boolean;

    /**
     * @en The value this radio represents when selected. Required.
     * @es El valor que este radio representa cuando es seleccionado. Requerido.
     */
    value: string;
};
