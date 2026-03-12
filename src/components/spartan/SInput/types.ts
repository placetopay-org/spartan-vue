import type { TRounded } from '@/helpers';
import type { FunctionalComponent, HTMLAttributes } from 'vue';

type TOption = {
    label: string;
    value: string;
};

export type TInputEmits = {
    (event: 'update:modelValue', value: string | number | undefined): void;
    (event: 'update:rightOption', value: string | undefined): void;
    (event: 'update:leftOption', value: string | undefined): void;
};

export type TInputProps = {
    /**
     * @en Additional CSS classes for the input container.
     * @es Clases CSS adicionales para el contenedor del input.
     */
    class: HTMLAttributes['class'];

    /**
     * @en Disables the input when true, preventing user interaction.
     * @es Deshabilita el input cuando es true, impidiendo la interacción del usuario.
     */
    disabled: boolean;

    /**
     * @en Displays the input in an error state with red border and ring.
     * @es Muestra el input en estado de error con borde y anillo rojo.
     */
    error: boolean;

    /**
     * @en The HTML `id` attribute for the input element.
     * @es El atributo HTML `id` para el elemento input.
     */
    id: string;

    /**
     * @en Additional CSS classes applied directly to the inner `<input>` element.
     * @es Clases CSS adicionales aplicadas directamente al elemento `<input>` interno.
     */
    inputClass: string;

    /**
     * @en The current value of the input (v-model binding).
     * @es El valor actual del input (enlace v-model).
     */
    modelValue: string | number | null;

    /**
     * @en The HTML `name` attribute for the input element.
     * @es El atributo HTML `name` para el elemento input.
     */
    name: string;

    /**
     * @en Placeholder text displayed when the input is empty.
     * @es Texto de marcador de posición que se muestra cuando el input está vacío.
     */
    placeholder: string;

    /**
     * @en Static text displayed on the left side of the input (e.g., "https://").
     * @es Texto estático que se muestra en el lado izquierdo del input (ej., "https://").
     */
    prefix: string;

    /**
     * @en Static text displayed on the right side of the input (e.g., ".com").
     * @es Texto estático que se muestra en el lado derecho del input (ej., ".com").
     */
    suffix: string;

    /**
     * @en Controls the border radius of the input container.
     * @es Controla el radio de borde del contenedor del input.
     * @default 'both'
     */
    rounded: TRounded;

    /**
     * @en The HTML input type (text, email, number, password, etc.).
     * @es El tipo de input HTML (text, email, number, password, etc.).
     * @default 'text'
     */
    type: string;

    /**
     * @en Icon component displayed on the right side of the input.
     * @es Componente de icono que se muestra en el lado derecho del input.
     */
    rightIcon: FunctionalComponent;

    /**
     * @en Icon component displayed on the left side of the input.
     * @es Componente de icono que se muestra en el lado izquierdo del input.
     */
    leftIcon: FunctionalComponent;

    /**
     * @en The currently selected value of the right dropdown selector.
     * @es El valor actualmente seleccionado del selector desplegable derecho.
     */
    rightOption: string | undefined;

    /**
     * @en Options for the right dropdown selector. Each option has a label and value.
     * @es Opciones para el selector desplegable derecho. Cada opción tiene una etiqueta y un valor.
     */
    rightOptions: TOption[];

    /**
     * @en The currently selected value of the left dropdown selector.
     * @es El valor actualmente seleccionado del selector desplegable izquierdo.
     */
    leftOption: string | undefined;

    /**
     * @en Options for the left dropdown selector. Each option has a label and value.
     * @es Opciones para el selector desplegable izquierdo. Cada opción tiene una etiqueta y un valor.
     */
    leftOptions: TOption[];

    /**
     * @en Comma-separated order of right-side slots: 'slot', 'icon', 'text', 'selector'.
     * @es Orden separado por comas de los slots del lado derecho: 'slot', 'icon', 'text', 'selector'.
     * @default 'slot,icon,text,selector'
     */
    rightOrderSlots: string;

    /**
     * @en Comma-separated order of left-side slots: 'selector', 'text', 'icon', 'slot'.
     * @es Orden separado por comas de los slots del lado izquierdo: 'selector', 'text', 'icon', 'slot'.
     * @default 'selector,text,icon,slot'
     */
    leftOrderSlots: string;

    /**
     * @en Removes the border from the input container.
     * @es Elimina el borde del contenedor del input.
     */
    borderless?: boolean;
};
