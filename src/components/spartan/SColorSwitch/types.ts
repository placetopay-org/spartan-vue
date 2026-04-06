export type TColorSwitchMode = 'system' | 'light' | 'dark';

export type TColorSwitchProps = {
    /** @en Current color mode. @es Modo de color actual. */
    modelValue?: TColorSwitchMode;
};

export type TColorSwitchEmits = {
    /** @en Emitted when the color mode changes. @es Se emite cuando el modo de color cambia. */
    (e: 'update:modelValue', value: TColorSwitchMode): void;
};
