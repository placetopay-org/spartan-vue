export type TCheckboxProps = {
    /**
     * @en Disables the checkbox when true, preventing user interaction.
     * @es Deshabilita el checkbox cuando es true, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en The HTML `id` attribute for the checkbox input. Auto-generated if not provided.
     * @es El atributo HTML `id` para el input del checkbox. Se genera automáticamente si no se proporciona.
     */
    id?: string;

    /**
     * @en Renders the label inline with the description text instead of above it.
     * @es Renderiza la etiqueta en línea con el texto de descripción en lugar de encima de él.
     */
    inline?: boolean;

    /**
     * @en The bound value. Use `boolean` for single checkboxes or `string[]` for group selection.
     * @es El valor vinculado. Usa `boolean` para checkboxes individuales o `string[]` para selección grupal.
     */
    modelValue?: boolean | string[];

    /**
     * @en The HTML `name` attribute for the checkbox input.
     * @es El atributo HTML `name` para el input del checkbox.
     */
    name?: string;

    /**
     * @en Places the checkbox on the right side of the label, using justify-between layout.
     * @es Coloca el checkbox en el lado derecho de la etiqueta, usando un layout justify-between.
     */
    reverse?: boolean;

    /**
     * @en The value identifier when used in a group with an array `modelValue`.
     * @es El identificador de valor cuando se usa en grupo con un `modelValue` de tipo array.
     */
    value?: string;
};
