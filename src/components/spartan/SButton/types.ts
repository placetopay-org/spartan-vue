import type { Component, FunctionalComponent, HTMLAttributes } from 'vue';
import type { TButtonStyles } from './styles';

export type TButtonProps = {
    /**
     * @en The HTML element or Vue component that will be rendered as a button.
     * @es El elemento HTML o componente Vue que se renderizará como botón.
     * @default 'button'
     */
    as?: string | Component;

    /**
     * @en Disables the button when true.
     * @es Deshabilita el botón cuando es true.
     */
    disabled?: boolean;

    /**
     * @en Icon component to be displayed in the button.
     * @es Componente de icono que se mostrará en el botón.
     */
    icon?: FunctionalComponent;

    /**
     * @en Icon component to be displayed on the left side of the text.
     * @es Componente de icono que se mostrará a la izquierda del texto.
     */
    leftIcon?: FunctionalComponent;

    /**
     * @en Icon component to be displayed on the right side of the text.
     * @es Componente de icono que se mostrará a la derecha del texto.
     */
    rightIcon?: FunctionalComponent;

    /**
     * @en Shows a loading state in the button when true.
     * @es Muestra un estado de carga en el botón cuando es true.
     */
    loading?: boolean;

    /**
     * @en Defines the border radius of the button.
     * @es Define el radio de borde del botón.
     */
    rounded?: TButtonStyles['rounded'];

    /**
     * @en Defines the size of the button.
     * @es Define el tamaño del botón.
     */
    size?: TButtonStyles['size'];

    /**
     * @en Defines the HTML button type (button or submit).
     * @es Define el tipo de botón HTML (button o submit).
     */
    type?: 'button' | 'submit';

    /**
     * @en Defines the visual variant of the button.
     * @es Define la variante visual del botón.
     */
    variant?: TButtonStyles['variant'];

    /**
     * @en Additional CSS classes for the button.
     * @es Clases CSS adicionales para el botón.
     */
    class?: HTMLAttributes['class'];
};
