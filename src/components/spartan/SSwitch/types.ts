import type { FunctionalComponent } from 'vue';

export type TSwitchEmits = {
    (event: 'update:modelValue', value: boolean): void;
};

export type TSwitchProps = {
    /**
     * @en Displays an icon inside the switch knob. When `true`, shows default check/cross icons. When a component is passed, it is used for both states.
     * @es Muestra un ícono dentro del botón del switch. Cuando es `true`, muestra íconos predeterminados de check/cruz. Cuando se pasa un componente, se usa para ambos estados.
     */
    icon?: boolean | FunctionalComponent;

    /**
     * @en Custom icon component displayed inside the knob when the switch is off.
     * @es Componente de ícono personalizado que se muestra dentro del botón cuando el switch está apagado.
     */
    iconOff?: FunctionalComponent;

    /**
     * @en Custom icon component displayed inside the knob when the switch is on.
     * @es Componente de ícono personalizado que se muestra dentro del botón cuando el switch está encendido.
     */
    iconOn?: FunctionalComponent;

    /**
     * @en The current state of the switch. Use with `v-model` for two-way binding.
     * @es El estado actual del switch. Usa con `v-model` para enlace bidireccional.
     */
    modelValue: boolean;

    /**
     * @en When true, clicking the label or description does not toggle the switch. Only the switch itself can be clicked.
     * @es Cuando es true, hacer clic en la etiqueta o descripción no cambia el switch. Solo se puede hacer clic en el switch mismo.
     */
    passive?: boolean;

    /**
     * @en Reverses the layout, placing the switch after the label and description with justify-between spacing.
     * @es Invierte el diseño, colocando el switch después de la etiqueta y descripción con espaciado justify-between.
     */
    reverse?: boolean;
};
