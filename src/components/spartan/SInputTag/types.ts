import type { TRounded } from '@/helpers';

export type TInputTagProps = {
    /**
     * @en Custom CSS classes to apply to the component.
     * @es Clases CSS personalizadas para aplicar al componente.
     */
    class?: string;

    /**
     * @en The array of tag strings.
     * @es El arreglo de cadenas de etiquetas.
     */
    modelValue?: string[];

    /**
     * @en Displays the input in an error state.
     * @es Muestra el input en estado de error.
     * @default false
     */
    error?: boolean;

    /**
     * @en Disables the input and prevents adding or removing tags.
     * @es Deshabilita el input e impide agregar o eliminar etiquetas.
     * @default false
     */
    disabled?: boolean;

    /**
     * @en The border radius style of the input container.
     * @es El estilo de radio de borde del contenedor del input.
     * @default 'both'
     */
    rounded?: TRounded;

    /**
     * @en Removes the border from the input container.
     * @es Elimina el borde del contenedor del input.
     * @default false
     */
    borderless?: boolean;

    /**
     * @en Placeholder text shown when no tags are entered.
     * @es Texto de marcador que se muestra cuando no hay etiquetas ingresadas.
     */
    placeholder?: string;

    /**
     * @en The HTML input type attribute.
     * @es El atributo de tipo HTML del input.
     * @default 'text'
     */
    type?: string;
};

export type TInputTagEmits = {
    /**
     * @en Emitted when the tags array changes (tag added or removed).
     * @es Se emite cuando el arreglo de etiquetas cambia (etiqueta agregada o eliminada).
     */
    (event: 'update:modelValue', value: string[]): void;
};
