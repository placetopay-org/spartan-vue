export type TRadioGroupEmits = {
    (event: 'update:modelValue', value: string): void;
};

export type TRadioGroupProps = {
    /**
     * @en Disables all radio group items, preventing user interaction.
     * @es Deshabilita todos los elementos del grupo de radio, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en The currently selected value. Must match one of the `SRadioGroupItem` `value` props.
     * @es El valor actualmente seleccionado. Debe coincidir con uno de los props `value` de `SRadioGroupItem`.
     */
    modelValue: string;
};

export type TRadioGroupItemProps = {
    /**
     * @en Disables this specific radio group item, preventing user interaction.
     * @es Deshabilita este elemento del grupo de radio, impidiendo la interacción del usuario.
     */
    disabled?: boolean;

    /**
     * @en The value this option represents. Must be unique within the group.
     * @es El valor que esta opción representa. Debe ser único dentro del grupo.
     */
    value: string;
};
