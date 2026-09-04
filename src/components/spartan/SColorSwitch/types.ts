import type { TClassProp } from '@/constants';

export type TColorSwitchMode = 'system' | 'light' | 'dark';

export type TColorSwitchProps = {
    /**
     * @en Additional CSS classes for the color switch container.
     * @es Clases CSS adicionales para el contenedor del selector de color.
     */
    class?: TClassProp;

    /** @en Current color mode. @es Modo de color actual. */
    modelValue?: TColorSwitchMode;
};

/** @en Emitted when the color mode changes. @es Se emite cuando el modo de color cambia. */
export type TColorSwitchEmits = (e: 'update:modelValue', value: TColorSwitchMode) => void;
